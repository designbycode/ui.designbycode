'use client';

import * as React from 'react';
import { Code, Server, Database, ArrowRight } from 'lucide-react';
import HeadingBlock from '@/registry/new-york/components/ui/typography/heading-block';
import { ButtonSpecial } from '@/registry/new-york/components/ui/buttons/button-special';
import { AnimatedTabs } from '@/registry/new-york/components/ui/tabs/animated-tabs';
import { CodeWindow } from '@/registry/new-york/components/ui/mockups/code-window';

export function HeroTabsShowcase() {
    const [activeTab, setActiveTab] = React.useState('frontend');

    const tabList = [
        { id: 'frontend', label: 'React Frontend' },
        { id: 'backend', label: 'Laravel Backend' },
        { id: 'database', label: 'Database Schema' },
    ];

    const snippets: Record<
        string,
        { title: string; lang: string; code: string }
    > = {
        frontend: {
            title: 'dashboard.tsx',
            lang: 'tsx',
            code: `import { ButtonSpecial } from '@/components/ui/button';\nimport { HeadingBlock } from '@/components/ui/typography';\n\nexport default function App() {\n    return (\n        <HeadingBlock\n            heading="Compile premium interfaces"\n            description="Built on React 19 & Tailwind v4"\n        >\n            <ButtonSpecial variant="neon">Get Started</ButtonSpecial>\n        </HeadingBlock>\n    );\n}`,
        },
        backend: {
            title: 'RouteServiceProvider.php',
            lang: 'php',
            code: `use App\\Http\\Controllers\\Auth\\SocialiteController;\nuse Illuminate\\Support\\Facades\\Route;\n\nRoute::get('/auth/redirect/{provider}', [SocialiteController::class, 'redirect'])\n    ->name('socialite.redirect');\n\nRoute::get('/auth/callback/{provider}', [SocialiteController::class, 'callback'])\n    ->name('socialite.callback');`,
        },
        database: {
            title: 'create_registries_table.php',
            lang: 'php',
            code: `Schema::create('registries', function (Blueprint $table) {\n    $table->id();\n    $table->string('name')->unique();\n    $table->string('type');\n    $table->string('title');\n    $table->text('description')->nullable();\n    $table->json('files');\n    $table->timestamps();\n});`,
        },
    };

    return (
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-background px-6 py-16 text-center select-none">
            <div className="relative z-10 mb-8 flex max-w-2xl flex-col items-center">
                <HeadingBlock
                    badge={{
                        text: 'Full Stack Ready',
                        icon: Code,
                    }}
                    heading="Unified design from client to server"
                    headingLevel={1}
                    headClassName="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                    description="Write clean UI code, manage routing middleware, and declare migrations inside a single repository with our fully integrated templates."
                    descriptionClassName="text-muted-foreground"
                    className="flex flex-col items-center"
                />

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                    <ButtonSpecial
                        specialVariant="neon"
                        className="flex items-center gap-1.5"
                    >
                        Start Building
                        <ArrowRight className="size-4" />
                    </ButtonSpecial>
                </div>
            </div>

            {/* Showcase Tabs and Code Window */}
            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6">
                <AnimatedTabs
                    tabs={tabList}
                    value={activeTab}
                    onChange={setActiveTab}
                />

                {/* Simulated Editor Window */}
                <CodeWindow
                    title={snippets[activeTab].title}
                    lang={snippets[activeTab].lang}
                    code={snippets[activeTab].code}
                    className="h-64 shrink-0"
                />
            </div>
        </section>
    );
}

export default HeroTabsShowcase;
