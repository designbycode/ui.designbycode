import { useState, useEffect } from 'react';
import { getCssVarAsColor } from '@/lib/color-utils';

export function useThemeColors(): { primary: string; secondary: string } {
    const [colors, setColors] = useState(() => ({
        primary: getCssVarAsColor('--primary', 'hex') ?? '#e54545',
        secondary: getCssVarAsColor('--secondary', 'hex') ?? '#0bdec4',
    }));

    useEffect(() => {
        const update = () => {
            setColors({
                primary: getCssVarAsColor('--primary', 'hex') ?? '#e54545',
                secondary: getCssVarAsColor('--secondary', 'hex') ?? '#0bdec4',
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
