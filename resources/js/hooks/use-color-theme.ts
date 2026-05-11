import { useEffect } from 'react';
import { useSyncExternalStore } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { buildCSSVars } from '@/lib/build-css-vars';
import type { Theme } from '@/types/theme';

const STORAGE_KEY = 'color-app';

type StoredTheme = {
    name: string;
    varsLight: Record<string, string>;
    varsDark: Record<string, string>;
    varsTheme: Record<string, string>;
};

let currentThemeName: string | null = null;
let appliedVarKeys: string[] = [];
const listeners = new Set<() => void>();

function getStoredTheme(): StoredTheme | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? (JSON.parse(raw) as StoredTheme) : null;
    } catch {
        return null;
    }
}

function getEffectiveAppearance(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const stored = localStorage.getItem('appearance') as string | null;

    if (stored === 'dark') {
        return 'dark';
    }

    if (stored === 'light') {
        return 'light';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function clearAppliedVars(): void {
    appliedVarKeys.forEach((key) => {
        document.documentElement.style.removeProperty(key);
    });
    appliedVarKeys = [];
}

function applyThemeToDocument(
    theme: StoredTheme,
    appearance: 'light' | 'dark',
): void {
    clearAppliedVars();

    const merged = {
        ...(theme.varsTheme ?? {}),
        ...(appearance === 'dark'
            ? (theme.varsDark ?? {})
            : (theme.varsLight ?? {})),
    };

    const cssVars = buildCSSVars(merged);

    appliedVarKeys = Object.keys(cssVars);
    Object.entries(cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value as string);
    });
}

function notify(): void {
    listeners.forEach((fn) => fn());
}

function subscribe(callback: () => void): () => void {
    listeners.add(callback);

    return () => listeners.delete(callback);
}

function getSnapshot(): string | null {
    return currentThemeName;
}

function getServerSnapshot(): string | null {
    return null;
}

export function initializeColorTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const stored = getStoredTheme();

    if (stored) {
        currentThemeName = stored.name;
        applyThemeToDocument(stored, getEffectiveAppearance());
    }
}

export function setColorTheme(registry: Theme): void {
    const stored: StoredTheme = {
        name: registry.name,
        varsLight: registry.cssVars?.light ?? registry.vars_light ?? {},
        varsDark: registry.cssVars?.dark ?? registry.vars_dark ?? {},
        varsTheme: registry.cssVars?.theme ?? registry.vars_theme ?? {},
    };

    currentThemeName = registry.name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    applyThemeToDocument(stored, getEffectiveAppearance());
    notify();
}

export function clearColorTheme(): void {
    currentThemeName = null;
    localStorage.removeItem(STORAGE_KEY);
    clearAppliedVars();
    notify();
}

export function useColorTheme() {
    const themeName = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    const { resolvedAppearance } = useAppearance();

    useEffect(() => {
        const stored = getStoredTheme();

        if (stored && stored.name === themeName) {
            applyThemeToDocument(stored, resolvedAppearance);
        }
    }, [resolvedAppearance, themeName]);

    return {
        themeName,
        setColorTheme,
        clearColorTheme,
        isThemeActive: themeName !== null,
    } as const;
}
