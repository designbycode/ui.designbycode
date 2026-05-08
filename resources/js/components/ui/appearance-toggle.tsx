import type { LucideIcon } from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
];

export default function AppearanceToggle({
    className = '',
    ...props
}: HTMLAttributes<HTMLButtonElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const current = tabs.find((t) => t.value === appearance) ?? tabs[0];
    const next = tabs[(tabs.indexOf(current) + 1) % tabs.length];

    return (
        <Button
            onClick={() => updateAppearance(next.value)}
            aria-label={`Switch to ${next.label} mode`}
            size={`icon`}
            {...props}
            className={cn('', className)}
        >
            <current.icon className="h-4 w-4" />
            <span aria-label={current.label} className="sr-only">
                {current.label}
            </span>
        </Button>
    );
}

AppearanceToggle.displayName = 'AppearanceToggle';
