'use client';

import { Settings, Waves, BarChart3, Circle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { VisualizerStyle } from '@/registry/new-york/lib/audio-context';

interface VisualizerSettingsProps {
    currentStyle: VisualizerStyle;
    onStyleChange: (style: VisualizerStyle) => void;
}

const visualizerOptions: {
    style: VisualizerStyle;
    label: string;
    icon: React.ReactNode;
}[] = [
    { style: 'bars', label: 'Bars', icon: <BarChart3 className="h-4 w-4" /> },
    { style: 'wave', label: 'Wave', icon: <Waves className="h-4 w-4" /> },
    {
        style: 'circular',
        label: 'Circular',
        icon: <Circle className="h-4 w-4" />,
    },
    {
        style: 'particles',
        label: 'Particles',
        icon: <Sparkles className="h-4 w-4" />,
    },
];

export function VisualizerSettings({
    currentStyle,
    onStyleChange,
}: VisualizerSettingsProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    aria-label="Visualizer settings"
                >
                    <Settings className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                        Visualizer Style
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        {visualizerOptions.map((option) => (
                            <Button
                                key={option.style}
                                variant="outline"
                                size="sm"
                                onClick={() => onStyleChange(option.style)}
                                className={cn(
                                    'justify-start gap-2',
                                    currentStyle === option.style &&
                                        'border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
                                )}
                            >
                                {option.icon}
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
