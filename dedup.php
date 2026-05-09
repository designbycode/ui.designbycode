<?php
$file = __DIR__ . '/database/seeders/ThemeSeeder.php';
$content = file_get_contents($file);

// Simple string-based dedup
$nl = "\n";
$searchStart = $nl . $nl . "                'registryDependencies' => [" . $nl;
$searchEnd = $nl . $nl . "                'css' => [";

$count = 0;
while (true) {
    // Find the LAST occurrence of registryDependencies before 'css' => [
    // This is always the duplicate
    $pos = strrpos($content, $searchStart);
    if ($pos === false) break;
    
    // Verify this is followed by 'css' => [
    $afterStart = substr($content, $pos + strlen($searchStart));
    $endPos = strpos($afterStart, $searchEnd);
    if ($endPos === false) break;
    
    // Find where the block ends: "                ]," + blank line
    $blockContent = substr($afterStart, 0, $endPos);
    if (!str_ends_with(trim($blockContent), "],")) break;
    
    // The duplicate is from $pos to $pos + strlen($searchStart) + $endPos
    $duplicateEnd = $pos + strlen($searchStart) + $endPos;
    $removed = substr($content, $pos, $duplicateEnd - $pos);
    
    // Verify the removed content contains "                'registryDependencies' => ["
    // and the following content is 'css' => [
    $after = substr($content, $duplicateEnd);
    if (!str_starts_with($after, "                'css' => [")) break;
    
    // Remove the duplicate (including the blank line before it)
    $content = substr_replace($content, $nl . $nl, $pos, $duplicateEnd - $pos);
    $count++;
}

file_put_contents($file, $content);

echo "Removed {$count} duplicate registryDependencies.\n";

$themes = preg_match_all("/'name'\s*=>\s*'[^']+'/", $content);
$deps = preg_match_all("/'registryDependencies'\s*=>\s*\[/", $content);
echo "Themes: {$themes}, registryDependencies: {$deps}\n";
if ($themes === $deps) {
    echo "MATCH: All themes have exactly one registryDependencies each.\n";
} else {
    echo "MISMATCH by " . abs($themes - $deps) . "\n";
}
