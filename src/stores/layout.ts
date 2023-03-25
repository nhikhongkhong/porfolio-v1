import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

interface LayoutState {
  openSidebar: boolean;
  toggleSidebar: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    persist(
      set => ({
        openSidebar: false,
        toggleSidebar: () => set(state => ({openSidebar: !state.openSidebar})),
      }),
      {
        name: 'layout-storage',
      },
    ),
  ),
);
