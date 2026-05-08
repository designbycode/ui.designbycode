<?php

namespace App\Http\Controllers;

use App\Models\Registry;
use Inertia\Inertia;

class ThemesController extends Controller
{
    public function index(Registry $registry)
    {
        $themes = $registry->themes()->paginate(12);

        return Inertia::render('themes/index', [
            'themes' => $themes,
        ]);
    }
}
