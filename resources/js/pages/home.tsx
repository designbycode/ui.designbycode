import { usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import MainWrapper from '@/pages/main/main-wrapper';

function Home() {
    const { url } = usePage().props;

    return (
        <MainWrapper as={`section`}>
            <h1 className="text-7xl">Home</h1>

            {JSON.stringify(url)}
        </MainWrapper>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
