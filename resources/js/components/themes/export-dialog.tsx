import { Download, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainCodeBlock } from '@/layouts/main/theme/main-code-block';
import {
    generateIndexCss,
    generateTailwindSnippet,
} from '@/lib/theme/css-export';
import { useThemeStore } from '@/lib/theme/store';

export function ExportDialog() {
    const state = useThemeStore();

    const css = generateIndexCss(state);
    const tw = generateTailwindSnippet(state);

    const download = (text: string, filename: string) => {
        const blob = new Blob([text], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FileCode /> Export
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-6xl grid-rows-[auto_1fr] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Export theme</DialogTitle>
                </DialogHeader>
                <Tabs
                    defaultValue="css"
                    className="flex min-h-0 flex-col overflow-hidden"
                >
                    <TabsList>
                        <TabsTrigger value="css">index.css</TabsTrigger>
                        <TabsTrigger value="tw">tailwind.config</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value="css"
                        className="mt-3 flex min-h-0 flex-1 flex-col gap-3"
                    >
                        <MainCodeBlock
                            code={css}
                            language="css"
                            variant="minimal"
                            className="min-h-0 flex-1 overflow-y-auto"
                        />
                        <div className="flex shrink-0 gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => download(css, 'theme.css')}
                            >
                                <Download /> Download .css
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent
                        value="tw"
                        className="mt-3 flex min-h-0 flex-1 flex-col"
                    >
                        <MainCodeBlock
                            code={tw}
                            language="javascript"
                            variant="minimal"
                            className="min-h-0 flex-1 overflow-y-auto"
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
