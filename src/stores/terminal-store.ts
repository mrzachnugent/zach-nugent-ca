import { ReactNode } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ITerminalStore {
  display: ReactNode[];
  displayAdd(jssxArr: ReactNode[]): void;
  displayReplace(jsxArr: ReactNode[]): void;
  showToast: boolean;
  showToastChange(isShowing: boolean): void;
  firstTimeOpening: boolean;
  toggleFirstTimeOpening(): void;
}

export const useTerminalStore = create(
  immer<ITerminalStore>((set) => ({
    // Display
    display: [],
    displayAdd: (jsxArr) => {
      set((state) => ({ display: [...state.display, ...jsxArr] }));
    },
    displayReplace: (jsxArr) => {
      set({ display: jsxArr });
    },
    // Toast
    showToast: false,
    showToastChange: (isShowing) => {
      set({ showToast: isShowing });
    },
    // First time opening terminal
    firstTimeOpening: true,
    toggleFirstTimeOpening: () => {
      set((state) => ({ firstTimeOpening: !state.firstTimeOpening }));
    },
  }))
);
