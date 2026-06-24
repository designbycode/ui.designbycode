'use client';

import { useRef, useState, useCallback } from 'react';
import { formatTime } from '@/registry/new-york/lib/audio-context';

interface ProgressBarProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

export function ProgressBar({
    currentTime,
    duration,
    onSeek,
}: ProgressBarProps) {
    const progressRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);

    const calculatePosition = useCallback((clientX: number): number => {
        if (!progressRef.current) {
            return 0;
        }

        const rect = progressRef.current.getBoundingClientRect();
        const position = (clientX - rect.left) / rect.width;

        return Math.max(0, Math.min(1, position));
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const position = calculatePosition(e.clientX);
        onSeek(position * duration);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const position = calculatePosition(e.clientX);
        setHoverPosition(position);

        if (isDragging) {
            onSeek(position * duration);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setHoverPosition(null);
        setIsDragging(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const position = calculatePosition(touch.clientX);
        onSeek(position * duration);
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) {
            return;
        }

        const touch = e.touches[0];
        const position = calculatePosition(touch.clientX);
        onSeek(position * duration);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full space-y-1">
            <div
                ref={progressRef}
                className="group relative h-2 cursor-pointer rounded-full bg-muted"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="slider"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={currentTime}
                aria-label="Seek"
                tabIndex={0}
            >
                {/* Progress fill */}
                <div
                    className="absolute top-0 left-0 h-full rounded-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                />

                {/* Hover preview */}
                {hoverPosition !== null && (
                    <div
                        className="absolute top-0 h-full rounded-full bg-foreground/20"
                        style={{ width: `${hoverPosition * 100}%` }}
                    />
                )}

                {/* Thumb */}
                <div
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    style={{ left: `calc(${progress}% - 8px)` }}
                />

                {/* Hover time tooltip */}
                {hoverPosition !== null && (
                    <div
                        className="absolute -top-8 rounded bg-card px-2 py-1 text-xs text-foreground shadow-lg"
                        style={{ left: `calc(${hoverPosition * 100}% - 20px)` }}
                    >
                        {formatTime(hoverPosition * duration)}
                    </div>
                )}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}
