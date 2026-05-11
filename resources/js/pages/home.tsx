import { Head } from '@inertiajs/react';
import CardsPreview from '@/components/preview/cards-preview';
import { CodeBlock } from '@/components/theme/code-block';
import EditorBlock from '@/components/theme/editor-block';
import Hero from '@/components/theme/hero';
import RegistryInstaller from '@/components/theme/registry-installer';
import MainWrapper from '@/layouts/main/main-wrapper';
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
                        <EditorBlock
                            lineNumbers={false}
                            value="console.log('Hello World');  ///"
                        />
                        <EditorBlock
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
                        <RegistryInstaller code={`themes/yeti`} />
                        <CodeBlock
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
