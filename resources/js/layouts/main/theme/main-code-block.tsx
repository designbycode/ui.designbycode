'use client';

import { Check, Copy } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard, usePrismHighlight } from '@/hooks/use-prism';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
    variant?: 'default' | 'minimal';
    showCopyButton?: boolean;
}

function MainCodeBlock({
    code,
    language = 'bash',
    className,
    variant = 'default',
    showCopyButton = true,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const { normalizedLanguage, highlightedCode } = usePrismHighlight(
        code,
        language,
    );
    const { copy } = useCopyToClipboard();

    const handleCopy = useCallback(async () => {
        const success = await copy(code);

        if (success) {
            setCopied(true);
            toast.success('Copied to clipboard');
            setTimeout(() => setCopied(false), 2000);
        } else {
            toast.error('Failed to copy to clipboard');
        }
    }, [code, copy]);

    return (
        <div
            className={cn(
                'group/code-block relative rounded-md border border-border bg-muted/30 text-sm',
                className,
            )}
        >
            {variant === 'default' && (
                <div className="flex h-14 items-center justify-between border-b border-border bg-muted/50 px-3 py-2">
                    <span className="font-mono text-sm font-bold text-muted-foreground">
                        {normalizedLanguage}
                    </span>
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
                                className="transition-opacity hover:opacity-100"
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
                </div>
            )}
            {variant === 'minimal' && showCopyButton && (
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover/code-block:opacity-100">
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
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                        {copied ? (
                            <Check className="size-4 text-green-500" />
                        ) : (
                            <Copy className="size-4" />
                        )}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
            )}
            <div className="overflow-x-auto">
                <pre
                    className={cn(
                        'm-0! font-mono! text-sm leading-relaxed',
                        variant === 'default'
                            ? 'rounded-none! p-3!'
                            : 'rounded-md! p-4!',
                    )}
                >
                    <code data-language={language} suppressHydrationWarning>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: highlightedCode,
                            }}
                        />
                    </code>
                </pre>
            </div>
        </div>
    );
}

export { MainCodeBlock, type CodeBlockProps };
