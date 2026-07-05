'use client';

import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
    icon?: LucideIcon;
    children?: React.ReactNode;
}

const BadgeIndicator = React.forwardRef<HTMLSpanElement, BadgeIndicatorProps>(
    ({ icon: Icon, className, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-primary uppercase select-none',
                    className,
                )}
                {...props}
            >
                {Icon && <Icon className="size-3 shrink-0 text-primary/80" />}
                {children}
            </span>
        );
    },
);

BadgeIndicator.displayName = 'BadgeIndicator';

export default BadgeIndicator;
export { BadgeIndicator };
