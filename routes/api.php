<?php

use App\Http\Controllers\ThemesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/themes', [ThemesController::class, 'apiIndex']);
