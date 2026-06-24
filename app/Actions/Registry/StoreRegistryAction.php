<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class StoreRegistryAction
{
    public function handle(array $data): Registry
    {
        if (! isset($data['user_id']) && auth()->check()) {
            $data['user_id'] = auth()->id();
        }

        $registry = new Registry;
        $registry->forceFill($data);
        $registry->save();

        return $registry;
    }
}
