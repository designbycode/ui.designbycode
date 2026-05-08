<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class UploadRawRegistryCssAction
{
    public function handle(string $css, string $name, string $type = 'registry:style'): Registry
    {
        $item = Registry::fromCss(css: $css, name: $name, type: $type);
        $item->save();

        return $item;
    }
}
