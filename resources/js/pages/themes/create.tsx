import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MainLayout from '@/layouts/main-layout';
import MainWrapper from '@/layouts/main/main-wrapper';
import { store } from '@/routes/themes';

export default function ThemeCreate() {
    const { data, setData, post, processing, errors } = useForm({
        url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <MainWrapper className="py-8">
            <Head title="Create Theme" />

            <div className="mx-auto max-w-2xl">
                <Heading
                    title="Create New Theme"
                    description="Import a shadcn/ui theme registry JSON to create a new theme in the database."
                />

                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Import from URL</CardTitle>
                            <CardDescription>
                                Enter a valid shadcn registry JSON URL (e.g.
                                from tweakcn.com).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className={`inline-flex`} htmlFor="url">
                                    Registry URL
                                </Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://tweakcn.com/r/themes/neo-brutalism.json"
                                    value={data.url}
                                    onChange={(e) =>
                                        setData('url', e.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                                {errors.url && (
                                    <p className="text-sm font-medium text-destructive">
                                        {errors.url}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className={`pt-4`}>
                            <Button type="submit" disabled={processing}>
                                {processing && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Import Theme
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="mt-8 rounded-lg bg-muted p-4">
                    <h3 className="mb-2 text-sm font-semibold">
                        Example URLs:
                    </h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                        <li>https://tweakcn.com/r/themes/neo-brutalism.json</li>
                        <li>https://tweakcn.com/r/themes/modern-dark.json</li>
                    </ul>
                </div>
            </div>
        </MainWrapper>
    );
}

ThemeCreate.layout = MainLayout;
