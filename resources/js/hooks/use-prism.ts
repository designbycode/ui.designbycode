'use client';

import Prism from 'prismjs';
import { useCallback, useMemo } from 'react';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';

const languageMap: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    css: 'css',
    php: 'php',
    markup: 'markup',
    sh: 'bash',
    shell: 'bash',
    html: 'markup',
};

export function usePrismHighlight(code: string, language: string = 'bash') {
    const normalizedLanguage = useMemo(
        () => languageMap[language.toLowerCase()] || language.toLowerCase(),
        [language],
    );

    const grammar = useMemo(
        () => Prism.languages[normalizedLanguage],
        [normalizedLanguage],
    );

    const highlightedCode = useMemo(
        () =>
            grammar ? Prism.highlight(code, grammar, normalizedLanguage) : code,
        [code, grammar, normalizedLanguage],
    );

    return {
        normalizedLanguage,
        highlightedCode,
    };
}

export function useCopyToClipboard() {
    const copy = useCallback(async (text: string): Promise<boolean> => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.top = '-9999px';
            textarea.style.left = '-9999px';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        } catch {
            return false;
        }
    }, []);

    return { copy };
}
