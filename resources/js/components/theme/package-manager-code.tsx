'use client';

import { Copy, Terminal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard, usePrismHighlight } from '@/hooks/use-prism';
import { cn } from '@/lib/utils';
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

    const handleCopy = async () => {
        await copy(code);
        toast.success(`${selectedManager} command copied to clipboard!`);
    };

    return (
        <div
            className={cn(
                'group/package-manager relative min-w-0 rounded-lg border',
                className,
            )}
        >
            <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
                <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-muted-foreground" />

                    <AnimatedTabs
                        value={selectedManager}
                        onChange={(id) =>
                            setSelectedManager(id as PackageManager)
                        }
                        tabs={available.map((m) => ({
                            id: m,
                            label: m,
                        }))}
                        tabsClassName="p-1"
                        tabClassName="px-2 py-1 text-xs font-medium "
                    />
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="transition-opacity hover:opacity-100"
                >
                    <Copy className="size-3" />
                    <span className="sr-only">Copy</span>
                </Button>
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
