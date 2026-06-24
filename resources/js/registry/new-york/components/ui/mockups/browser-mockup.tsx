'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BrowserMockupProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    viewportClassName?: string;
}

const BrowserMockup = React.forwardRef<HTMLDivElement, BrowserMockupProps>(
    (
        {
            className,
            children,
            title = 'preview.app',
            viewportClassName,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-zinc-950 shadow-2xl select-none',
                    className,
                )}
                {...props}
            >
                {/* Window Chrome Header */}
                <div className="flex h-9 shrink-0 items-center gap-2 border-b border-zinc-800 bg-zinc-900/60 px-4">
                    <div className="flex shrink-0 gap-1.5">
                        <span className="size-3 rounded-full bg-destructive/80" />
                        <span className="size-3 rounded-full bg-chart-4/80" />
                        <span className="size-3 rounded-full bg-chart-2/80" />
                    </div>
                    <div className="mx-auto max-w-xs truncate font-mono text-[10px] text-zinc-500 select-none">
                        {title}
                    </div>
                </div>

                {/* Main Viewport */}
                <div
                    className={cn(
                        'relative flex-1 overflow-hidden bg-zinc-900/80',
                        viewportClassName,
                    )}
                >
                    {children}
                </div>
            </div>
        );
    },
);

BrowserMockup.displayName = 'BrowserMockup';

export { BrowserMockup };
export default BrowserMockup;
