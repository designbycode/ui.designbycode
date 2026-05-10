import CardsPreview from '@/components/preview/cards-preview';
import Hero from '@/components/theme/hero';
import RegistryInstaller from '@/components/theme/registry-installer';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

function Home() {
    return (
        <>
            <MainWrapper as={`section`}>
                <Hero />
                <RegistryInstaller code={`themes/yeti`} />
                <CardsPreview />
            </MainWrapper>
        </>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
