<?php

namespace App\Actions\Registry;

use App\Models\Registry;
use Illuminate\Http\UploadedFile;

class UploadRegistryCssAction
{
    public function handle(UploadedFile $file, string $name, string $type = 'registry:style'): Registry
    {
        $css = file_get_contents($file->getRealPath());
        $item = Registry::fromCss(css: $css, name: $name, type: $type);
        $item->save();

        return $item;
    }
}
