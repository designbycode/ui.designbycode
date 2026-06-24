'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    variant?: 'default' | 'lead' | 'muted' | 'large' | 'small';
}

const paragraphStyles = {
    default: 'leading-7 [&:not(:first-child)]:mt-6 text-foreground/80',
    lead: 'text-xl text-muted-foreground font-light leading-relaxed',
    muted: 'text-sm text-muted-foreground leading-normal',
    large: 'text-lg font-semibold text-foreground',
    small: 'text-sm font-medium leading-none text-foreground/75',
};

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ variant = 'default', className, children, ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={cn(paragraphStyles[variant], className)}
                {...props}
            >
                {children}
            </p>
        );
    },
);

Paragraph.displayName = 'Paragraph';

export { Paragraph };
