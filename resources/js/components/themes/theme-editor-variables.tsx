import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ColorPicker from './color-picker';

interface ThemeEditorVariablesProps {
    vars_light: Record<string, string>;
    vars_dark: Record<string, string>;
    onChange: (mode: 'light' | 'dark', key: string, value: string) => void;
    onTabChange?: (mode: 'light' | 'dark') => void;
}

const COLOR_GROUPS = {
    PRIMARY: ['primary', 'primary-foreground'],
    SECONDARY: ['secondary', 'secondary-foreground'],
    ACCENT: ['accent', 'accent-foreground'],
    BASE: ['background', 'foreground'],
    CARD: ['card', 'card-foreground', 'popover', 'popover-foreground'],
    MUTED: ['muted', 'muted-foreground'],
    DESTRUCTIVE: ['destructive', 'destructive-foreground'],
    BORDER: ['border', 'input', 'ring'],
    CHART: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
    SIDEBAR: [
        'sidebar',
        'sidebar-foreground',
        'sidebar-primary',
        'sidebar-primary-foreground',
        'sidebar-accent',
        'sidebar-accent-foreground',
        'sidebar-border',
        'sidebar-ring',
    ],
};

export default function ThemeEditorVariables({
    vars_light,
    vars_dark,
    onChange,
    onTabChange,
}: ThemeEditorVariablesProps) {
    const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');

    const handleTabChange = (value: string) => {
        const mode = value as 'light' | 'dark';
        setActiveTab(mode);
        onTabChange?.(mode);
    };

    return (
        <Card className={`relative`}>
            <CardHeader className="pb-3">
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                    Adjust the color values for light and dark modes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <div
                        className={`sticky top-0 -mx-4 bg-linear-to-b from-card to-transparent p-4`}
                    >
                        <div className="mb-4 flex items-center justify-center rounded-lg bg-muted p-1">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="light">
                                    Light Mode
                                </TabsTrigger>
                                <TabsTrigger value="dark">
                                    Dark Mode
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div>
                    <TabsContent value="light" className="space-y-4">
                        {Object.entries(COLOR_GROUPS).map(
                            ([groupName, keys]) => (
                                <Collapsible key={groupName} defaultOpen>
                                    <CollapsibleTrigger className="flex w-full items-center justify-between space-x-2 rounded-md px-2 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground">
                                        <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                            {groupName}
                                        </span>
                                        <PlaceholderPattern className="flex h-2 flex-1 stroke-border/75" />
                                        <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2 space-y-4 pl-2">
                                        <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                                            {keys.map((key) => (
                                                <ColorPicker
                                                    key={key}
                                                    label={key}
                                                    value={
                                                        vars_light[key] ||
                                                        'oklch(0 0 0)'
                                                    }
                                                    onChange={(val) =>
                                                        onChange(
                                                            'light',
                                                            key,
                                                            val,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ),
                        )}
                        <div className="border-t pt-4">
                            <div className="w-full sm:w-1/3">
                                <Label
                                    htmlFor="radius-light"
                                    className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase"
                                >
                                    Radius
                                </Label>
                                <Input
                                    id="radius-light"
                                    value={vars_light['radius'] || '0.5rem'}
                                    onChange={(e) =>
                                        onChange(
                                            'light',
                                            'radius',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. 0.5rem"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="dark" className="space-y-4">
                        {Object.entries(COLOR_GROUPS).map(
                            ([groupName, keys]) => (
                                <Collapsible key={groupName} defaultOpen>
                                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground">
                                        <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                            {groupName}
                                        </span>
                                        <ChevronDown className="size-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2 space-y-4 pl-2">
                                        <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                                            {keys.map((key) => (
                                                <ColorPicker
                                                    key={key}
                                                    label={key}
                                                    value={
                                                        vars_dark[key] ||
                                                        'oklch(0 0 0)'
                                                    }
                                                    onChange={(val) =>
                                                        onChange(
                                                            'dark',
                                                            key,
                                                            val,
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ),
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
