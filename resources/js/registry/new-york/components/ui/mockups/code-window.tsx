'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CodeWindowProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    lang?: string;
    code: string;
    active?: boolean;
}

const CodeWindow = React.forwardRef<HTMLDivElement, CodeWindowProps>(
    ({ className, title, lang, code, active = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex w-full flex-col overflow-hidden rounded-xl border border-border/40 bg-zinc-950 text-left font-mono text-xs shadow-2xl select-none',
                    className,
                )}
                {...props}
            >
                {/* Header bar */}
                <div className="flex h-9 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-4 text-zinc-500">
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                'size-2 rounded-full transition-colors',
                                active
                                    ? 'animate-pulse bg-chart-2'
                                    : 'bg-muted',
                            )}
                        />
                        <span>{title}</span>
                    </div>
                    {lang && (
                        <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                            {lang}
                        </span>
                    )}
                </div>

                {/* Code Container */}
                <div className="flex-1 overflow-y-auto bg-zinc-950/85 p-4 font-mono text-[11px] leading-relaxed whitespace-pre text-zinc-300">
                    {code}
                </div>
            </div>
        );
    },
);

CodeWindow.displayName = 'CodeWindow';

export { CodeWindow };
export default CodeWindow;
