import { ReactNode } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ITerminalStore {
  inputText: string;
  inputTextReset(): void;
  inputTextReplace(str: string): void;
  inputTextConcat(char: string): void;
  display: ReactNode[];
  displayAdd(jssxArr: ReactNode[]): void;
  displayReplace(jsxArr: ReactNode[]): void;
  showToast: boolean;
  showToastChange(isShowing: boolean): void;
}

export const useTerminalStore = create(
  immer<ITerminalStore>((set) => ({
    // Input
    inputText: '',
    inputTextReset: () => set({ inputText: '' }),
    inputTextReplace: (str) => set({ inputText: str }),
    inputTextConcat: (char) => {
      set((state) => ({ inputText: state.inputText + char }));
    },
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
  }))
);
