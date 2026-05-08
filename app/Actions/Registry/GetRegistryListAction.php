<?php

namespace App\Actions\Registry;

use App\Models\Registry;

class GetRegistryListAction
{
    public function handle(): array
    {
        return [
            '$schema' => 'https://ui.shadcn.com/schema/registry.json',
            'name' => config('app.name'),
            'homepage' => config('app.url'),
            'items' => Registry::all()->map(fn ($item) => $item->toRegistry()),
        ];
    }
}
