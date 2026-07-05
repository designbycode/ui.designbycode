'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ButtonRippleProps extends React.ComponentPropsWithRef<
    typeof Button
> {}

const RIPPLE_STYLE_ID = 'button-ripple-styles';
function injectRippleStyles() {
    if (
        typeof document === 'undefined' ||
        document.getElementById(RIPPLE_STYLE_ID)
    ) {
        return;
    }

    const style = document.createElement('style');
    style.id = RIPPLE_STYLE_ID;
    style.textContent = `
        @keyframes bp-ripple-effect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
            100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }
        .bp-ripple {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            background-color: currentColor;
            opacity: 0.25;
            width: 8px;
            height: 8px;
            animation: bp-ripple-effect 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
    `;
    document.head.appendChild(style);
}

export const ButtonRipple = React.forwardRef<
    HTMLButtonElement,
    ButtonRippleProps
>(({ className, children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<
        Array<{ id: number; x: number; y: number }>
    >([]);
    const nextId = React.useRef(0);

    React.useEffect(() => {
        injectRippleStyles();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const id = nextId.current++;
        setRipples((prev) => [...prev, { id, x, y }]);

        onClick?.(e);
    };

    React.useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples([]);
            }, 600);

            return () => clearTimeout(timer);
        }
    }, [ripples]);

    return (
        <Button
            ref={ref}
            onClick={handleClick}
            className={cn(
                'relative isolate overflow-hidden select-none active:scale-95',
                className,
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="bp-ripple"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                />
            ))}
        </Button>
    );
});

ButtonRipple.displayName = 'ButtonRipple';

export default ButtonRipple;
