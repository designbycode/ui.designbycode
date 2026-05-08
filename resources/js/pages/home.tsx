import Hero from '@/components/theme/hero';
import RegistryInstaller from '@/components/theme/registry-installer';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

function Home() {
    return (
        <>
            <MainWrapper as={`section`}>
                <Hero />
                <h1 className="text-7xl">Home</h1>
                <button
                    className={`rounded-[30%/200%] bg-black bg-linear-to-b from-primary to-primary/50 px-4 py-2 text-primary-foreground text-shadow-black/50 text-shadow-xs`}
                >
                    my buttons
                </button>
                <RegistryInstaller code={`yeti`} />
            </MainWrapper>
        </>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
