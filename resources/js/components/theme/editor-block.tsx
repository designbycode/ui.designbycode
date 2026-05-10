/**
 * EditorBlock Component
 *
 * A Monaco-based code editor component that mirrors the visual style of CodeBlock.
 * Supports syntax highlighting, dynamic theme integration (light/dark) with
 * automatic OKLCH → hex conversion for Tailwind CSS variables, full-screen mode,
 * and copy-to-clipboard functionality.
 *
 * Usage Example:
 * ```tsx
 * import EditorBlock from '@/components/theme/editor-block';
 *
 * function MyComponent() {
 *   const [code, setCode] = useState('console.log("Hello World");');
 *
 *   return (
 *     <EditorBlock
 *       value={code}
 *       onChange={setCode}
 *       language="javascript"
 *       height="400px"
 *     />
 *   );
 * }
 * ```
 *
 * Required Packages:
 * - @monaco-editor/react
 * - culori
 * - lucide-react
 * - clsx
 * - tailwind-merge
 */

'use client';

import type { EditorProps, Monaco } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import { Check, Copy, Maximize2, Minimize2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { getCssVarAsColor } from '@/lib/color-utils';
import { cn } from '@/lib/utils';

// ─── Monaco theme name constants ──────────────────────────────────────────────

const MONACO_LIGHT_THEME = 'editor-light';
const MONACO_DARK_THEME = 'editor-dark';

// ─── Theme builder ────────────────────────────────────────────────────────────

/**
 * Reads Tailwind CSS variables from the document root, converts any OKLCH
 * (or other non-hex) values to hex, and returns a Monaco theme definition.
 *
 * Falls back to safe defaults if a variable cannot be parsed.
 */
function buildMonacoTheme(
    appearance: 'light' | 'dark',
): Parameters<Monaco['editor']['defineTheme']>[1] {
    const get = (varName: string, fallback: string) =>
        getCssVarAsColor(varName, 'hex') ?? fallback;

    const isDark = appearance === 'dark';

    return {
        base: isDark ? 'vs-dark' : 'vs',
        inherit: true,
        rules: [
            {
                token: 'comment',
                foreground: isDark ? '6A9955' : '008000',
                fontStyle: 'italic',
            },
            { token: 'keyword', foreground: isDark ? 'C586C0' : 'AF00DB' },
            { token: 'string', foreground: isDark ? 'CE9178' : 'A31515' },
            { token: 'number', foreground: isDark ? 'B5CEA8' : '098658' },
            { token: 'type', foreground: isDark ? '4EC9B0' : '267F99' },
        ],
        colors: {
            'editor.background': get(
                '--background',
                isDark ? '#1e1e1e' : '#ffffff',
            ),
            'editor.foreground': get(
                '--foreground',
                isDark ? '#d4d4d4' : '#000000',
            ),
            'editor.selectionBackground': get(
                '--accent',
                isDark ? '#264f78' : '#add6ff',
            ),
            'editor.inactiveSelectionBackground': get(
                '--muted',
                isDark ? '#3a3d41' : '#e5ebf1',
            ),
            'editorLineNumber.foreground': get(
                '--muted-foreground',
                isDark ? '#858585' : '#237893',
            ),
            'editorCursor.foreground': get(
                '--primary',
                isDark ? '#aeafad' : '#000000',
            ),
            'editorWhitespace.foreground': get(
                '--border',
                isDark ? '#3b3b3b' : '#d4d4d4',
            ),
            'editor.lineHighlightBackground': get(
                '--muted',
                isDark ? '#2a2d2e' : '#f5f5f5',
            ),
            'editorWidget.background': get(
                '--card',
                isDark ? '#252526' : '#f3f3f3',
            ),
            'editorWidget.border': get(
                '--border',
                isDark ? '#454545' : '#c8c8c8',
            ),
            'input.background': get('--input', isDark ? '#3c3c3c' : '#ffffff'),
            'scrollbarSlider.background': get(
                '--muted',
                isDark ? '#4e4e4e80' : '#64646480',
            ),
            'scrollbarSlider.hoverBackground': get(
                '--muted-foreground',
                isDark ? '#646464b3' : '#646464b3',
            ),
        },
    };
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditorBlockProps {
    value: string;
    onChange?: (value: string) => void;
    language?: string;
    readOnly?: boolean;
    lineNumbers?: boolean;
    className?: string;
    variant?: 'default' | 'minimal';
    showCopyButton?: boolean;
    showFullScreenToggle?: boolean;
    height?: string | number;
    themeOverride?: 'light' | 'dark';
    options?: EditorProps['options'];
    autoResize?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditorBlock({
    value,
    onChange,
    language = 'javascript',
    readOnly = true,
    lineNumbers = true,
    className,
    variant = 'default',
    showCopyButton = true,
    showFullScreenToggle = false,
    height = '200px',
    themeOverride,
    options,
    autoResize = true,
}: EditorBlockProps) {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const [, copy] = useClipboard();
    const { resolvedAppearance } = useAppearance();

    const currentTheme = themeOverride ?? resolvedAppearance;
    const monacoThemeName =
        currentTheme === 'dark' ? MONACO_DARK_THEME : MONACO_LIGHT_THEME;

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

    const normalizedLanguage =
        languageMap[language.toLowerCase()] || language.toLowerCase();

    // ── Mount ────────────────────────────────────────────────────────────────

    useEffect(() => {
        setMounted(true);
    }, []);

    // ── Dynamic theme switching ───────────────────────────────────────────────
    // Re-define and re-apply the Monaco theme whenever the app appearance changes.
    // This ensures OKLCH Tailwind variables are re-read and re-converted each time.

    useEffect(() => {
        const monaco = monacoRef.current;

        if (!monaco) {
            return;
        }

        monaco.editor.defineTheme(
            MONACO_LIGHT_THEME,
            buildMonacoTheme('light'),
        );
        monaco.editor.defineTheme(MONACO_DARK_THEME, buildMonacoTheme('dark'));
        monaco.editor.setTheme(monacoThemeName);
    }, [currentTheme, monacoThemeName]);

    // ── Handlers ─────────────────────────────────────────────────────────────

    const handleCopy = useCallback(async () => {
        const success = await copy(value);

        if (success) {
            setCopied(true);
            toast.success('Copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } else {
            toast.error('Failed to copy to clipboard');
        }
    }, [value, copy]);

    const toggleFullScreen = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                toast.error(`Error enabling full-screen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullScreenChange = () =>
            setIsFullScreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () =>
            document.removeEventListener(
                'fullscreenchange',
                handleFullScreenChange,
            );
    }, []);

    // ── Editor options ────────────────────────────────────────────────────────

    const editorOptions: EditorProps['options'] = {
        minimap: { enabled: false },
        wordWrap: 'on',
        fontSize: 14,
        lineNumbers: lineNumbers ? 'on' : 'off',
        readOnly,
        automaticLayout: autoResize,
        scrollBeyondLastLine: false,
        padding: { top: 12, bottom: 12 },
        ...options,
    };

    // ── SSR placeholder ───────────────────────────────────────────────────────

    if (!mounted) {
        return (
            <div
                style={{ height }}
                className={cn(
                    'w-full animate-pulse rounded-md border border-border bg-muted/30',
                    className,
                )}
            />
        );
    }

    // ── Controls ──────────────────────────────────────────────────────────────

    const Controls = () => (
        <div className="flex items-center gap-1">
            {showCopyButton && (
                <div className="flex items-center gap-1">
                    <span
                        className={cn(
                            'text-xs text-green-500 transition-opacity duration-200',
                            copied
                                ? 'opacity-100'
                                : 'pointer-events-none opacity-0',
                        )}
                    >
                        Copied
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        title="Copy code"
                        className="h-8 w-8 transition-opacity hover:opacity-100"
                    >
                        {copied ? (
                            <Check className="size-4 text-green-500" />
                        ) : (
                            <Copy className="size-4" />
                        )}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
            )}
            {showFullScreenToggle && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullScreen}
                    title={
                        isFullScreen ? 'Exit full-screen' : 'Enter full-screen'
                    }
                    className="h-8 w-8 transition-opacity hover:opacity-100"
                >
                    {isFullScreen ? (
                        <Minimize2 className="size-4" />
                    ) : (
                        <Maximize2 className="size-4" />
                    )}
                    <span className="sr-only">Toggle Fullscreen</span>
                </Button>
            )}
        </div>
    );

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div
            ref={containerRef}
            className={cn(
                'group/editor-block relative flex flex-col overflow-hidden rounded-md border border-border text-sm',
                isFullScreen &&
                    'fixed inset-0 z-50 rounded-none border-none bg-background',
                className,
            )}
            style={!isFullScreen ? { height } : undefined}
        >
            {variant === 'default' && (
                <div className="flex h-14 shrink-0 items-center justify-between rounded-t-[inherit] border-b border-border bg-card px-3 py-2">
                    <span className="font-mono text-xs font-semibold text-muted-foreground">
                        {normalizedLanguage}
                    </span>
                    <Controls />
                </div>
            )}

            {variant === 'minimal' && (
                <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover/editor-block:opacity-100">
                    <Controls />
                </div>
            )}

            <div className="relative min-h-0 flex-1">
                <Editor
                    height="100%"
                    language={normalizedLanguage}
                    beforeMount={(monaco) => {
                        // Store monaco instance for later dynamic theme updates
                        monacoRef.current = monaco;

                        // Define both themes upfront so Monaco never renders with wrong colors
                        monaco.editor.defineTheme(
                            MONACO_LIGHT_THEME,
                            buildMonacoTheme('light'),
                        );
                        monaco.editor.defineTheme(
                            MONACO_DARK_THEME,
                            buildMonacoTheme('dark'),
                        );
                    }}
                    onMount={(_, monaco) => {
                        // Apply the correct theme for the current appearance on mount
                        monaco.editor.setTheme(monacoThemeName);
                    }}
                    theme={monacoThemeName}
                    value={value}
                    onChange={(val) => onChange?.(val || '')}
                    options={editorOptions}
                    loading={
                        <div className="flex h-full w-full animate-pulse items-center justify-center bg-muted/10 text-muted-foreground">
                            Loading editor...
                        </div>
                    }
                />
            </div>
        </div>
    );
}
