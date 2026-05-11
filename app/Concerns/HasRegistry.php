<?php

namespace App\Concerns;

use InvalidArgumentException;

trait HasRegistry
{
    // =========================================================================
    // Schema constants
    // =========================================================================

    public const REGISTRY_TYPES = [
        'registry:lib',
        'registry:block',
        'registry:component',
        'registry:ui',
        'registry:hook',
        'registry:page',
        'registry:file',
        'registry:style',
        'registry:base',
        'registry:font',
        'registry:item',
    ];

    public const FILE_TYPES = [
        'registry:lib',
        'registry:block',
        'registry:component',
        'registry:ui',
        'registry:hook',
        'registry:page',
        'registry:file',
        'registry:style',
        'registry:base',
        'registry:item',
    ];

    public const FONT_PROVIDERS = ['google'];

    /** Types that emit cssVars in toRegistry() */
    private const CSS_VAR_TYPES = ['registry:style', 'registry:base'];

    /** CSS properties that are NOT colour tokens and must not get --color- prefix */
    private const NON_COLOR_KEYS = [
        'radius',
        'font-sans', 'font-serif', 'font-mono',
        'shadow', 'shadow-2xs', 'shadow-xs', 'shadow-sm',
        'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
        'shadow-x', 'shadow-y', 'shadow-blur', 'shadow-spread',
        'shadow-opacity', 'shadow-color',
        'tracking-normal', 'spacing', 'letter-spacing',
    ];

    private const SHADOW_SIZES = ['2xs', 'xs', 'sm', '', 'md', 'lg', 'xl', '2xl'];

    // =========================================================================
    // Static factory: parse raw shadcn CSS → model instance
    // =========================================================================

    /**
     * Build an unsaved Registry instance by parsing a raw shadcn CSS string.
     *
     * Handles:
     *  - :root { } → vars_light
     *  - .dark { } → vars_dark
     *  - @app inline { } → vars_theme + colour/font/radius/shadow mapping
     *  - @layer base { } → css_base
     *  - Flat font columns extracted from vars_light
     *
     * @throws InvalidArgumentException
     */
    public static function fromCss(
        string $css,
        string $name,
        string $type = 'registry:style'
    ): static {
        static::assertValidType($type);

        $instance = new static;
        $instance->name = $name;
        $instance->type = $type;

        // ── :root (light tokens) ──────────────────────────────────────────
        if (preg_match('/:root\s*\{([^}]+)\}/s', $css, $m)) {
            $instance->vars_light = static::parseCssVars($m[1]);
        }

        // ── .dark tokens ──────────────────────────────────────────────────
        if (preg_match('/\.dark\s*\{([^}]+)\}/s', $css, $m)) {
            $instance->vars_dark = static::parseCssVars($m[1]);
        }

        // ── @app inline ─────────────────────────────────────────────────
        if (preg_match('/@app\s+inline\s*\{([^}]+)\}/s', $css, $m)) {
            $instance->vars_theme = static::parseThemeInline($m[1], $instance->vars_light ?? []);
        }

        // ── Extract flat font columns from vars_light ─────────────────────
        $light = $instance->vars_light ?? [];
        $instance->font_family = $light['font-sans'] ?? null;
        $instance->font_mono = $light['font-mono'] ?? null;
        $instance->font_serif = $light['font-serif'] ?? null;

        // ── @layer base ───────────────────────────────────────────────────
        if (preg_match('/@layer\s+base\s*\{(.+)\}\s*$/sm', $css, $m)) {
            $instance->css_base = static::parseLayerBase($m[1]);
        }

        return $instance;
    }

    // =========================================================================
    // Static factory: build from shadcn JSON registry item array
    // =========================================================================

