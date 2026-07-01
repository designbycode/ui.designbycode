import { Head } from '@inertiajs/react';
import Hero from '@/components/app/hero';
import NewsletterSection from '@/components/app/newsletter-section';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import { MusicPlayer } from '@/registry/new-york/components/blocks/music-player/music-player';
import BlackHole from '@/registry/new-york/components/ui/threejs/black-hole';
function Home() {
    return (
        <div className={`relative`}>
            <Head title={`Home`}>
                <meta name="description" content={'my components library'} />
            </Head>
            <MainWrapper as={`section`}>
                <Hero />
                <BlackHole lineWidth={1} ringDensity={50} />
                <NewsletterSection />

                <div className="my-6 grid grid-cols-4">
                    <MusicPlayer />
                </div>
            </MainWrapper>
        </div>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
