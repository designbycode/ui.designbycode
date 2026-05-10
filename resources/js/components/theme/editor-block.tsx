/**
 * EditorBlock Component
 *
 * A Monaco-based code editor component that mirrors the visual style of CodeBlock.
 * It supports syntax highlighting, theme integration (light/dark), full-screen mode,
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
 * - lucide-react
 * - clsx
 * - tailwind-merge
 *
 * Note: This component is client-only and will render a placeholder during SSR.
 */

'use client';

import Editor, { type EditorProps } from '@monaco-editor/react';
import { Check, Copy, Maximize2, Minimize2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { cn } from '@/lib/utils';

interface EditorBlockProps {
    /** Current code value */
    value: string;
    /** Callback when value changes */
    onChange?: (value: string) => void;
    /** Language for syntax highlighting (default: "javascript") */
    language?: string;
    /** Whether the editor is read-only (default: false) */
    readOnly?: boolean;
    /** Whether to hide line numbers (default: false) */
    hideLineNumbers?: boolean;
    /** Additional CSS classes for the container */
    className?: string;
    /** Visual variant: 'default' has a header, 'minimal' has floating controls */
    variant?: 'default' | 'minimal';
    /** Whether to show the copy button (default: true) */
    showCopyButton?: boolean;
    /** Whether to show the full-screen toggle (default: true) */
    showFullScreenToggle?: boolean;
    /** Height of the editor (e.g., "300px", "50vh") (default: "300px") */
    height?: string | number;
    /** Override the automatically detected theme ('light' or 'dark') */
    themeOverride?: 'light' | 'dark';
    /** Additional Monaco editor options */
    options?: EditorProps['options'];
    /** Whether to automatically resize the editor when the container changes */
    autoResize?: boolean;
}

export default function EditorBlock({
    value,
    onChange,
    language = 'javascript',
    readOnly = false,
    hideLineNumbers = false,
    className,
    variant = 'default',
    showCopyButton = true,
    showFullScreenToggle = true,
    height = '300px',
    themeOverride,
    options,
    autoResize = true,
}: EditorBlockProps) {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [, copy] = useClipboard();
    const { resolvedAppearance } = useAppearance();

    const currentTheme = themeOverride || resolvedAppearance;
    const monacoTheme = currentTheme === 'dark' ? 'vs-dark' : 'light';

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

    useEffect(() => {
        setMounted(true);
    }, []);

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
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                toast.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    const editorOptions: EditorProps['options'] = {
        minimap: { enabled: false },
        wordWrap: 'on',
        fontSize: 14,
        lineNumbers: hideLineNumbers ? 'off' : 'on',
        readOnly,
        automaticLayout: autoResize,
        scrollBeyondLastLine: false,
        padding: { top: 12, bottom: 12 },
        ...options,
    };

    if (!mounted) {
        return (
            <div
                style={{ height }}
                className={cn(
                    'w-full rounded-md border border-border bg-muted/30 animate-pulse',
                    className
                )}
            />
        );
    }

    const Controls = () => (
        <div className="flex items-center gap-1">
            {showCopyButton && (
                <div className="flex items-center gap-1">
                    <span
                        className={cn(
                            'text-xs text-green-500 transition-opacity duration-200',
                            copied ? 'opacity-100' : 'pointer-events-none opacity-0'
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
                    title={isFullScreen ? "Exit full-screen" : "Enter full-screen"}
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

    return (
        <div
            ref={containerRef}
            className={cn(
                'group/editor-block relative flex flex-col overflow-hidden rounded-md border border-border bg-muted/30 text-sm',
                isFullScreen && 'fixed inset-0 z-50 rounded-none border-none bg-background',
                className
            )}
            style={!isFullScreen ? { height } : undefined}
        >
            {variant === 'default' && (
                <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/50 px-3 py-2">
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

            <div className="relative flex-1 min-h-0">
                <Editor
                    height="100%"
                    language={normalizedLanguage}
                    theme={monacoTheme}
                    value={value}
                    onChange={(val) => onChange?.(val || '')}
                    options={editorOptions}
                    loading={
                        <div className="flex h-full w-full items-center justify-center bg-muted/10 text-muted-foreground animate-pulse">
                            Loading editor...
                        </div>
                    }
                />
            </div>
        </div>
    );
}
