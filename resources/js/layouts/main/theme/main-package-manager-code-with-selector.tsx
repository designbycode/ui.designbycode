'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
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

export interface SelectorOption {
    value: string;
    label: string;
    code: string;
}

interface PackageManagerCodeWithSelectorProps {
    options: SelectorOption[];
    baseUrl?: string;
    className?: string;
    onValueChange?: (value: string) => void;
}

const managers: PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];

export function MainPackageManagerCodeWithSelector({
    options,
    baseUrl = '',
    className,
    onValueChange,
}: PackageManagerCodeWithSelectorProps) {
    const { selectedManager, setSelectedManager } = usePackageManagerStore();
    const [selectedOption, setSelectedOption] = useState(
        options[0]?.value || '',
    );
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOptions = options.filter(
        (option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            option.value.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const currentOption = options.find((opt) => opt.value === selectedOption);

    const codes: PackageManagerCode = {
        bun: `bunx --bun shadcn@latest add ${baseUrl}/r/${currentOption?.code}.json`,
        npm: `npx shadcn@latest add ${baseUrl}/r/${currentOption?.code}.json`,
        pnpm: `pnpm dlx shadcn@latest add ${baseUrl}/r/${currentOption?.code}.json`,
        yarn: `yarn dlx shadcn@latest add ${baseUrl}/r/${currentOption?.code}.json`,
    };

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
                'group/package-manager relative min-w-0 rounded-lg border',
                className,
            )}
        >
            <div className="flex items-center justify-between border-b bg-muted/50 px-3 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                        <AnimatedTabs
                            value={selectedManager}
                            onChange={(id) =>
                                setSelectedManager(id as PackageManager)
                            }
                            tabs={available.map((m) => ({
                                id: m,
                                label: m,
                            }))}
                            tabsClassName="p-1 bg-primary/10 shrink-0"
                            activeTabClassName="text-primary-foreground"
                            indicatorClassName={`bg-primary`}
                            tabClassName="px-2 py-1 text-xs font-medium "
                        />
                    </div>
                </div>
                <Combobox
                    value={selectedOption}
                    onValueChange={(value) => {
                        if (value) {
                            setSelectedOption(value);
                            onValueChange?.(value);
                        }
                    }}
                >
                    <ComboboxInput
                        placeholder={
                            options.find((opt) => opt.value === selectedOption)
                                ?.label || 'Select option...'
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        showTrigger={true}
                        showClear={false}
                        className="h-8 max-w-62 min-w-0"
                    />
                    <ComboboxContent className={`p-2`}>
                        <ComboboxList>
                            {filteredOptions.map((option) => (
                                <ComboboxItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </ComboboxItem>
                            ))}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                <div className="flex w-22 items-center justify-end gap-1">
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
