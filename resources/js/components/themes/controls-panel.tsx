import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorControls } from './color-controls';
import { RadiusControls } from './raduis-controles';
import { TypographyControls } from './typography-controls';

export function ControlsPanel() {
    return (
        <Tabs defaultValue="colors" className="flex h-full flex-col">
            <TabsList className="m-3 grid grid-cols-3">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="radius">Radius</TabsTrigger>
                <TabsTrigger value="type">Type</TabsTrigger>
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
            </div>
        </Tabs>
    );
}
