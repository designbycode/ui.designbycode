<?php

namespace App\Concerns;

trait HasFont
{
    public function toRegistry(): array
    {
        return array_filter([
            'name' => $this->name,
            'title' => $this->title,
            'type' => $this->type ?? 'registry:font',
            'meta' => $this->meta ?? ['category' => 'fonts', 'version' => '1.0.0'],
            'author' => $this->author ?? 'designbycode',
            'font' => array_filter([
                'family' => $this->font_family,
                'provider' => $this->font_provider ?? 'google',
                'import' => $this->font_import,
                'variable' => $this->font_variable,
                'weight' => $this->font_weight ?? [],
                'subsets' => $this->font_subsets ?? [],
                'selector' => $this->font_selector,
                'dependency' => $this->font_dependency,
            ]),
            'registryDependencies' => $this->registryDependencies ?? [],
        ], fn ($v) => ! is_null($v) && $v !== []);
    }
}
