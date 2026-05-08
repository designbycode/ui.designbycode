<?php

namespace App\Http\Requests\Registry;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|unique:registries,name,'.$this->id,
            'type' => 'sometimes|string|in:registry:lib,registry:block,registry:component,registry:ui,registry:hook,registry:page,registry:file,registry:style,registry:base,registry:font,registry:item',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'author' => 'nullable|string',
            'dependencies' => 'nullable|array',
            'devDependencies' => 'nullable|array',
            'registryDependencies' => 'nullable|array',
            'files' => 'nullable|array',
            'css' => 'nullable|array',
            'css_base' => 'nullable|array',
            'meta' => 'nullable|array',
            'docs' => 'nullable|string',
            'categories' => 'nullable|array',
            'vars_theme' => 'nullable|array',
            'vars_light' => 'nullable|array',
            'vars_dark' => 'nullable|array',
            'font_family' => 'nullable|string',
            'font_mono' => 'nullable|string',
            'font_serif' => 'nullable|string',
            'font_provider' => 'nullable|string',
            'font_import' => 'nullable|string',
            'font_variable' => 'nullable|string',
            'font_weight' => 'nullable|array',
            'font_subsets' => 'nullable|array',
            'font_selector' => 'nullable|string',
            'font_dependency' => 'nullable|string',
            'extends' => 'nullable|string',
            'style' => 'nullable|string',
            'icon_library' => 'nullable|string',
            'base_color' => 'nullable|string',
            'theme' => 'nullable|string',
        ];
    }
}
