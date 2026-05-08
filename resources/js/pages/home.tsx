import RegistryInstaller from '@/components/theme/registry-installer';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

function Home() {
    return (
        <MainWrapper as={`section`}>
            <h1 className="text-7xl">Home</h1>
            <RegistryInstaller code={`boho`} />
        </MainWrapper>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
