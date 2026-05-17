<?php

use App\Http\Controllers\Api\ThemesSearchController;
use App\Http\Controllers\Api\ThemeTagsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/themes', ThemesSearchController::class);

Route::post('/themes/{theme}/tags', ThemeTagsController::class)->middleware('auth:sanctum');
