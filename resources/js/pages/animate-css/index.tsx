import { useGSAP } from '@gsap/react';
import { usePage } from '@inertiajs/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Share, ThumbsUp } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import Heading from '@/components/heading';
import { CodeBlock } from '@/components/theme/code-block';
import { PackageManagerCodeWithSelector } from '@/components/theme/package-manager-code-with-selector';
import RegistryInstaller from '@/components/theme/registry-installer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useCopyToClipboard } from '@/hooks/use-prism';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

gsap.registerPlugin(ScrollTrigger);

type AnimationItem = {
    name: string;
    title: string;
    text: string;
    category: string;
};

export default function AnimateCss({
    animations,
    categories,
}: {
    animations: AnimationItem[];
    categories: string[];
}) {
    const { url } = usePage().props;
    const [selectedAnimation, setSelectedAnimation] = useState(
        animations[0]?.name ?? 'animate-bounce',
    );

    const animationOptions = animations.map((anim) => ({
        value: anim.name,
        label: anim.text,
        code: 'animate-css/' + anim.name,
    }));

    return (
        <MainWrapper className={`pt-4`}>
            <Heading
                as="h1"
                title={`Animate.css Animations`}
                description={`Click any animation card to view and copy the code. 100+
                        CSS-based animations available.`}
            />
            <div className="mb-12">
                <Heading
                    as="h2"
                    title={`About`}
                    description={`is a library of CSS animations that you can use directly in
                    your components. Simply add the animation class name to any
                    element to animate it.`}
                />

                <ul className="mb-6 list-disc pl-6 text-muted-foreground">
                    <li>100+ built-in animation types</li>
                    <li>Simple CSS class-based animations</li>
                    <li>Works with any HTML element</li>
                    <li>Fully customizable duration and timing</li>
                    <li>Repeat and loop support</li>
                    <li>Works with Tailwind CSS</li>
                </ul>

                <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                    Installation
                </h2>
                <PackageManagerCodeWithSelector
                    className="my-4"
                    options={animationOptions}
                    baseUrl={url as string}
                    onValueChange={setSelectedAnimation}
                />

                <h2 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                    Usage
                </h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="mb-2 text-lg font-medium text-foreground">
                            Basic Usage
                        </h3>
                        <CodeBlock
                            // variant="minimal"
                            language="html"
                            code={`<div className="${selectedAnimation} repeat-infinite">
    Bouncing Content
</div>`}
                        />
                    </div>
                </div>

                <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                    Installation all animations
                </h2>

                <RegistryInstaller code={`animate-css/animate-all`} />

                <h2 className="mt-8 mb-4 text-2xl font-semibold text-foreground">
                    Code Examples
                </h2>
                <p className="text-balance text-muted-foreground">
                    Click on any animation card below to view and copy the code.
                </p>
            </div>

            {categories.map((category) => (
                <section key={category} className="mb-12">
                    <h2 className="mb-6 text-2xl font-semibold text-foreground">
                        {category}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {animations
                            .filter(
                                (a) =>
                                    a.category === category &&
                                    a.name !== 'animate-all',
                            )
                            .map((anim) => (
                                <AnimationCard key={anim.name} anim={anim} />
                            ))}
                    </div>
                </section>
            ))}
        </MainWrapper>
    );
}

AnimateCss.layout = MainLayout;

function AnimationCard({ anim }: { anim: AnimationItem }) {
    const codeExample = [
        `<div className={\`${anim.name}\`}>`,
        `    ${anim.text}`,
        `</div>`,
    ].join('\n');

    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const { copy } = useCopyToClipboard();
    useCallback(async () => {
        await copy(codeExample);
        toast.success(`"${anim.name}" code copied to clipboard!`);
    }, [copy, codeExample, anim.name]);

    useGSAP(() => {
        if (textRef.current && cardRef.current) {
            ScrollTrigger.create({
                trigger: cardRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                onEnter: () => textRef.current?.classList.add(anim.name),
                onLeave: () => textRef.current?.classList.remove(anim.name),
                onEnterBack: () => textRef.current?.classList.add(anim.name),
                onLeaveBack: () => textRef.current?.classList.remove(anim.name),
                markers: false,
            });
        }
    }, [anim.name]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card
                    ref={cardRef}
                    className="group cursor-pointer transition-colors hover:bg-muted/50"
                >
                    <CardHeader>
                        <CardTitle className="flex items-baseline justify-between overflow-clip capitalize">
                            <span>{anim.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="aspect-video overflow-hidden">
                        <div className="grid aspect-video max-w-full place-items-center overflow-clip rounded-md bg-radial from-muted to-muted/50 text-center font-bebas-neue! text-sm text-[clamp(1.5rem,10vw+2rem,3rem)] font-medium text-foreground/40 transition-all delay-300 group-hover:repeat-infinite!">
                            <div ref={textRef}>{anim.text}</div>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] w-full sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        {anim.name.replace('animate-', '')}
                    </DialogTitle>
                    <DialogDescription>
                        Animation type: {anim.category}
                    </DialogDescription>
                </DialogHeader>
                <div
                    className={`no-scrollbar relative -mx-4 max-h-[60vh] [scrollbar-width:none] space-y-4 overflow-y-auto px-4 pt-1 pb-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
                >
                    <div
                        className={`flex items-start rounded-md border border-border bg-card/30`}
                    >
                        <div className="relative flex-1 overflow-hidden rounded-md bg-radial from-muted to-muted/50 py-8">
                            <div
                                className={`grid aspect-video w-full place-items-center text-center font-bebas-neue text-[clamp(0.75rem,9vw+2rem,5rem)] font-medium delay-1000 ${anim.name} repeat-infinite`}
                            >
                                {anim.text}
                            </div>
                            <div
                                className={`absolute inset-y-0 right-0 border-l border-border/25 bg-background/10 backdrop-blur-sm`}
                            >
                                <div
                                    className={`sticky top-0 flex shrink-0 flex-col items-center justify-start space-y-4 p-4`}
                                >
                                    <Button variant="ghost" size="icon">
                                        <ThumbsUp className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Heart className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Share className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RegistryInstaller code={`animate-css/${anim.name}`} />

                    <CodeBlock
                        variant="default"
                        language="html"
                        code={codeExample}
                        showCopyButton={true}
                    />
                    <div
                        aria-hidden={true}
                        className="pointer-events-none sticky inset-x-0 -bottom-8 h-20 bg-linear-0 from-background to-transparent"
                    ></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
