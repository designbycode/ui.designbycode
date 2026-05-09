import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CodeBlock } from '@/components/theme/code-block';
import RegistryInstaller from '@/components/theme/registry-installer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { useCopyToClipboard } from '@/hooks/use-prism';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import Heading from '@/components/heading';

gsap.registerPlugin(ScrollTrigger);

type AnimationItem = {
    name: string;
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
    const [selectedAnimation, setSelectedAnimation] = useState(
        animations[0]?.name ?? 'animate-bounce',
    );
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAnimations = animations.filter(
        (anim) =>
            anim.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            anim.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <MainWrapper className={`pt-4`}>
            <Heading
                title={`Animate.css Animations`}
                description={`Click any animation card to view and copy the code. 100+
                        CSS-based animations available.`}
            />
            <div className="mb-12">
                <h2 className="mt-8 mb-2 text-2xl font-semibold text-foreground">
                    About
                </h2>
                <p className="mb-4 max-w-4xl text-balance text-muted-foreground">
                    <span className="inline-block animate-bounce font-bold text-primary repeat-infinite">
                        Animate.css
                    </span>{' '}
                    is a library of CSS animations that you can use directly in
                    your components. Simply add the animation class name to any
                    element to animate it.
                </p>
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
                <div className="my-4">
                    <Combobox
                        value={selectedAnimation}
                        onValueChange={(value) =>
                            value && setSelectedAnimation(value)
                        }
                    >
                        <ComboboxInput
                            placeholder={
                                animations.find(
                                    (a) => a.name === selectedAnimation,
                                )?.text || 'Search animations...'
                            }
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            showTrigger={true}
                            showClear={true}
                        />
                        <ComboboxContent>
                            <ComboboxList>
                                {filteredAnimations.map((anim) => (
                                    <ComboboxItem
                                        key={anim.name}
                                        value={anim.name}
                                    >
                                        {anim.text}
                                    </ComboboxItem>
                                ))}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
                <RegistryInstaller
                    className="my-4"
                    code={'animate/' + selectedAnimation}
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

                <RegistryInstaller
                    className="my-4"
                    code="animate/animate-all"
                />

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
                            .filter((a) => a.category === category)
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
    const textRef = useRef<HTMLSpanElement>(null);
    const { copy } = useCopyToClipboard();

    const handleCopy = useCallback(async () => {
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
                            <span>{anim.name.replace('animate-', '')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid aspect-video place-items-center overflow-hidden">
                        <span
                            ref={textRef}
                            className="font-bebas-neue text-center text-sm text-[clamp(0.75rem,10vw+1rem,2rem)] font-medium text-foreground/40 transition-all delay-300 group-hover:repeat-infinite!"
                        >
                            {anim.text}
                        </span>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="capitalize">
                        {anim.name.replace('animate-', '')}
                    </DialogTitle>
                    <DialogDescription>
                        Animation type: {anim.category}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid aspect-video place-items-center overflow-hidden rounded-xl border border-border bg-muted/30 py-8">
                    <span
                        className={`font-bebas-neue text-center text-[clamp(0.75rem,9vw+1rem,3rem)] font-medium delay-1000 ${anim.name} repeat-infinite`}
                    >
                        {anim.text}
                    </span>
                </div>
                <RegistryInstaller code={'animate/' + anim.name} />
                <CodeBlock
                    // variant="minimal"
                    language="html"
                    code={codeExample}
                    showCopyButton={false}
                />
                <div className="flex justify-end">
                    <Button variant="secondary" onClick={handleCopy}>
                        Copy Code
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
