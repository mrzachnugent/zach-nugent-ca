import { ReactNode } from 'react';
import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ITerminalStore {
  terminalInput: string;
  setTerminalInput(input: string): void;
  display: ReactNode[];
  displayAdd(jssxArr: ReactNode[]): void;
  displayReplace(jsxArr: ReactNode[]): void;
  showToast: boolean;
  showToastChange(isShowing: boolean): void;
  firstTimeOpening: boolean;
  toggleFirstTimeOpening(): void;
  myCommands: string[];
  addMyCommand(cmd: string): void;
  myComandsHistoryIndex: number;
  setCommandsHistoryIndex(index: number): void;
}

export const useTerminalStore = create(
  immer<ITerminalStore>((set) => ({
    // Display
    terminalInput: '',
    setTerminalInput: (input) => {
      set({ terminalInput: input });
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
    // First time opening terminal
    firstTimeOpening: true,
    toggleFirstTimeOpening: () => {
      set((state) => ({ firstTimeOpening: !state.firstTimeOpening }));
    },
    // history of commands
    myCommands: [],
    myComandsHistoryIndex: -1,
    setCommandsHistoryIndex: (index) => {
      set({ myComandsHistoryIndex: index });
    },
    addMyCommand: (cmd) => {
      set((state) => ({ myCommands: [...state.myCommands, cmd] }));
      set((state) => ({
        myComandsHistoryIndex: [...state.myCommands].length - 1,
      }));
    },
  }))
);