    /**
     * Build an unsaved Registry instance from a decoded shadcn registry JSON array.
     *
     * @param  array<string, mixed>  $data
     *
     * @throws InvalidArgumentException
     */
    public static function fromRegistry(array $data): static
    {
        static::assertValidType($data['type'] ?? '');

        $instance = new static;

        // Core identity
        $instance->name = $data['name'];
        $instance->type = $data['type'];
        $instance->title = $data['title'] ?? null;
        $instance->description = $data['description'] ?? null;
        $instance->author = $data['author'] ?? null;

        // Dependencies
        $instance->dependencies = $data['dependencies'] ?? [];
        $instance->devDependencies = $data['devDependencies'] ?? [];
        $instance->registryDependencies = $data['registryDependencies'] ?? [];

        // Files
        $instance->files = $data['files'] ?? [];

        // CSS
        $instance->css = $data['css'] ?? null;
        $instance->tailwind = $data['tailwind'] ?? null;

        // cssVars split into three columns
        $cssVars = $data['cssVars'] ?? [];
        $instance->vars_theme = $cssVars['app'] ?? null;
        $instance->vars_light = $cssVars['light'] ?? null;
        $instance->vars_dark = $cssVars['dark'] ?? null;

        // Flat font columns
        $light = $instance->vars_light ?? [];
        $instance->font_family = $light['font-sans'] ?? null;
        $instance->font_mono = $light['font-mono'] ?? null;
        $instance->font_serif = $light['font-serif'] ?? null;

        // Font object (registry:font)
        $font = $data['font'] ?? [];
        if (! empty($font)) {
            $instance->font_family = $font['family'] ?? $instance->font_family;
            $instance->font_provider = $font['provider'] ?? 'google';
            $instance->font_import = $font['import'] ?? null;
            $instance->font_variable = $font['variable'] ?? null;
            $instance->font_weight = $font['weight'] ?? [];
            $instance->font_subsets = $font['subsets'] ?? [];
            $instance->font_selector = $font['selector'] ?? null;
            $instance->font_dependency = $font['dependency'] ?? null;
        }

        // Metadata
        $instance->meta = $data['meta'] ?? null;
        $instance->docs = $data['docs'] ?? null;
        $instance->categories = $data['categories'] ?? [];

        // registry:style
        $instance->extends = $data['extends'] ?? null;

        // registry:base
        $instance->style = $data['style'] ?? null;
        $instance->icon_library = $data['iconLibrary'] ?? null;
        $instance->base_color = $data['baseColor'] ?? null;
        $instance->theme = $data['app'] ?? null;

        return $instance;
    }

    // =========================================================================
    // Serialise → shadcn JSON registry shape
    // =========================================================================

    /**
     * Return an array that matches the shadcn registry-item JSON schema exactly.
     *
     * @return array<string, mixed>
     */
    public function toRegistry(): array
    {
        $registry = [
            '$schema' => 'https://ui.shadcn.com/schema/registry-item.json',
            'name' => $this->name,
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'author' => $this->author,
            'dependencies' => $this->dependencies ?? [],
            'devDependencies' => $this->devDependencies ?? [],
            'registryDependencies' => $this->registryDependencies ?? [],
            'files' => $this->files ?? [],
            'css' => $this->css ?? [],
            'tailwind' => $this->tailwind,
            'cssVars' => $this->buildCssVars(),
            'meta' => $this->meta,
            'docs' => $this->docs,
            'categories' => $this->categories ?? [],
        ];

        // registry:style exclusive
        if ($this->type === 'registry:style') {
            $registry['extends'] = $this->extends;
        }

        // registry:base exclusive
        if ($this->type === 'registry:base') {
            $registry['style'] = $this->style;
            $registry['iconLibrary'] = $this->icon_library;
            $registry['baseColor'] = $this->base_color;
            $registry['app'] = $this->theme;
        }

        // registry:font exclusive
        if ($this->type === 'registry:font') {
            $registry['font'] = array_filter([
                'family' => $this->font_family,
                'provider' => $this->font_provider ?? 'google',
                'import' => $this->font_import,
                'variable' => $this->font_variable,
                'weight' => $this->font_weight ?? [],
                'subsets' => $this->font_subsets ?? [],
                'selector' => $this->font_selector,
                'dependency' => $this->font_dependency,
            ]);
        }

        return array_filter($registry, fn ($v) => ! is_null($v));
    }

    // =========================================================================
    // Serialise → shadcn CSS string (round-trip)
    // =========================================================================

