import { Head } from '@inertiajs/react';
import Hero from '@/components/app/hero';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import { MusicPlayer } from '@/registry/new-york/components/music-player/music-player';
import GithubIcon from '@/components/icons/github-icon';
function Home() {
    return (
        <div className={`relative`}>
            <Head title={`Home`}>
                <meta name="description" content={'my components library'} />
            </Head>
            <MainWrapper as={`section`}>
                <Hero />
                <GithubIcon className="size-20" />
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
