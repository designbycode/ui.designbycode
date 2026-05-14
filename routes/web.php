<?php

use App\Http\Controllers\AnimateController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\FontsController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\RegistriesController;
use App\Http\Controllers\RegistryController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ThemesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', HomePageController::class)->name('home');
Route::get('/pricing', [SubscriptionController::class, 'index'])->name('pricing');

Route::get('/themes', [ThemesController::class, 'index'])->name('themes.index');
Route::get('/themes/create', [ThemesController::class, 'create'])->name('themes.create');
Route::post('/themes', [ThemesController::class, 'store'])->name('themes.store');
Route::get('/themes/{theme}', [ThemesController::class, 'show'])->name('themes.show');

Route::get('/fonts', [FontsController::class, 'index'])->name('fonts.index');
Route::get('/animate-css', [AnimateController::class, 'index'])->name('animate-css.index');

Route::get('/r/{type}/{name}.json', [RegistriesController::class, 'show']);
Route::get('/r/app/{name}.css', [ThemesController::class, 'css']);
Route::get('/r/registry.json', [RegistryController::class, 'index']);
Route::get('/r/{name}.json', [RegistryController::class, 'show']);
Route::get('/r/{name}.css', [RegistryController::class, 'css']);

Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('socialite.redirect');
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');

Route::post('/r', [RegistryController::class, 'store']);
Route::put('/r/{name}', [RegistryController::class, 'update']);
Route::delete('/r/{name}', [RegistryController::class, 'destroy']);
Route::post('/r/upload', [RegistryController::class, 'upload']);
Route::post('/r/upload-raw', [RegistryController::class, 'uploadRaw']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        return Inertia\Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
