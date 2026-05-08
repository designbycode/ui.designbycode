<?php

namespace App\Http\Requests\Registry;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UploadRawRequest extends FormRequest
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
            'css' => 'required|string',
            'name' => 'required|string|unique:registries,name',
            'type' => 'nullable|string|in:registry:lib,registry:block,registry:component,registry:ui,registry:hook,registry:theme,registry:page,registry:file,registry:style,registry:base,registry:font,registry:item',
        ];
    }
}
