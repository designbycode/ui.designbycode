import Heading from '@/components/heading';
import { CodeBlock } from '@/components/theme/code-block';
import RegistryInstaller from '@/components/theme/registry-installer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    const npmCommand = font.fontDependency
        ? `npm install ${font.fontDependency}`
        : null;

    const sampleText = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';

    return (
        <Card className="group flex flex-col overflow-hidden transition-colors hover:bg-muted/50">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{font.title}</span>
                    {font.fontProvider && (
                        <Badge variant="outline" className="text-xs">
                            {font.fontProvider}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
                <div
                    className="flex min-h-[80px] items-center justify-center rounded-md border border-border bg-card/50 px-4 text-center text-xl"
                    style={{ fontFamily: font.fontFamily ?? 'inherit' }}
                >
                    <span className="leading-relaxed tracking-wide">
                        {sampleText}
                    </span>
                </div>

                <div className="space-y-1.5 text-sm text-muted-foreground">
                    {font.fontFamily && (
                        <div className="flex justify-between">
                            <span>Family:</span>
                            <span className="text-right font-medium text-foreground">
                                {font.fontFamily}
                            </span>
                        </div>
                    )}
                    {font.fontVariable && (
                        <div className="flex justify-between">
                            <span>Variable:</span>
                            <code className="text-right text-xs text-foreground">
                                {font.fontVariable}
                            </code>
                        </div>
                    )}
                    {font.fontWeight && font.fontWeight.length > 0 && (
                        <div className="flex justify-between">
                            <span>Weights:</span>
                            <span className="text-right text-foreground">
                                {font.fontWeight.join(', ')}
                            </span>
                        </div>
                    )}
                    {font.fontSubsets && font.fontSubsets.length > 0 && (
                        <div className="flex justify-between">
                            <span>Subsets:</span>
                            <span className="text-right text-foreground">
                                {font.fontSubsets.join(', ')}
                            </span>
                        </div>
                    )}
                </div>

                {npmCommand && (
                    <div className="mt-auto pt-2">
                        <CodeBlock
                            language="bash"
                            code={npmCommand}
                            variant="minimal"
                            showCopyButton={true}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
