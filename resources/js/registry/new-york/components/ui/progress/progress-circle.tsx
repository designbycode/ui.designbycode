import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ProgressCircleProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    showValue?: boolean;
    label?: string;
}

export function ProgressCircle({
    value = 0,
    size = 80,
    strokeWidth = 8,
    className,
    showValue = true,
    label,
}: ProgressCircleProps) {
    const [currentValue, setCurrentValue] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentValue(Math.min(Math.max(value, 0), 100));
        }, 100);
        return () => clearTimeout(timer);
    }, [value]);

    const strokeDashoffset =
        circumference - (currentValue / 100) * circumference;

    return (
        <div
            className={cn(
                'relative inline-flex flex-col items-center justify-center select-none',
                className,
            )}
            style={{ width: size, height: size }}
        >
            <svg className="-rotate-90 transform" width={size} height={size}>
                {/* Background Circle */}
                <circle
                    className="text-muted/30"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                {/* Foreground Circle */}
                <circle
                    className="text-primary transition-all duration-1000 ease-out"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>

            {showValue && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-sm leading-none font-extrabold tracking-tight text-foreground">
                        {Math.round(currentValue)}%
                    </span>
                    {label && (
                        <span className="mt-0.5 text-[8px] font-bold tracking-wider text-muted-foreground uppercase">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProgressCircle;
