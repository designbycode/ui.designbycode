<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class UpdateRegistryAction
{
    public function handle(Registry $item, array $data): Registry
    {
        $item->update($data);

        return $item->fresh();
    }
}
