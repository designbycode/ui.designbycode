<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class DeleteRegistryAction
{
    public function handle(string $name): void
    {
        Registry::where('name', $name)->firstOrFail()->delete();
    }
}
