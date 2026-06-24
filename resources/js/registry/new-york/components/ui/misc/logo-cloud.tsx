'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LogoItem {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    items: LogoItem[];
}

export function LogoCloud({
    className,
    title,
    items,
    ...props
}: LogoCloudProps) {
    return (
        <div
            className={cn(
                'relative z-10 flex w-full max-w-2xl flex-col items-center gap-4 border-t border-border/40 pt-8 select-none',
                className,
            )}
            {...props}
        >
            {title && (
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {title}
                </span>
            )}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={i}
                            className="group flex cursor-pointer items-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground"
                        >
                            <Icon className="size-5 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                            <span className="font-mono text-sm font-bold tracking-tight">
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LogoCloud;
