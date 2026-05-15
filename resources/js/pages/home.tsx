import { Head } from '@inertiajs/react';
import Hero from '@/components/app/hero';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import { MusicPlayer } from '@/registry/new-york/components/music-player/music-player';

function Home() {
    return (
        <>
            <Head title={`Home`}>
                <meta name="description" content={'my components library'} />
            </Head>
            <MainWrapper as={`section`}>
                <Hero />
                <div className="my-6 grid grid-cols-1">
                    <MusicPlayer />
                </div>
            </MainWrapper>
        </>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
