import { useAppearance } from '@/hooks/use-appearance';
import { buildCSSVars } from '@/lib/build-css-vars';
import type { Registry } from '@/types/registry';
import type { Theme } from '@/types/theme';

type CSSVarsSource = Theme | Registry;

function useCSSVars(registry: CSSVarsSource) {
    const { resolvedAppearance } = useAppearance();

    const themeVars = registry.cssVars?.app ?? registry.vars_theme ?? {};
    const modeVars =
        resolvedAppearance === 'dark'
            ? (registry.cssVars?.dark ?? registry.vars_dark ?? {})
            : (registry.cssVars?.light ?? registry.vars_light ?? {});

    const vars = { ...themeVars, ...modeVars };

    return {
        vars,
        cssVars: buildCSSVars(vars),
    };
}

export { useCSSVars };
