<?php

use App\Models\Registry;
use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/../../vendor/autoload.php';
$app = require __DIR__.'/../../bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$theme = Registry::themes()->first();
echo 'Theme: '.$theme->name."\n";
echo 'Dark BG: '.$theme->vars_dark['background']."\n";
echo 'Light BG: '.$theme->vars_light['background']."\n";

// Check a generated theme too
$generated = Registry::themes()->where('name', 'breeze')->first();
echo "\n--- Generated theme: breeze ---\n";
echo 'Dark BG: '.$generated->vars_dark['background']."\n";
echo 'Light BG: '.$generated->vars_light['background']."\n";
echo 'Light primary: '.$generated->vars_light['primary']."\n";
