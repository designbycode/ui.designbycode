'use client';

import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface VolumeControlProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
    const [previousVolume, setPreviousVolume] = useState(volume);
    const [isHovered, setIsHovered] = useState(false);

    const toggleMute = () => {
        if (volume > 0) {
            setPreviousVolume(volume);
            onVolumeChange(0);
        } else {
            onVolumeChange(previousVolume || 0.7);
        }
    };

    const VolumeIcon =
        volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

    return (
        <div
            className="group flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
            >
                <VolumeIcon className="h-5 w-5" />
            </Button>

            <div
                className={`overflow-hidden transition-all duration-200 ${isHovered ? 'w-24 opacity-100' : 'w-0 opacity-0 md:w-24 md:opacity-100'} `}
            >
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                    style={{
                        background: `linear-gradient(to right, var(--primary) ${volume * 100}%, var(--muted) ${volume * 100}%)`,
                    }}
                    aria-label="Volume"
                />
            </div>
        </div>
    );
}
