<?php

namespace App\Concerns;

use InvalidArgumentException;

trait HasAnimate
{
    public const array ASSET_TYPES = [
        'attention',
        'bounce',
        'fade-in',
        'fade-out',
        'slide-in',
        'slide-out',
        'zoom-in',
        'zoom-out',
        'rotate-in',
        'rotate-out',
        'flip',
        'light-speed',
        'roll',
        'back-in',
        'back-out',
    ];

    public function toRegistry(): array
    {
        $item = [
            'name' => $this->name,
            'title' => $this->title,
            'type' => 'registry:style',
            'meta' => $this->meta ?? ['category' => 'animations', 'version' => '1.0.0'],
            'author' => $this->author ?? 'designbycode',
        ];

        if ($this->description !== null) {
            $item['description'] = $this->description;
        }

        if ($this->css_vars !== null) {
            $item['cssVars'] = ['app' => $this->css_vars];
        }

        if ($this->css !== null) {
            $item['css'] = $this->css;
        }

        if (! empty($this->registryDependencies)) {
            $item['registryDependencies'] = $this->registryDependencies;
        }

        return $item;
    }

    public function cssVars(?array $vars = null): array
    {
        if ($vars !== null) {
            $this->css_vars = $vars;
        }

        return $this->css_vars ?? [];
    }

    public function isFadeIn(): bool
    {
        return str_contains($this->name, 'fade-in');
    }

    public function isFadeOut(): bool
    {
        return str_contains($this->name, 'fade-out');
    }

    public function isSlide(): bool
    {
        return str_contains($this->name, 'slide');
    }

    public function isZoom(): bool
    {
        return str_contains($this->name, 'zoom');
    }

    public function isBounce(): bool
    {
        return str_contains($this->name, 'bounce');
    }

    public function isRotate(): bool
    {
        return str_contains($this->name, 'rotate');
    }

    public function isFlip(): bool
    {
        return str_contains($this->name, 'flip');
    }

    public function isBack(): bool
    {
        return str_contains($this->name, 'back-');
    }

    public static function assertValidType(string $type): void
    {
        if (! in_array($type, static::ASSET_TYPES, true)) {
            throw new InvalidArgumentException("Invalid animation asset type: {$type}");
        }
    }
}
