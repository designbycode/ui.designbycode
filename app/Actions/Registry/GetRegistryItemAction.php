<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class GetRegistryItemAction
{
    public function handle(string $name): Registry
    {
        return Registry::where('name', $name)->firstOrFail();
    }
}
