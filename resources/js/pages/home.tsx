import { Head } from '@inertiajs/react';
import Hero from '@/components/app/hero';
import CardsPreview from '@/components/preview/cards-preview';
import MainWrapper from '@/layouts/main/main-wrapper';
import { MainCodeBlock } from '@/layouts/main/theme/main-code-block';
import MainEditorBlock from '@/layouts/main/theme/main-editor-block';
import MainRegistryInstaller from '@/layouts/main/theme/main-registry-installer';
import MainLayout from '@/layouts/main-layout';

function Home() {
    return (
        <>
            <Head title={`Home`}>
                <meta name="description" content={'my components library'} />
            </Head>
            <MainWrapper as={`section`}>
                <Hero />
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <MainEditorBlock
                            lineNumbers={false}
                            value="console.log('Hello World');  ///"
                        />
                        <MainEditorBlock
                            options={{
                                minimap: {
                                    enabled: true,
                                },
                            }}
                            showFullScreenToggle={true}
                            readOnly={false}
                            className="pt4"
                            height="400px"
                            value={`// 1. Declare the function
function greet(name) {
  return "Hello, " + name + "!";
}

// 2. Call (invoke) the function
let message = greet("Alice");
console.log(message); // Output: Hello, Alice!`}
                        />
                    </div>
                    <div className="space-y-4">
                        <MainRegistryInstaller code={`themes/yeti`} />
                        <MainCodeBlock
                            language="html"
                            code={`<div className="animate-bounce">Bouncing Content</div>`}
                        />
                    </div>
                </div>
                <CardsPreview />
            </MainWrapper>
        </>
    );
}

Home.layout = MainLayout;

Home.displayName = 'home';

export default Home;
