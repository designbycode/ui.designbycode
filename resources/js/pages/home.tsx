import CardsPreview from '@/components/preview/cards-preview';
import EditorBlock from '@/components/theme/editor-block';
import Hero from '@/components/theme/hero';
import RegistryInstaller from '@/components/theme/registry-installer';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';

function Home() {
    return (
        <>
            <MainWrapper as={`section`}>
                <Hero />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <EditorBlock value="console.log('Hello World');  ///" />
                        <EditorBlock
                            options={{
                                minimap: {
                                    enabled: true,
                                },
                            }}
                            lineNumbers={true}
                            showFullScreenToggle={true}
                            readOnly={false}
                            className="pt4 mt-2"
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
                    <div>
                        <RegistryInstaller code={`themes/yeti`} />
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
