import { useState, useEffect } from 'react';
import { getCssVarAsColor } from '@/lib/color-utils';

interface ThemeColors {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    background: string;
    border: string;
}

export function useThemeColors(): ThemeColors { // Update return type
    const [colors, setColors] = useState<ThemeColors>(() => ({ // Specify type for useState
        primary: getCssVarAsColor('--primary', 'hex') ?? '#e54545',
        secondary: getCssVarAsColor('--secondary', 'hex') ?? '#0bdec4',
        muted: getCssVarAsColor('--muted', 'hex') ?? '#f2f2f2', // Default muted
        accent: getCssVarAsColor('--accent', 'hex') ?? '#f2a766', // Default accent
        background: getCssVarAsColor('--background', 'hex') ?? '#ffffff', // Default background
        border: getCssVarAsColor('--border', 'hex') ?? '#e2e8f0', // Default border
    }));

    useEffect(() => {
        const update = () => {
            setColors({
                primary: getCssVarAsColor('--primary', 'hex') ?? '#e54545',
                secondary: getCssVarAsColor('--secondary', 'hex') ?? '#0bdec4',
                muted: getCssVarAsColor('--muted', 'hex') ?? '#f2f2f2',
                accent: getCssVarAsColor('--accent', 'hex') ?? '#f2a766',
                background: getCssVarAsColor('--background', 'hex') ?? '#ffffff',
                border: getCssVarAsColor('--border', 'hex') ?? '#e2e8f0',
            });
        };

        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style'],
        });

        return () => observer.disconnect();
    }, []);

    return colors;
}
