<?php

use App\Http\Controllers\AnimateController;
use App\Http\Controllers\FontsController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\RegistryController;
use App\Http\Controllers\ThemesController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomePageController::class)->name('home');
Route::get('/themes', [ThemesController::class, 'index'])->name('themes.index');
Route::get('/fonts', [FontsController::class, 'index'])->name('fonts.index');
Route::get('/animate-css', [AnimateController::class, 'index'])->name('animate-css.index');

Route::get('/r/theme/{name}.json', [ThemesController::class, 'show']);
Route::get('/r/theme/{name}.css', [ThemesController::class, 'css']);

Route::get('/r/registry.json', [RegistryController::class, 'index']);
Route::get('/r/{name}.json', [RegistryController::class, 'show']);
Route::get('/r/{name}.css', [RegistryController::class, 'css']);
Route::post('/r', [RegistryController::class, 'store']);
Route::put('/r/{name}', [RegistryController::class, 'update']);
Route::delete('/r/{name}', [RegistryController::class, 'destroy']);
Route::post('/r/upload', [RegistryController::class, 'upload']);
Route::post('/r/upload-raw', [RegistryController::class, 'uploadRaw']);

Route::get('/r/animate-css/{name}.json', [AnimateController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
