import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ControlsPanel } from '@/components/themes/controls-panel';
import { ExportDialog } from '@/components/themes/export-dialog';
import { ThemePreview } from '@/components/themes/theme-preview';
import { Separator } from '@/components/ui/separator';
import ThemeCreatorLayout from '@/layouts/theme-creator-layout';
import { cn } from '@/lib/utils';
import { index } from '@/routes/themes';
import { useThemeCreatorStore } from '@/store/theme-creator';

const MOBILE_TABS = ['Editor', 'Preview'] as const;
const MIN_SIDEBAR = 330;
const MAX_SIDEBAR_PCT = 0.5;

export default function ThemeCreate() {
    const [mobileTab, setMobileTab] = useState<string>('Editor');
    const [themeName, setThemeName] = useState('My New Theme');
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.select();
        }
    }, [isEditing]);
    const sidebarWidth = useThemeCreatorStore((s) => s.sidebarWidth);
    const setSidebarWidth = useThemeCreatorStore((s) => s.setSidebarWidth);
    const dragging = useRef(false);

    const handleMouseDown = useCallback(() => {
        dragging.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging.current) {
                return;
            }

            const max = window.innerWidth * MAX_SIDEBAR_PCT;
            setSidebarWidth(Math.min(Math.max(e.clientX, MIN_SIDEBAR), max));
        };

        const handleMouseUp = () => {
            dragging.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <Head title="Create Theme" />
            <nav className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
                <Link
                    href={index().url}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    <span className={`sr-only`}>Themes</span>
                </Link>
                <Separator
                    orientation="vertical"
                    className="h-4 py-2 opacity-25"
                />

                <div
                    className="group flex items-center gap-1.5"
                    onDoubleClick={() => setIsEditing(true)}
                >
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            value={themeName}
                            onChange={(e) => setThemeName(e.target.value)}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setIsEditing(false);
                                }
                            }}
                            className="h-7 rounded border border-border bg-transparent px-2 text-sm font-medium outline-none focus:border-ring"
                            autoFocus
                        />
                    ) : (
                        <>
                            <span className="text-sm font-medium">
                                {themeName}
                            </span>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Pencil className="size-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                        </>
                    )}
                </div>

                <div className="ml-auto">
                    <ExportDialog />
                </div>
            </nav>

            {/* Mobile tab bar */}
            <div className="flex border-b md:hidden">
                {MOBILE_TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setMobileTab(tab)}
                        className={cn(
                            'flex-1 px-4 py-2.5 text-center text-sm font-medium transition-colors',
                            mobileTab === tab
                                ? 'border-b-2 border-foreground text-foreground'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={cn(
                        'shrink-0 overflow-y-auto',
                        'md:block md:w-(--sidebar-w)',
                        mobileTab === 'Editor' ? 'block w-full' : 'hidden',
                    )}
                    style={
                        {
                            '--sidebar-w': `${sidebarWidth}px`,
                        } as React.CSSProperties
                    }
                >
                    <ControlsPanel />
                </aside>

                {/* Resize handle */}
                <div
                    onMouseDown={handleMouseDown}
                    className={cn(
                        'relative hidden w-2 shrink-0 cursor-col-resize transition-colors hover:bg-primary/10 active:bg-primary/20',
                        'md:flex md:items-center md:justify-center',
                    )}
                >
                    <div className="h-full w-px bg-border" />
                </div>

                <main
                    className={cn(
                        'flex-1 overflow-y-auto',
                        'md:block',
                        mobileTab === 'Preview' ? 'block' : 'hidden',
                    )}
                >
                    <ThemePreview />
                </main>
            </div>
        </>
    );
}

ThemeCreate.layout = ThemeCreatorLayout;
