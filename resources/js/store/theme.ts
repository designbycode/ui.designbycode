import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_LIGHT, DEFAULT_DARK } from '@/lib/theme/defaults';
import type { TokenMap } from '@/lib/theme/defaults';

export type ThemeFonts = { sans: string; serif: string; mono: string };

export interface ThemeState {
    title: string;
    name: string;
    description: string;
    tags: string[];

    light: TokenMap;
    dark: TokenMap;
    radius: number;
    fonts: ThemeFonts;
    baseFontSize: number;
    scaleRatio: number;
    lineHeight: number;
    letterSpacing: number;

    setTitle: (v: string) => void;
    setName: (v: string) => void;
    setDescription: (v: string) => void;
    setTags: (v: string[]) => void;
    setInfo: (
        info: Partial<
            Pick<ThemeState, 'title' | 'name' | 'description' | 'tags'>
        >,
    ) => void;

    setToken: (mode: 'light' | 'dark', token: string, value: string) => void;
    setManyTokens: (
        mode: 'light' | 'dark',
        map: Record<string, string>,
    ) => void;
    setRadius: (v: number) => void;
    setFont: (kind: keyof ThemeFonts, v: string) => void;
    setBaseFontSize: (v: number) => void;
    setScaleRatio: (v: number) => void;
    setLineHeight: (v: number) => void;
    setLetterSpacing: (v: number) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            title: 'My New Theme',
            name: 'my-new-theme',
            description: '',
            tags: [],

            light: { ...DEFAULT_LIGHT },
            dark: { ...DEFAULT_DARK },
            radius: 0.625,
            fonts: {
                sans: 'Inter',
                serif: 'Instrument Serif',
                mono: 'JetBrains Mono',
            },
            baseFontSize: 16,
            scaleRatio: 1.25,
            lineHeight: 1.5,
            letterSpacing: 0,

            setTitle: (v) => set({ title: v }),
            setName: (v) => set({ name: v }),
            setDescription: (v) => set({ description: v }),
            setTags: (v) => set({ tags: v }),
            setInfo: (info) => set((s) => ({ ...s, ...info })),

            setToken: (mode, token, value) =>
                set((s) => ({
                    [mode]: { ...s[mode], [token]: value },
                })),

            setManyTokens: (mode, map) =>
                set((s) => ({
                    [mode]: { ...s[mode], ...map },
                })),

            setRadius: (v) => set({ radius: v }),
            setFont: (kind, v) =>
                set((s) => ({ fonts: { ...s.fonts, [kind]: v } })),
            setBaseFontSize: (v) => set({ baseFontSize: v }),
            setScaleRatio: (v) => set({ scaleRatio: v }),
            setLineHeight: (v) => set({ lineHeight: v }),
            setLetterSpacing: (v) => set({ letterSpacing: v }),
        }),
        { name: 'theme-studio-store' },
    ),
);
