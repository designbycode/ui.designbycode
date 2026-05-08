<?php

$seederPath = __DIR__.'/ThemeSeeder.php';
$newThemesPath = __DIR__.'/new-themes.txt';

$content = file_get_contents($seederPath);
$newThemes = file_get_contents($newThemesPath);

// Find the closing ]; before foreach and insert new themes before it
$marker = '        ];

        foreach ($themes as $item) {';

$replacement = $newThemes."\n        ];

        foreach (\$themes as \$item) {";

$content = str_replace($marker, $replacement, $content);

if (str_contains($content, $replacement)) {
    file_put_contents($seederPath, $content);
    echo 'Successfully merged '.substr_count($newThemes, "'name' =>")." new themes into ThemeSeeder.php\n";
} else {
    echo "ERROR: Could not find insertion marker\n";
}
