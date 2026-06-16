<?php

namespace App\Console\Commands;

use App\Models\Registry;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class RegistryBuildCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'registry:build';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scan resources/js/registry directory and auto-generate the RegistrySeeder';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Scanning resources/js/registry/new-york...');

        $registryDir = resource_path('js/registry/new-york');
        if (! File::isDirectory($registryDir)) {
            $this->error("Registry directory not found at: {$registryDir}");

            return Command::FAILURE;
        }

        $files = File::allFiles($registryDir);
        $registryItems = [];

        foreach ($files as $file) {
            $relativePath = 'resources/js/registry/new-york/'.str_replace('\\', '/', $file->getRelativePathname());
            $pathParts = explode('/', str_replace('\\', '/', $file->getRelativePath()));
            $filename = $file->getFilenameWithoutExtension();

            if (empty($pathParts[0])) {
                continue;
            }

            $itemType = 'registry:hook';
            $category = $pathParts[0];

            if ($pathParts[0] === 'hooks') {
                $itemType = 'registry:hook';
                $category = 'hooks';
            } elseif ($pathParts[0] === 'lib') {
                $itemType = 'registry:lib';
                $category = 'lib';
            } elseif ($pathParts[0] === 'components') {
                if (isset($pathParts[1]) && $pathParts[1] === 'ui') {
                    $itemType = 'registry:ui';
                    $category = $pathParts[2] ?? 'components';
                } else {
                    $itemType = 'registry:block';
                    $category = 'blocks';
                }
            }

            $name = ($itemType === 'registry:block') ? ($pathParts[1] ?? $filename) : $filename;

            if (isset($registryItems[$name])) {
                $registryItems[$name]['files'][] = [
                    'path' => $relativePath,
                    'type' => $itemType,
                ];
                if (in_array($itemType, ['registry:ui', 'registry:block'], true)) {
                    $registryItems[$name]['type'] = $itemType;
                    $registryItems[$name]['categories'] = [$category];
                }
            } else {
                $registryItems[$name] = [
                    'name' => $name,
                    'title' => Str::headline($name),
                    'type' => $itemType,
                    'categories' => [$category],
                    'files' => [
                        [
                            'path' => $relativePath,
                            'type' => $itemType,
                        ],
                    ],
                ];
            }
        }

        $this->info('Resolving file contents and dependencies...');

        foreach ($registryItems as $name => &$item) {
            $dependencies = [];
            $registryDependencies = [];

            foreach ($item['files'] as &$fileInfo) {
                $filePath = base_path($fileInfo['path']);
                if (! File::exists($filePath)) {
                    continue;
                }
                $content = File::get($filePath);
                $fileInfo['content'] = $content;

                // Parse import statements
                preg_match_all('/import\s+(?:[^"\']*?\s+from\s+)?["\'"]([^"\']+)["\'"]/', $content, $matches);

                if (! empty($matches[1])) {
                    foreach ($matches[1] as $importPath) {
                        if (str_starts_with($importPath, '@/registry/new-york/')) {
                            // Local registry import
                            $depName = basename($importPath);
                            $depName = preg_replace('/\.(tsx|ts|js|jsx)$/', '', $depName);

                            // Skip if it's an internal file of the same block
                            $isInternal = false;
                            foreach ($item['files'] as $f) {
                                $fName = basename($f['path']);
                                $fName = preg_replace('/\.(tsx|ts|js|jsx)$/', '', $fName);
                                if ($fName === $depName) {
                                    $isInternal = true;
                                    break;
                                }
                            }

                            if (! $isInternal) {
                                $registryDependencies[] = $depName;
                            }
                        } elseif (str_starts_with($importPath, '@/components/ui/')) {
                            $depName = basename($importPath);
                            $depName = preg_replace('/\.(tsx|ts|js|jsx)$/', '', $depName);
                            $registryDependencies[] = $depName;
                        } elseif (str_starts_with($importPath, '@/lib/utils')) {
                            $registryDependencies[] = 'utils';
                        } elseif (! str_starts_with($importPath, '.') && ! str_starts_with($importPath, '@/')) {
                            // NPM Dependency
                            $parts = explode('/', $importPath);
                            $packageName = $parts[0];
                            if (str_starts_with($packageName, '@') && isset($parts[1])) {
                                $packageName .= '/'.$parts[1];
                            }

                            if (! in_array($packageName, ['react', 'react-dom'])) {
                                $dependencies[] = $packageName;
                            }
                        }
                    }
                }
            }

            $item['dependencies'] = array_values(array_unique($dependencies));
            $item['registryDependencies'] = array_values(array_unique($registryDependencies));
            $item['author'] = 'designbycode';
            $item['meta'] = [
                'category' => $item['categories'][0] ?? 'components',
                'version' => '1.0.0',
            ];
        }
        unset($item);

        // Resolve local registryDependencies to full URLs
        $scannedNames = array_keys($registryItems);
        foreach ($registryItems as $name => &$item) {
            $resolvedRegDeps = [];
            foreach ($item['registryDependencies'] as $dep) {
                if (in_array($dep, $scannedNames, true)) {
                    $resolvedRegDeps[] = url("r/{$dep}.json");
                } else {
                    $resolvedRegDeps[] = $dep;
                }
            }
            $item['registryDependencies'] = $resolvedRegDeps;
        }
        unset($item);

        $databaseRecords = [];
        foreach ($registryItems as $name => $item) {
            try {
                $parsed = Registry::fromRegistry($item);
                $attributes = $parsed->toArray();
                unset($attributes['id'], $attributes['created_at'], $attributes['updated_at'], $attributes['deleted_at'], $attributes['user_id']);
                $databaseRecords[] = $attributes;
            } catch (\Exception $e) {
                $this->error("Failed to parse registry item [{$name}]: ".$e->getMessage());
            }
        }

        $this->info('Generating RegistrySeeder.php...');

        $itemsPhpCode = $this->exportArray($databaseRecords, 12);

        $seederTemplate = <<<PHP
