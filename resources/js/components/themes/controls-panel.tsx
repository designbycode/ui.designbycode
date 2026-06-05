import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeStore } from '@/lib/theme/store';
import { usePage } from '@inertiajs/react';
import { ColorControls } from './color-controls';
import { RadiusControls } from './raduis-controles';
import ThemeInfo from './theme-info';
import { TypographyControls } from './typography-controls';

export function ControlsPanel() {
    const { title, name, description, tags, setInfo } = useThemeStore();
    const { availableTags = [] } = usePage<{ availableTags: string[] }>().props;

    return (
        <Tabs defaultValue="colors" className="flex h-full flex-col">
            <TabsList className="m-3 grid grid-cols-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="radius">Radius</TabsTrigger>
                <TabsTrigger value="type">Type</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-y-auto px-4 pb-6">
                <TabsContent value="colors" className="mt-0">
                    <ColorControls />
                </TabsContent>
                <TabsContent value="radius" className="mt-0">
                    <RadiusControls />
                </TabsContent>
                <TabsContent value="type" className="mt-0">
                    <TypographyControls />
                </TabsContent>
                <TabsContent value="info" className="mt-0">
                    <ThemeInfo
                        theme={{ title, name, description, tags }}
                        availableTags={availableTags}
                        onChange={setInfo}
                    />
                </TabsContent>
            </div>
        </Tabs>
    );
}
