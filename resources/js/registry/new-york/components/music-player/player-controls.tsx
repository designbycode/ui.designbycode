'use client';

import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Shuffle,
    Repeat,
    Repeat1,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlayerControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    onShuffle: () => void;
    onRepeat: () => void;
    isShuffled: boolean;
    repeatMode: 'off' | 'all' | 'one';
    disabled?: boolean;
}

export function PlayerControls({
    isPlaying,
    onPlayPause,
    onPrevious,
    onNext,
    onShuffle,
    onRepeat,
    isShuffled,
    repeatMode,
    disabled = false,
}: PlayerControlsProps) {
    return (
        <div className="flex items-center justify-center gap-2 md:gap-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={onShuffle}
                disabled={disabled}
                className={cn(
                    'h-9 w-9 md:h-10 md:w-10',
                    isShuffled
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Shuffle"
            >
                <Shuffle className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={disabled}
                className="h-10 w-10 text-foreground hover:text-primary md:h-12 md:w-12"
                aria-label="Previous track"
            >
                <SkipBack className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            <Button
                onClick={onPlayPause}
                disabled={disabled}
                className={cn(
                    'h-14 w-14 rounded-full md:h-16 md:w-16',
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                    'shadow-lg shadow-primary/25 transition-all',
                    'hover:scale-105 active:scale-95',
                )}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {isPlaying ? (
                    <Pause className="h-6 w-6 md:h-7 md:w-7" />
                ) : (
                    <Play className="ml-1 h-6 w-6 md:h-7 md:w-7" />
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={disabled}
                className="h-10 w-10 text-foreground hover:text-primary md:h-12 md:w-12"
                aria-label="Next track"
            >
                <SkipForward className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={onRepeat}
                disabled={disabled}
                className={cn(
                    'h-9 w-9 md:h-10 md:w-10',
                    repeatMode !== 'off'
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                )}
                aria-label="Repeat"
            >
                {repeatMode === 'one' ? (
                    <Repeat1 className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                    <Repeat className="h-4 w-4 md:h-5 md:w-5" />
                )}
            </Button>
        </div>
    );
}
