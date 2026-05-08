<?php

namespace App\Http\Controllers;

use App\Actions\Registry\DeleteRegistryAction;
use App\Actions\Registry\GetRegistryItemAction;
use App\Actions\Registry\GetRegistryListAction;
use App\Actions\Registry\StoreRegistryAction;
use App\Actions\Registry\UpdateRegistryAction;
use App\Actions\Registry\UploadRawRegistryCssAction;
use App\Actions\Registry\UploadRegistryCssAction;
use App\Http\Requests\Registry\StoreRequest;
use App\Http\Requests\Registry\UpdateRequest;
use App\Http\Requests\Registry\UploadRawRequest;
use App\Http\Requests\Registry\UploadRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class RegistryController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth', only: [
                'store',
                'update',
                'destroy',
                'upload',
                'uploadRaw',
            ]),
        ];
    }

    public function index(GetRegistryListAction $action)
    {
        return response()->json($action->handle());
    }

    public function show(string $name, GetRegistryItemAction $action)
    {
        return response()->json($action->handle($name)->toRegistry());
    }

    public function css(string $name, GetRegistryItemAction $action)
    {
        return response($action->handle($name)->toCss(), 200)
            ->header('Content-Type', 'text/css');
    }

    public function store(StoreRequest $request, StoreRegistryAction $action)
    {
        $item = $action->handle($request->validated());

        return response()->json($item->toRegistry(), 201);
    }

    public function update(UpdateRequest $request, string $name, UpdateRegistryAction $action, GetRegistryItemAction $get)
    {
        $item = $action->handle($get->handle($name), $request->validated());

        return response()->json($item->toRegistry());
    }

    public function destroy(string $name, DeleteRegistryAction $action)
    {
        $action->handle($name);

        return response()->json(['message' => "Registry item [{$name}] deleted."]);
    }

    public function upload(UploadRequest $request, UploadRegistryCssAction $action)
    {
        $item = $action->handle(
            file: $request->file('css'),
            name: $request->input('name'),
            type: $request->input('type', 'registry:style'),
        );

        return response()->json($item->toRegistry(), 201);
    }

    public function uploadRaw(UploadRawRequest $request, UploadRawRegistryCssAction $action)
    {
        $item = $action->handle(
            css: $request->input('css'),
            name: $request->input('name'),
            type: $request->input('type', 'registry:style'),
        );

        return response()->json($item->toRegistry(), 201);
    }
}