    /**
     * Reconstruct the raw shadcn CSS from stored columns.
     * Produces: @import, :root, .dark, @app inline, @layer base.
     */
    public function toCss(): string
    {
        $lines = [];

        $lines[] = '@import "tailwindcss";';
        $lines[] = '';
        $lines[] = '@custom-variant dark (&:is(.dark *));';
        $lines[] = '';

        // ── :root ─────────────────────────────────────────────────────────
        $lines[] = ':root {';
        foreach ($this->vars_light ?? [] as $key => $value) {
            $lines[] = "  --{$key}: {$value};";
        }
        $lines[] = '}';
        $lines[] = '';

        // ── .dark ─────────────────────────────────────────────────────────
        $lines[] = '.dark {';
        foreach ($this->vars_dark ?? [] as $key => $value) {
            $lines[] = "  --{$key}: {$value};";
        }
        $lines[] = '}';
        $lines[] = '';

        // ── @app inline ─────────────────────────────────────────────────
        $lines[] = '@app inline {';

        // colour tokens → --color-* aliases
        $colorVars = array_filter(
            $this->vars_light ?? [],
            fn ($key) => ! in_array($key, self::NON_COLOR_KEYS, true)
                && ! str_starts_with($key, 'shadow'),
            ARRAY_FILTER_USE_KEY
        );

        foreach ($colorVars as $key => $value) {
            $lines[] = "  --color-{$key}: var(--{$key});";
        }

        $lines[] = '';

        // fonts
        foreach (['sans', 'mono', 'serif'] as $font) {
            $varKey = "font-{$font}";
            if (isset(($this->vars_light ?? [])[$varKey]) || isset(($this->vars_theme ?? [])[$varKey])) {
                $lines[] = "  --font-{$font}: var(--font-{$font});";
            }
        }

        $lines[] = '';

        // radius
        $hasRadius = isset(($this->vars_light ?? [])['radius'])
            || isset(($this->vars_theme ?? [])['radius']);

        if ($hasRadius) {
            $lines[] = '  --radius-sm: calc(var(--radius) - 4px);';
            $lines[] = '  --radius-md: calc(var(--radius) - 2px);';
            $lines[] = '  --radius-lg: var(--radius);';
            $lines[] = '  --radius-xl: calc(var(--radius) + 4px);';
            $lines[] = '';
        }

        // shadows
        $hasShadow = false;
        foreach (self::SHADOW_SIZES as $size) {
            $key = $size ? "shadow-{$size}" : 'shadow';
            if (isset(($this->vars_light ?? [])[$key])) {
                $lines[] = "  --{$key}: var(--{$key});";
                $hasShadow = true;
            }
        }

        if ($hasShadow) {
            $lines[] = '';
        }

        $lines[] = '}';
        $lines[] = '';

        // ── @layer base ───────────────────────────────────────────────────
        $lines[] = $this->buildLayerBase();

        return implode("\n", $lines);
    }

    // =========================================================================
    // Validation helpers
    // =========================================================================

    /**
     * Assert that `$type` is a valid shadcn registry type.
     *
     * @throws InvalidArgumentException
     */
    public static function assertValidType(string $type): void
    {
        if (! in_array($type, static::REGISTRY_TYPES, true)) {
            throw new InvalidArgumentException(
                "Invalid registry type \"{$type}\". Allowed: ".implode(', ', static::REGISTRY_TYPES)
            );
        }
    }

    /**
     * Assert that a file entry's `type` field is valid.
     *
     * @throws InvalidArgumentException
     */
    public static function assertValidFileType(string $type): void
    {
        if (! in_array($type, static::FILE_TYPES, true)) {
            throw new InvalidArgumentException(
                "Invalid registry file type \"{$type}\". Allowed: ".implode(', ', static::FILE_TYPES)
            );
        }
    }

    /**
     * Validate all file entries in the `files` array against the schema rules:
     * - `path` and `type` are always required
     * - `target` is required when type is registry:file or registry:page
     *
     * @param  array<int, array<string, mixed>>  $files
     * @return array<int, string> Validation error messages (empty = valid)
     */
    public static function validateFiles(array $files): array
    {
        $errors = [];

        foreach ($files as $i => $file) {
            $idx = "files[{$i}]";

            if (empty($file['path'])) {
                $errors[] = "{$idx}: 'path' is required.";
            }

            if (empty($file['type'])) {
                $errors[] = "{$idx}: 'type' is required.";
            } else {
                try {
                    static::assertValidFileType($file['type']);
                } catch (InvalidArgumentException $e) {
                    $errors[] = "{$idx}: {$e->getMessage()}";
                }

                if (
                    in_array($file['type'], ['registry:file', 'registry:page'], true)
                    && empty($file['target'])
                ) {
                    $errors[] = "{$idx}: 'target' is required when type is '{$file['type']}'.";
                }
            }
        }

        return $errors;
    }

    // =========================================================================
    // Type guard helpers
    // =========================================================================

    public function isFont(): bool
    {
        return $this->type === 'registry:font';
    }

    public function isBase(): bool
    {
        return $this->type === 'registry:base';
    }

    public function isStyle(): bool
    {
        return $this->type === 'registry:style';
    }

    public function isComponent(): bool
    {
        return $this->type === 'registry:component';
    }

    public function isBlock(): bool
    {
        return $this->type === 'registry:block';
    }

    public function isHook(): bool
    {
        return $this->type === 'registry:hook';
    }

    public function isLib(): bool
    {
        return $this->type === 'registry:lib';
    }

    public function isPage(): bool
    {
        return $this->type === 'registry:page';
    }

    public function isFile(): bool
    {
        return $this->type === 'registry:file';
    }

    public function isUi(): bool
    {
        return $this->type === 'registry:ui';
    }

