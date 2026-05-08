import MainWrapper from '@/pages/main/main-wrapper';

function MainFooter() {
    return (
        <nav className={`my-8 border-t border-border py-10`}>
            <MainWrapper>
                <h1>Footer</h1>
            </MainWrapper>
        </nav>
    );
}

MainFooter.displayName = 'MainFooter';

export default MainFooter;
