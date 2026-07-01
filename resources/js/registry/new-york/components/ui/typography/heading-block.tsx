'use client';

import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import BadgeIndicator from '@/registry/new-york/components/ui/typography/badge-indicator';
import { Heading } from '@/registry/new-york/components/ui/typography/heading';
import { Paragraph } from '@/registry/new-york/components/ui/typography/paragraph';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingBlockProps {
    className?: string;
    badge?: {
        text: string;
        icon?: LucideIcon;
        className?: string;
    };
    heading?: React.ReactNode;
    headingLevel?: HeadingLevel;
    headClassName?: string;
    description?: React.ReactNode;
    descriptionClassName?: string;
    children?: React.ReactNode;
    size?: 'default' | 'sm';
}

function HeadingBlock({
    badge,
    className,
    heading,
    headClassName,
    headingLevel = 1,
    description,
    descriptionClassName,
    children,
    size = 'default',
    ...props
}: HeadingBlockProps) {
    return (
        <div
            className={cn(
                size === 'default' && 'mb-12 max-w-2xl space-y-4',
                size === 'sm' && 'max-w-none space-y-3',
                className,
            )}
            {...props}
        >
            {badge && (
                <BadgeIndicator
                    icon={badge.icon}
                    className={cn('mb-1', badge.className)}
                >
                    {badge.text}
                </BadgeIndicator>
            )}
            {heading && (
                <Heading
                    level={headingLevel}
                    className={cn(
                        'font-extrabold tracking-tight text-foreground',
                        headClassName,
                    )}
                >
                    {heading}
                </Heading>
            )}
            {description && (
                <Paragraph
                    variant={size === 'default' ? 'lead' : 'muted'}
                    className={cn('font-sans', descriptionClassName)}
                >
                    {description}
                </Paragraph>
            )}
            {children}
        </div>
    );
}

export default HeadingBlock;
export { HeadingBlock };
