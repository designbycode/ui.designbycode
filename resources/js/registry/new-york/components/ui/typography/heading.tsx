'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
    1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground',
    2: 'scroll-m-20 border-b border-border/30 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground',
    3: 'scroll-m-20 text-2xl font-semibold tracking-tight text-foreground',
    4: 'scroll-m-20 text-xl font-semibold tracking-tight text-foreground',
    5: 'scroll-m-20 text-lg font-semibold tracking-tight text-foreground',
    6: 'scroll-m-20 text-base font-semibold tracking-tight text-foreground',
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ level = 1, className, children, ...props }, ref) => {
        const Tag = `h${level}` as const;

        return (
            <Tag
                ref={ref}
                className={cn(headingStyles[level], className)}
                {...props}
            >
                {children}
            </Tag>
        );
    },
);

Heading.displayName = 'Heading';

export { Heading };
