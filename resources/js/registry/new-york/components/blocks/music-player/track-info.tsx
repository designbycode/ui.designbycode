'use client';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { Track } from '@/registry/new-york/lib/audio-context';

interface TrackInfoProps {
    track: Track | null;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export function TrackInfo({
    track,
    isFavorite,
    onToggleFavorite,
}: TrackInfoProps) {
    if (!track) {
        return (
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 animate-pulse rounded-lg bg-muted" />
                <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className="group relative h-16 w-16 overflow-hidden rounded-lg shadow-lg @md:h-20 @md:w-20">
                {track.coverUrl ? (
                    <img
                        src={track.coverUrl}
                        alt={`${track.album} cover`}
                        className="object-cover transition-transform group-hover:scale-110"
                        crossOrigin="anonymous"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/50">
                        <span className="text-2xl font-bold text-primary-foreground">
                            {track.title[0]}
                        </span>
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-foreground @md:text-base">
                    {track.title}
                </h3>
                <p className="truncate text-xs text-muted-foreground @md:text-sm">
                    {track.artist}
                </p>
                <p className="truncate text-xs text-muted-foreground/70">
                    {track.album}
                </p>
            </div>

            <button
                onClick={onToggleFavorite}
                className="rounded-full p-2 transition-colors hover:bg-muted"
                aria-label={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
            >
                <Heart
                    className={cn(
                        'h-5 w-5 transition-all',
                        isFavorite
                            ? 'scale-110 fill-primary text-primary'
                            : 'text-muted-foreground hover:text-primary',
                    )}
                />
            </button>
        </div>
    );
}