    public function isItem(): bool
    {
        return $this->type === 'registry:item';
    }

    // =========================================================================
    // Private CSS building helpers
    // =========================================================================

    /**
     * Build the `cssVars` object for toRegistry().
     * Only emitted for types that use CSS variables.
     *
     * @return array<string, array<string, string>>
     */
    private function buildCssVars(): array
    {
        if (! in_array($this->type, self::CSS_VAR_TYPES, true)) {
            return [];
        }

        $fonts = array_filter([
            '--font-sans' => $this->font_family,
            '--font-mono' => $this->font_mono,
            '--font-serif' => $this->font_serif,
        ]);

        return array_filter([
            'app' => $this->vars_theme ?? [],
            'light' => array_merge($this->vars_light ?? [], $fonts),
            'dark' => array_merge($this->vars_dark ?? [], $fonts),
        ], fn ($v) => ! empty($v));
    }

    /**
     * Render the `@layer base { }` block for toCss().
     */
    private function buildLayerBase(): string
    {
        $rules = $this->css_base ?? $this->defaultCssBase();
        $lines = [];

        $lines[] = '@layer base {';
        foreach ($rules as $selector => $declarations) {
            $lines[] = "  {$selector} {";
            foreach ($declarations as $property => $value) {
                $lines[] = "    {$property} {$value};";
            }
            $lines[] = '  }';
        }
        $lines[] = '}';

        return implode("\n", $lines);
    }

    /**
     * Default @layer base rules used when css_base is null.
     *
     * @return array<string, array<string, string>>
     */
    private function defaultCssBase(): array
    {
        return [
            '*' => ['@apply' => 'border-border outline-ring/50'],
            'body' => ['@apply' => 'bg-background text-foreground'],
        ];
    }

    // =========================================================================
    // Private CSS parsing helpers
    // =========================================================================

    /**
     * Parse `--key: value;` pairs out of a CSS block string.
     *
     * @return array<string, string>
     */
    private static function parseCssVars(string $block): array
    {
        $vars = [];
        preg_match_all('/--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/', $block, $matches, PREG_SET_ORDER);
        foreach ($matches as $match) {
            $vars[trim($match[1])] = trim($match[2]);
        }

        return $vars;
    }

    /**
     * Parse an `@app inline { }` block into a key → value map.
     * Resolves `var(--x)` references against the already-parsed light vars.
     *
     * @param  array<string, string>  $lightVars
     * @return array<string, string>
     */
    private static function parseThemeInline(string $block, array $lightVars): array
    {
        $vars = static::parseCssVars($block);
        $resolved = [];

        foreach ($vars as $key => $value) {
            // Resolve single var() references into their light-token value
            if (preg_match('/^var\(--([a-zA-Z0-9_-]+)\)$/', $value, $m)) {
                $resolved[$key] = $lightVars[$m[1]] ?? $value;
            } else {
                $resolved[$key] = $value;
            }
        }

        // Also capture font references that may use var() pattern
        $fonts = [];
        foreach (['sans', 'mono', 'serif'] as $font) {
            $varKey = "font-{$font}";
            if (isset($resolved[$varKey])) {
                $fonts[$varKey] = $resolved[$varKey];
            } elseif (preg_match("/--font-{$font}\s*:\s*var\(--font-{$font}\)/", $block)) {
                // Forward reference pattern: keep as-is
                $fonts[$varKey] = $lightVars[$varKey] ?? null;
            }
        }

        return array_filter(array_merge($resolved, array_filter($fonts)));
    }

    /**
     * Parse `@layer base` content into a structured array.
     * Captures both `@apply` declarations and raw `property: value` declarations.
     *
     * @return array<string, array<string, string>>
     */
    private static function parseLayerBase(string $block): array
    {
        $rules = [];
        // Match each selector block, handling nested braces
        preg_match_all('/([^{]+)\{([^}]+)\}/s', $block, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $selector = trim($match[1]);
            $declarations = [];

            // @apply utilities
            if (preg_match_all('/@apply\s+([^;]+);/', $match[2], $applyMatches)) {
                $declarations['@apply'] = trim(implode(' ', $applyMatches[1]));
            }

            // Raw property: value declarations (not @apply)
            preg_match_all(
                '/(?<!@apply\s)([a-zA-Z-]+)\s*:\s*([^;@{]+);/',
                $match[2],
                $propMatches,
                PREG_SET_ORDER
            );
            foreach ($propMatches as $prop) {
                $declarations[trim($prop[1])] = trim($prop[2]);
            }

            if (! empty($declarations)) {
                $rules[$selector] = $declarations;
            }
        }

        return $rules;
    }
}
