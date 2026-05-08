import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useCSSVars } from '@/hooks/use-css-vars';
import type { Registry } from '@/types/registry';

interface ThemeCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
    theme: Registry;
}

function ThemeCard({ theme, ...props }: ThemeCardProps) {
    const { cssVars } = useCSSVars(theme);

    return (
        <Card
            {...props}
            className={`shadow-primary/15 transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
        >
            <CardHeader className={`flex flex-1`}>
                <CardTitle>{theme.title}</CardTitle>
                <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent className={`p-2`}>
                <div
                    style={cssVars}
                    className="grid grid-cols-4 gap-4 rounded-md bg-background p-4"
                >
                    <div className="aspect-square rounded-md border border-border bg-primary"></div>
                    <div className="aspect-square rounded-md border border-border bg-secondary"></div>
                    <div className="aspect-square rounded-md border border-border bg-accent"></div>
                    <div className="aspect-square rounded-md border border-border bg-muted"></div>

                    {['Primary', 'Secondary', 'Accent', 'Muted'].map((item) => (
                        <div key={item} className="text-center text-xs">
                            {item}
                        </div>
                    ))}

                    <div className="h-3 rounded-sm border border-border bg-background"></div>
                    <div className="h-3 rounded-sm border border-border bg-card"></div>
                    <div className="h-3 rounded-sm border border-border bg-border"></div>
                    <div className="h-3 rounded-sm border border-border bg-ring"></div>
                </div>
            </CardContent>
        </Card>
    );
}

ThemeCard.displayName = 'ThemeCard';
export default ThemeCard;
