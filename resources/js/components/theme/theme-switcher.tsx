import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ThemeSwitcher() {
    return (
        <div>
            <Button variant="ghost" size="icon">
                <Palette className="size-4" />
            </Button>
        </div>
    );
}

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;
