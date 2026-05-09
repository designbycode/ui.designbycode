import Heading from '@/components/heading';
import RegistryInstaller from '@/components/theme/registry-installer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

type FontItem = {
    name: string;
    title: string;
    fontFamily: string | null;
    fontProvider: string | null;
    fontImport: string | null;
    fontVariable: string | null;
    fontWeight: string[] | null;
    fontSubsets: string[] | null;
    fontDependency: string | null;
};

export default function FontsIndex({ fonts }: { fonts: FontItem[] }) {
    return (
        <MainWrapper className="pt-4">
            <Heading
                title="Fonts"
                description="Browse and install Google Fonts for your project. Each font includes the CSS variable and import snippet."
            />

            <div className="mb-8">
                <Heading
                    as="h2"
                    title="Installation all fonts"
                    description="Install every font at once with a single command."
                />
                <RegistryInstaller code="fonts/fonts-all" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {fonts.map((font) => (
                    <FontCard key={font.name} font={font} />
                ))}
            </div>
        </MainWrapper>
    );
}

FontsIndex.layout = MainLayout;

function FontCard({ font }: { font: FontItem }) {
    const sampleText = 'Aa Bb Cc';

    return (
        <Card className="group overflow-hidden transition-colors hover:bg-muted/50">
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">{font.title}</span>
                    {font.fontProvider && (
                        <Badge variant="outline" className="text-xs">
                            {font.fontProvider}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
                <div
                    className="flex min-h-[88px] items-center justify-center rounded-lg bg-card/50 px-4 text-2xl tracking-wider"
                    style={{ fontFamily: font.fontFamily ?? 'inherit' }}
                >
                    <span className="text-muted-foreground/60">{sampleText}</span>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                    {font.fontFamily && (
                        <div className="flex justify-between gap-2">
                            <span className="shrink-0">Family:</span>
                            <span className="truncate text-right font-medium text-foreground">
                                {font.fontFamily}
                            </span>
                        </div>
                    )}
                    {font.fontVariable && (
                        <div className="flex justify-between gap-2">
                            <span className="shrink-0">Variable:</span>
                            <code className="truncate text-right text-xs text-foreground">
                                {font.fontVariable}
                            </code>
                        </div>
                    )}
                    {font.fontWeight && font.fontWeight.length > 0 && (
                        <div className="flex justify-between gap-2">
                            <span className="shrink-0">Weights:</span>
                            <span className="truncate text-right text-foreground">
                                {font.fontWeight.join(', ')}
                            </span>
                        </div>
                    )}
                </div>

                <RegistryInstaller code={`fonts/${font.name}`} />
            </CardContent>
        </Card>
    );
}
