export const SANS_FONTS = [
    'Inter',
    'Geist',
    'Manrope',
    'DM Sans',
    'Plus Jakarta Sans',
    'Outfit',
    'Work Sans',
    'Figtree',
    'Space Grotesk',
    'Sora',
    'Nunito',
    'Poppins',
];

export const SERIF_FONTS = [
    'Instrument Serif',
    'Cormorant Garamond',
    'Playfair Display',
    'Lora',
    'Libre Baskerville',
    'DM Serif Display',
    'Source Serif 4',
];

export const MONO_FONTS = [
    'JetBrains Mono',
    'Geist Mono',
    'Fira Code',
    'IBM Plex Mono',
    'Space Mono',
    'Source Code Pro',
];

export function loadGoogleFont(family: string) {
    if (typeof document === 'undefined') {
        return;
    }

    const id = `gf-${family.replace(/\s+/g, '-')}`;

    if (document.getElementById(id)) {
        return;
    }

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
        family,
    )}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
}
