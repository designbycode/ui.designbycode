<?php
$c = file_get_contents(__DIR__ . '/database/seeders/ThemeSeeder.php');
$themes = preg_match_all("/'name'\s*=>\s*'[^']+'/", $c);
$deps = preg_match_all("/'registryDependencies'\s*=>/", $c);
echo "Themes: {$themes}, registryDependencies: {$deps}\n";
if ($themes === $deps) {
    echo "MATCH: All themes have registryDependencies\n";
} else {
    echo "MISMATCH: " . ($themes - $deps) . " themes missing\n";
}