<?php

namespace Database\Seeders;

use App\Models\Registry;
use App\Models\User;
use Illuminate\Database\Seeder;

class RegistrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \$userId = User::first()?->id ?? 1;

        \$items = [
{$itemsPhpCode}
        ];

        \$total = 0;

        foreach (\$items as \$item) {
            Registry::updateOrCreate(
                ['name' => \$item['name']],
                array_merge(\$item, ['user_id' => \$userId])
            );
            \$total++;
        }

        \$this->command->info("Seeded {\$total} registry items.");
    }
}
PHP;

        $seederPath = database_path('seeders/RegistrySeeder.php');
        File::put($seederPath, $seederTemplate);

        $this->info("RegistrySeeder.php generated successfully at {$seederPath}.");

        $this->info('Running RegistrySeeder to seed/update database...');
        Artisan::call('db:seed', [
            '--class' => 'RegistrySeeder',
            '--force' => true,
        ]);

        $this->info(Artisan::output());
        $this->info('Registry build completed successfully!');

        return Command::SUCCESS;
    }

    /**
     * Export array to PHP array string with short syntax.
     */
    private function exportArray(array $array, int $indent = 12): string
    {
        $indentStr = str_repeat(' ', $indent);
        $lines = [];
        $isAssociative = array_keys($array) !== range(0, count($array) - 1);

        foreach ($array as $key => $value) {
            $renderedKey = $isAssociative ? var_export($key, true).' => ' : '';
            if (is_array($value)) {
                $renderedValue = "[\n".$this->exportArray($value, $indent + 4)."\n".str_repeat(' ', $indent).']';
            } elseif (is_null($value)) {
                $renderedValue = 'null';
            } else {
                $renderedValue = var_export($value, true);
            }
            $lines[] = $indentStr.$renderedKey.$renderedValue.',';
        }

        return implode("\n", $lines);
    }
}
