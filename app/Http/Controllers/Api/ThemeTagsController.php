<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;

class ThemeTagsController extends Controller
{
    public function __invoke(Request $request, Theme $theme)
    {
        $request->validate([
            'tags' => ['array'],
            'tags.*' => ['string'],
        ]);

        $theme->syncTags($request->tags ?? []);

        $theme->load('tags');

        return response()->json([
            'tags' => $theme->tags->pluck('name')->toArray(),
        ]);
    }
}
