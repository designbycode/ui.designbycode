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
                } elseif (isset($pathParts[1]) && $pathParts[1] === 'blocks') {
                    $itemType = 'registry:block';
                    $category = $pathParts[2] ?? 'blocks';
                } else {
                    $itemType = 'registry:block';
                    $category = $pathParts[1] ?? 'blocks';
                }
            }

            // Normalise and group category names
            $categoryMap = [
                'hero-section' => 'hero-sections',
                'pricing-section' => 'pricing',
                'cards-stats' => 'stats',
                'booking-form' => 'forms',
                'rental-listings' => 'properties',
                'property-detail' => 'properties',
                'reviews-slider' => 'reviews',
                'buttons-gallery' => 'galleries',
                'canvas-gallery' => 'galleries',
                'inputs-gallery' => 'galleries',
                'music-player' => 'media',
                'threejs' => 'canvas',
            ];
            $category = str_starts_with($category, 'hero-') ? 'hero-sections' : ($categoryMap[$category] ?? $category);

            $name = $filename;
            if ($itemType === 'registry:block') {
                if (isset($pathParts[1]) && $pathParts[1] === 'blocks') {
                    $name = $pathParts[2] ?? $filename;
                } else {
                    $name = $pathParts[1] ?? $filename;
                }
            }

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

        $descriptions = [
            'analytics-dashboard' => 'A comprehensive, premium analytics dashboard showing statistics, performance metrics, and graphs.',
            'booking-form' => 'A clean and responsive booking card form layout for properties or services.',
            'buttons-gallery' => 'A showcase of various button designs including magnetic, particles, and shining effect variants.',
            'canvas-gallery' => 'A beautiful presentation displaying interactive HTML Canvas art and experiments.',
            'cards-stats' => 'A collection of metric statistics cards with trends, indicator badges, and compact styling.',
            'feature-grid' => 'A clean grid layout to present core features of a product with icons and card hover states.',
            'hero-section' => 'A stunning and modern landing page hero section with typography and call to actions.',
            'inputs-gallery' => 'An interactive display showcasing specialized text, phone, currency, slug, and rating input components.',
            'music-player' => 'An immersive, premium client-side music player layout with playlist and visual controls.',
            'pricing-section' => 'A modern tiered pricing section with hover scale states, tags, and toggles.',
            'property-detail' => 'A clean and rich property details display page containing descriptions, photos, and reviews.',
            'rental-listings' => 'A responsive layout showing real estate property rental cards with search filters.',
            'reviews-slider' => 'A premium, smooth testimonial reviews slider with star ratings and user profiles.',
            'gsap-marquee' => 'A high-performance GSAP-powered horizontal scrolling marquee component.',
            'marquee' => 'A lightweight CSS-based horizontal text/elements scrolling marquee.',
            'text-animator' => 'An elegant text animator rendering typography with premium transitions.',
            'button-magnetic' => 'A premium magnetic button pull effect that snaps to the cursor position on hover.',
            'button-particles' => 'A vibrant button trigger releasing interactive confetti/particle explosions on click.',
            'button-shine' => 'A sleek button design showcasing a subtle glowing reflective shine transition.',
            'pixel-canvas' => 'An interactive background canvas that draws pixel highlights under the mouse cursor.',
            'back-light' => 'A modern card wrapper creating a glowing, color-matching backlight shadow behind components.',
            'glow-conic' => 'A beautiful border animation powered by a rotating conic color gradient.',
            'glow-radial' => 'An interactive background overlay that reflects cursor positioning with radial gradients. Requires GlowStack wrapping to function.',
            'glow-stack' => 'A coordinated hover effect sharing cursor coordinates across a card stack.',
            'input-currency' => 'A smart text input formatting numeric entries into localized currency notation as you type.',
            'input-number' => 'A numeric spinner input containing up/down stepper buttons and range constraints.',
            'input-phone' => 'A formatted text input enforcing phone masks and raw numeric outputs.',
            'input-password' => 'A password input field with a toggleable eye icon to show/hide the password text.',
            'input-slug' => 'A reactive field transforming raw keystrokes into clean URL-safe slug strings.',
            'multi-select' => 'A dropdown selector allowing search, selection, and creation of multiple tags.',
            'progress-circle' => 'A clean SVG circular progress meter displaying animated percentage levels.',
            'interactive-rating' => 'A star-based rating component supporting interactive hover feedback and selections.',
            'animated-tabs' => 'A tab selection bar showcasing smooth fluid sliding indicator animations.',
            'waves-three' => 'A responsive WebGL 3D waves animation powered by Three.js.',
            'use-dark-mode' => 'A React hook detecting and toggling light/dark system color schemes.',
            'use-headroom' => 'A React scroll hook enabling/disabling visibility of nav headers based on scroll direction.',
            'use-hover' => 'A ref-bound React hover hook managing mouse entrance and exit event states.',
            'use-pixel-canvas' => 'A helper hook handling pixel drawing mathematics for the Pixel Canvas component.',
            'audio-context' => 'A browser Web Audio API manager providing playback nodes for the music player.',
            'glow-geometry' => 'A helper library managing mouse coordinate tracking for glow wrappers.',
            'pixel-canvas-helper' => 'A mathematical helper module driving pixel animations for the Pixel Canvas.',
            'heading' => 'A structured typographic heading component supporting levels 1 to 6.',
            'paragraph' => 'A versatile paragraph text component supporting default, lead, and muted layout variants.',
            'badge-indicator' => 'A clean and customizable badge indicator component with optional Lucide icon support.',
            'heading-block' => 'A composite title heading block containing category badge, main title, and description.',
            'input-number-stepper' => 'A numeric entry component with side-by-side plus and minus adjustment buttons.',
            'button-special' => 'A collection of unique styled buttons with pulsing, glowing, drawing, or gradient border effects.',
            'hero-gradient' => 'A mesh gradient hero banner utilizing HeadingBlock typography and custom neon buttons.',
            'hero-split' => 'A split two-column hero section with an interactive PixelCanvas visual panel and CTA options.',
            'hero-minimal-centered' => 'A clean centered hero banner with simple typography and special draw and pulse CTA buttons.',
            'hero-phone-mockup' => 'A split hero layout showcasing app copy alongside a high-fidelity glowing smartphone dashboard mockup.',
            'hero-features-grid' => 'A centered hero banner paired with a three-column micro-grid of cards displaying key app features.',
            'hero-video-dialog' => 'A centered hero section featuring a simulated dashboard mockup with an interactive play state.',
            'hero-particles' => 'A high-impact centered hero set against an animated backdrop of floating ambient light particles.',
            'hero-conic-glow' => 'A dark theme hero section displaying a centerpiece panel framed by a rotating conic border gradient.',
            'hero-waitlist' => 'An interactive private beta submission form featuring custom number steppers and subscription feedback.',
            'hero-trusted-by' => 'A centered landing page hero banner with an integrated client brand logo cloud for social proof.',
            'hero-tabs-showcase' => 'A structured full-stack hero layout with tabbed navigation displaying frontend, backend, and migration code snippets.',
            'hero-waves' => 'An immersive black-themed hero banner using a WebGL 3D waves canvas backdrop behind high-end typography.',
            'phone-mockup' => 'A high-fidelity CSS-only smartphone mock frame that acts as a container for mobile previews.',
            'code-window' => 'An interactive code editor window mockup with custom file tags and active indicators.',
            'browser-mockup' => 'A clean browser mockup container frame with close/minimize chrome controls and viewport slot.',
            'particles-backdrop' => 'A pure CSS background animation engine rendering drifting ambient particle glows.',
            'logo-cloud' => 'A horizontal social proof logo grid displaying client/partner brands.',
            'glowing-card' => 'An interactive card container that tracks mouse hover coordinates to trace a glowing radial spotlight.',
            'hero-glowing-cards' => 'A centered hero banner utilizing three mouse-tracing GlowingCard components to show features.',
        ];

        $databaseRecords = [];
        foreach ($registryItems as $name => $item) {
            try {
                $item['description'] = $descriptions[$name] ?? 'A beautiful component for your application.';
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
