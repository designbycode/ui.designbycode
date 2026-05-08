import { Crown } from 'lucide-react';
import { ButtonParticles } from '@/registry/new-york/components/ui/buttons/button-particles';
import { GlowRadial } from '@/registry/new-york/components/ui/glow/glow-radial';
import WavesThree from '@/registry/new-york/components/ui/threejs/waves-three';

const Hero = () => {
    const colors = `var(--primary)`;

    return (
        <section className="relative isolate my-4 grid min-h-90 place-items-center rounded-md border border-border md:min-h-120">
            <GlowRadial colors={colors} className={`absolute inset-0`} />
            <GlowRadial
                colors={colors}
                borderWidth={15}
                className={`absolute -inset-2 opacity-25 blur-xs`}
            />
            <div className={`flex flex-col space-y-3 p-6`}>
                <div className="relative mx-auto inline-flex translate-y-2 justify-center rounded-full border border-border px-6 py-1">
                    <p
                        className={`font-mono text-xs tracking-wide text-balance text-primary md:text-sm`}
                    >
                        copy it, paste it, ship it
                    </p>
                    <GlowRadial
                        size={150}
                        borderWidth={2}
                        colors={['var(--color-accent)', 'var(--color-primary)']}
                    />
                    <GlowRadial
                        size={150}
                        borderWidth={4}
                        className={`blur`}
                        colors={['var(--color-accent)', 'var(--color-primary)']}
                    />
                </div>
                <h1
                    className={`flex gap-2 text-center text-[clamp(1.2rem,6vw,5rem)] font-black`}
                >
                    <span>Component</span>
                    <span
                        className={`inline-block scale-150 text-center font-serif`}
                    >
                        &amp;
                    </span>
                    <span>Animations</span>
                </h1>
                <p
                    className={`mx-auto max-w-3xl text-center text-sm tracking-wide text-balance md:text-lg`}
                >
                    We are a team of passionate designers and developers
                    dedicated to creating beautiful and functional user
                    interfaces.
                </p>
                <div className="group flex justify-center space-x-4">
                    <ButtonParticles
                        colors={['var(--primary)', 'var(--color-muted)']}
                        className={`text-xs md:text-sm`}
                    >
                        <GlowRadial
                            size={150}
                            colors={[`var(--primary), transparent`]}
                            borderWidth={3}
                            className={`absolute -inset-1 blur-xs`}
                        />
                        <GlowRadial
                            size={150}
                            colors={[`var(--primary), transparent`]}
                            borderWidth={2}
                            className={`absolute -inset-0.5`}
                        />
                        <GlowRadial
                            size={150}
                            colors={[`var(--primary), transparent`]}
                            borderWidth={2}
                            className={`absolute -inset-1.5 mix-blend-color-dodge blur-xs`}
                        />
                        <Crown className="group-hover:text-brand size-4" />
                        <span>Premium Components</span>
                    </ButtonParticles>
                    <ButtonParticles
                        colors={['var(--secondary)', 'var(--color-muted)']}
                        className={`text-xs md:text-sm`}
                        variant="secondary"
                    >
                        <GlowRadial
                            colors={colors}
                            size={150}
                            borderWidth={3}
                            className={`absolute -inset-1 blur-xs`}
                        />
                        <GlowRadial
                            colors={colors}
                            size={150}
                            borderWidth={2}
                            className={`absolute -inset-0.5`}
                        />
                        <GlowRadial
                            colors={colors}
                            size={150}
                            borderWidth={2}
                            className={`absolute -inset-1.5 mix-blend-color-dodge blur-xs`}
                        />
                        View Components
                    </ButtonParticles>
                </div>
            </div>
            <WavesThree
                cameraPosition={{ x: 0, y: -20, z: 5 }}
                style="wireframe"
                colors={['#a1a1a1', '#646464']}
                className={`mask-linear inset-0 -z-20 rounded-[inherit] mask-linear-from-10% mask-linear-to-50% opacity-20`}
            />
        </section>
    );
};

Hero.displayName = 'Hero';

export default Hero;
