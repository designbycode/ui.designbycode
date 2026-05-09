'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCopyToClipboard, usePrismHighlight } from '@/hooks/use-prism';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedTabs } from '@/registry/new-york/components/ui/tabs/animated-tabs';
import { usePackageManagerStore } from '@/store/use-package-manager';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface PackageManagerCode {
    npm?: string;
    pnpm?: string;
    yarn?: string;
    bun?: string;
}

interface PackageManagerCodeProps {
    codes: PackageManagerCode;
    defaultManager?: PackageManager;
    className?: string;
}

const managers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

export function PackageManagerCode({
    codes,
    className,
}: PackageManagerCodeProps) {
    const { selectedManager, setSelectedManager } = usePackageManagerStore();

    const available = managers.filter((m) => codes[m]);

    const code = codes[selectedManager] ?? '';
    const { highlightedCode } = usePrismHighlight(code, 'bash');
    const { copy } = useCopyToClipboard();
    const [showCopied, setShowCopied] = useState(false);

    useEffect(() => {
        if (showCopied) {
            const timer = setTimeout(() => {
                setShowCopied(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showCopied]);

    const handleCopy = async () => {
        await copy(code);
        toast.success(`${selectedManager} command copied to clipboard!`);
        setShowCopied(true);
    };

    return (
        <div
            className={cn(
                'group/package-manager relative min-w-0 rounded-md border',
                className,
            )}
        >
            <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                    <Terminal className="size-5 text-muted-foreground" />

                    <AnimatedTabs
                        value={selectedManager}
                        onChange={(id) =>
                            setSelectedManager(id as PackageManager)
                        }
                        tabs={available.map((m) => ({
                            id: m,
                            label: m,
                        }))}
                        tabsClassName="p-1 bg-primary/10"
                        activeTabClassName="text-primary-foreground"
                        indicatorClassName={`bg-primary`}
                        tabClassName="px-2 py-1 text-xs font-medium "
                    />
                </div>
                <div className="flex items-center gap-1">
                    <span
                        className={cn(
                            'text-xs text-green-500 transition-opacity duration-200',
                            showCopied
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
                        {showCopied ? (
                            <Check className="size-4" />
                        ) : (
                            <Copy className="size-4" />
                        )}
                        <span className="sr-only">Copy</span>
                    </Button>
                </div>
            </div>
            <div className="max-w-full min-w-0 overflow-x-auto p-3">
                <pre className="m-0! w-full min-w-0 rounded-none! bg-transparent! font-mono! text-sm leading-relaxed">
                    <code
                        className="pr-6"
                        data-language="bash"
                        suppressHydrationWarning
                    >
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
