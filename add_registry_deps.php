<?php
$file = __DIR__ . '/database/seeders/ThemeSeeder.php';
$content = file_get_contents($file);

// Complete font mapping for ALL themes that need registryDependencies
$fontOverrides = [
    // === First batch (original 7 had deps already - verify)
    
    // === Already had deps: polar-drift, yeti, boho, tide, ember, noir-ice, verdant-future
    
    // === First edit batch (18 themes)
    'brutal-industry' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'retrowave' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'synth-organica' => ['font-space-grotesk.json', 'font-jetbrains-mono.json'],
    'dreamscape' => ['font-work-sans.json', 'font-jetbrains-mono.json'],
    'minimalism' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'soft-extrude' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'frost' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'structured' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'corporate' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'treasury' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'canopy' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'wabi-sabi' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'gatsby' => ['font-playfair-display.json', 'font-jetbrains-mono.json'],
    'comic-pop' => ['font-poppins.json', 'font-jetbrains-mono.json'],
    'storybook' => ['font-playfair-display.json', 'font-jetbrains-mono.json'],
    'millennium' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'neon-horizon' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'web-10' => [],
    
    // === Second edit batch (24 themes)
    'letterpress' => ['font-playfair-display.json'],
    'green-screen' => ['font-jetbrains-mono.json'],
    'cosmos' => ['font-inter.json'],
    'tactical' => ['font-roboto.json', 'font-jetbrains-mono.json'],
    'inferno' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'mauve' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'haze' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'gothic' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'fantasy' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'mythological' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'urban' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'mid-century' => ['font-space-grotesk.json', 'font-jetbrains-mono.json'],
    'japanese-zen' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'art-nouveau' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'coastal' => ['font-work-sans.json', 'font-jetbrains-mono.json'],
    'scandinavian' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'techno' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'rustic' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'surreal' => ['font-space-grotesk.json', 'font-jetbrains-mono.json'],
    'spring' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'summer' => ['font-poppins.json'],
    'autumn' => ['font-playfair-display.json'],
    'winter' => ['font-inter.json'],
    'solarpunk' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    
    // === PHP script batch (34 themes)
    'steampunk' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'dieselpunk' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'lunarpunk' => ['font-space-grotesk.json', 'font-jetbrains-mono.json'],
    'decopunk' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'atompunk' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'biopunk' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'ashwood-minimal' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'walnut-luxe' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'cedar-harmony' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'ebony-woodcraft' => ['font-space-grotesk.json', 'font-jetbrains-mono.json'],
    'theme-default' => ['font-inter.json'],
    'boho-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'bauhaus-theme' => ['font-poppins.json'],
    'artistic-gradient-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'clay-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'cyberpunk-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'editorial-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'acid-core-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'autumn-grain-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'brutalist-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'esports-arena-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'audio-wave-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'fashion-avant-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'edugeek-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'concrete-jungle-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'crypto-labs-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'zinc-stone-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'paper-stack-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'nordic-light-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'warehouse-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'void-dark-theme' => ['font-inter.json', 'font-jetbrains-mono.json'],
    'ember-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
    'retro-web-theme' => ['font-inter.json'],
    'eco-minimal-theme' => ['font-inter.json', 'font-playfair-display.json', 'font-jetbrains-mono.json'],
];

$modified = 0;
$skipped = 0;

foreach ($fontOverrides as $name => $slugs) {
    // Build registry block
    if (empty($slugs)) {
        $depBlock = "                'registryDependencies' => [],";
    } else {
        $depBlock = "                'registryDependencies' => [\n";
        foreach ($slugs as $slug) {
            $depBlock .= "                    'https://ui.designbycode.co.za/r/fonts/{$slug}',\n";
        }
        $depBlock .= "                ],";
    }
    
    // Find the theme's name in the content
    $search = "'name' => '{$name}',";
    $pos = strpos($content, $search);
    if ($pos === false) {
        echo "Theme '{$name}' not found.\n";
        continue;
    }
    
    // Find font_family line after this name
    $remaining = substr($content, $pos);
    if (!preg_match("/'font_family'\s*=>\s*'[^']+'/", $remaining, $ffm, PREG_OFFSET_CAPTURE)) {
        echo "font_family not found for '{$name}'.\n";
        continue;
    }
    
    $ffPos = $pos + $ffm[0][1];
    $ffLineEnd = strpos($content, "\n", $ffPos);
    
    // Check if registryDependencies already exists BETWEEN name and the NEXT theme's name
    // Search from $pos to the beginning of the next theme
    $nextThemePos = strpos($content, "\n            [\n                'name' => ", $pos + strlen($search));
    if ($nextThemePos === false) {
        $nextThemePos = strlen($content);
    }
    $between = substr($content, $pos, $nextThemePos - $pos);
    if (str_contains($between, "'registryDependencies'")) {
        echo "Theme '{$name}' already has registryDependencies. Skipping.\n";
        $skipped++;
        continue;
    }
    
    // Look at what comes after font_family line
    $afterFF = substr($content, $ffLineEnd + 1);
    $isBlankNext = (strlen($afterFF) > 0 && $afterFF[0] === "\n");
    
    if ($isBlankNext) {
        // After font_family there's a blank line, then 'css' => [
        $insertPos = $ffLineEnd + 1; // Insert after newline (before blank line)
        $insert = $depBlock . "\n";
    } else {
        $insertPos = $ffLineEnd + 1;
        $insert = $depBlock . "\n\n";
    }
    
    $content = substr_replace($content, $insert, $insertPos, 0);
    $modified++;
    echo "Added registryDependencies to '{$name}'.\n";
}

file_put_contents($file, $content);
echo "\nDone. Modified {$modified} themes, skipped {$skipped} themes.\n";

// Final verification
$themes = preg_match_all("/'name'\s*=>\s*'[^']+'/", $content);
$deps = preg_match_all("/'registryDependencies'\s*=>\s*\[/", $content);
echo "Themes: {$themes}, registryDependencies: {$deps}\n";
if ($themes === $deps) {
    echo "MATCH: All themes have exactly one registryDependencies each.\n";
} else {
    echo "MISMATCH by " . abs($themes - $deps) . "\n";
}
