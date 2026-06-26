'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InputPasswordProps extends React.ComponentProps<'input'> {
    /**
     * Custom class name for the toggle button
     */
    toggleClassName?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ className, toggleClassName, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const toggleVisibility = () => {
            setShowPassword((prev) => !prev);
        };

        return (
            <div className="relative w-full">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={cn('pr-10', className)}
                    ref={ref}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'absolute top-1/2 right-0 size-9 -translate-y-1/2 text-muted-foreground/70 hover:bg-transparent hover:text-foreground cursor-pointer select-none',
                        toggleClassName
                    )}
                    onClick={toggleVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? (
                        <EyeOff className="size-4" />
                    ) : (
                        <Eye className="size-4" />
                    )}
                </Button>
            </div>
        );
    }
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
export type { InputPasswordProps };
