import { useAppearance } from '@/hooks/use-appearance';
import type { Registry } from '@/types';
import { buildCSSVars } from '@/lib/build-css-vars';

function useCSSVars(registry: Registry) {
    const { resolvedAppearance } = useAppearance();
    const vars =
        resolvedAppearance === 'dark'
            ? (registry.cssVars?.dark ?? registry.vars_dark ?? {})
            : (registry.cssVars?.light ?? registry.vars_light ?? {});

    return {
        vars,
        cssVars: buildCSSVars(vars),
    };
}

export { useCSSVars };
