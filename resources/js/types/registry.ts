export type RegistryType =
    | 'registry:theme'
    | 'registry:component'
    | 'registry:block'
    | 'registry:font'
    | 'registry:hook'
    | 'registry:lib'
    | 'registry:page'
    | 'registry:file'
    | 'registry:style'
    | 'registry:base'
    | 'registry:ui'
    | 'registry:item';

export type RegistryCssVars = {
    theme: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
};

export type RegistryFile = {
    path: string;
    type: string;
    target?: string;
    content?: string;
};

export type Tag = {
    name: string;
    slug: string;
};

export type Registry = {
    name: string;
    type: RegistryType;
    title: string;
    description: string | null;
    author: string | null;
    dependencies: string[];
    devDependencies: string[];
    registryDependencies: string[];
    files: RegistryFile[];
    css: Record<string, unknown>[];
    css_base: Record<string, unknown>[];
    tailwind: Record<string, unknown>[];
    cssVars?: RegistryCssVars;
    vars_theme: Record<string, string>;
    vars_light: Record<string, string>;
    vars_dark: Record<string, string>;
    font_family: string | null;
    font_mono: string | null;
    font_serif: string | null;
    font_provider: string | null;
    font_import: string | null;
    font_variable: string | null;
    font_weight: string[];
    font_subsets: string[];
    font_selector: string | null;
    font_dependency: string | null;
    meta: Record<string, unknown>;
    docs: string | null;
    categories?: string[];
    tags?: Tag[] | string[];
    extends: string | null;
    style: string | null;
    icon_library: string | null;
    base_color: string | null;
    base_theme_config: Record<string, unknown>;
    created_at: string;
    updated_at: string;
};

export const REGISTRY_TYPE_LABELS: Record<string, string> = {
    'registry:font': 'font',
    'registry:style': 'style',
    'registry:hook': 'hook',
    'registry:ui': 'ui',
    'registry:lib': 'lib',
    'registry:block': 'block',
    'registry:component': 'component',
    'registry:page': 'page',
    'registry:file': 'file',
    'registry:base': 'base',
    'registry:item': 'item',
    'registry:theme': 'theme',
};
