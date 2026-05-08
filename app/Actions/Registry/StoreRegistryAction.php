<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class StoreRegistryAction
{
    public function handle(array $data): Registry
    {
        return Registry::create($data);
    }
}
