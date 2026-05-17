import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ColorPicker from './color-picker';

interface ThemeEditorVariablesProps {
    vars_light: Record<string, string>;
    vars_dark: Record<string, string>;
    onChange: (mode: 'light' | 'dark', key: string, value: string) => void;
}

const COLOR_KEYS = [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'destructive-foreground',
    'border',
    'input',
    'ring',
];

export default function ThemeEditorVariables({
    vars_light,
    vars_dark,
    onChange,
}: ThemeEditorVariablesProps) {
    return (
        <Card className={`relative`}>
            <CardHeader className="pb-3">
                <CardTitle>Theme Colors</CardTitle>
                <CardDescription>
                    Adjust the HSL values for light and dark modes.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="light">
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
                    <TabsContent value="light" className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-6">
                            {COLOR_KEYS.map((key) => (
                                <ColorPicker
                                    key={key}
                                    label={key}
                                    value={vars_light[key] || '0 0% 0%'}
                                    onChange={(val) =>
                                        onChange('light', key, val)
                                    }
                                />
                            ))}
                        </div>
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

                    <TabsContent value="dark" className="space-y-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-6">
                            {COLOR_KEYS.map((key) => (
                                <ColorPicker
                                    key={key}
                                    label={key}
                                    value={vars_dark[key] || '0 0% 0%'}
                                    onChange={(val) =>
                                        onChange('dark', key, val)
                                    }
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
