'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PhoneMockupProps extends React.HTMLAttributes<HTMLDivElement> {
    screenClassName?: string;
}

const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
    ({ className, children, screenClassName, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'relative mx-auto h-[480px] w-64 shrink-0 rounded-[36px] border-[6px] border-zinc-800 bg-zinc-950 p-3 shadow-2xl ring-1 ring-zinc-700/50 select-none',
                    className,
                )}
                {...props}
            >
                {/* Ear Speaker Notch */}
                <div className="absolute top-2 left-1/2 flex h-4 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-zinc-800">
                    <span className="h-1 w-8 rounded-full bg-zinc-900" />
                </div>

                {/* Screen Content Container */}
                <div
                    className={cn(
                        'flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-zinc-800/40 bg-zinc-900 p-4',
                        screenClassName,
                    )}
                >
                    {children}
                </div>
            </div>
        );
    },
);

PhoneMockup.displayName = 'PhoneMockup';

export { PhoneMockup };
export default PhoneMockup;
