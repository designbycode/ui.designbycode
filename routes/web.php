<?php

use App\Http\Controllers\AnimateController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\ComponentsController;
use App\Http\Controllers\DashboardComponentsController;
use App\Http\Controllers\FontsController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\NewsletterSubscriptionController;
use App\Http\Controllers\RegistriesController;
use App\Http\Controllers\RegistryController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\ThemesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', HomePageController::class)->name('home');
Route::post('/newsletter/subscribe', NewsletterSubscriptionController::class)->name('newsletter.subscribe');
Route::get('/pricing', [SubscriptionController::class, 'index'])->name('pricing');

Route::get('/themes', [ThemesController::class, 'index'])->name('themes.index');
Route::get('/themes/create', [ThemesController::class, 'create'])->name('themes.create')->middleware('auth');
Route::post('/themes', [ThemesController::class, 'store'])->name('themes.store')->middleware('auth');
Route::get('/themes/{theme}', [ThemesController::class, 'show'])->name('themes.show');

Route::get('/fonts', [FontsController::class, 'index'])->name('fonts.index');
Route::get('/animate-css', [AnimateController::class, 'index'])->name('animate-css.index');
Route::get('/components', [ComponentsController::class, 'index'])->name('components.index');
Route::get('/components/{component}', [ComponentsController::class, 'show'])->name('components.show');

Route::get('/r/{type}/{name}.json', [RegistriesController::class, 'show']);
Route::get('/r/themes/{name}.css', [ThemesController::class, 'css']);
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
        $user = $request->user();

        if ($user->hasAnyRole(['super-admin', 'admin'])) {
            return Inertia\Inertia::render('dashboard');
        }

        if ($user->subscribed()) {
            return Inertia\Inertia::render('dashboard');
        }

        abort(403);
    })->name('dashboard');

    Route::middleware('role:super-admin|admin')->group(function () {
        Route::get('dashboard/components', [DashboardComponentsController::class, 'index'])->name('dashboard.components.index');
        Route::get('dashboard/components/create', [DashboardComponentsController::class, 'create'])->name('dashboard.components.create');
        Route::post('dashboard/components', [DashboardComponentsController::class, 'store'])->name('dashboard.components.store');
        Route::get('dashboard/components/{name}/edit', [DashboardComponentsController::class, 'edit'])->name('dashboard.components.edit');
        Route::put('dashboard/components/{name}', [DashboardComponentsController::class, 'update'])->name('dashboard.components.update');
        Route::delete('dashboard/components/{name}', [DashboardComponentsController::class, 'destroy'])->name('dashboard.components.destroy');
    });
});

require __DIR__.'/settings.php';
