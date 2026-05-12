<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theme;

class ThemesSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $query = Theme::query();

        if ($search = request('search')) {
            $query->where(fn ($q) => $q
                ->where('name', 'like', "%{$search}%")
                ->orWhere('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
            );
        }

        return $query->paginate(15)->withQueryString();
    }
}
