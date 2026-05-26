import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MIN_SIDEBAR = 330;

interface ThemeCreatorState {
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
}

export const useThemeCreatorStore = create<ThemeCreatorState>()(
    persist(
        (set) => ({
            sidebarWidth: MIN_SIDEBAR,
            setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
        }),
        { name: 'theme-creator-ui' },
    ),
);
