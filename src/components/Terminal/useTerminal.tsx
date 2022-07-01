import { MutableRefObject, useEffect } from 'react';
import { useTerminalStore } from '../../stores';

export const useTerminal = (
  modalTogglerRef: MutableRefObject<HTMLInputElement>,
  inputRef: MutableRefObject<HTMLInputElement>
) => {
  const { displayReplace } = useTerminalStore();

  async function handleTyping(e: KeyboardEvent) {
    // Open Terminal
    if (e.shiftKey && e.code === 'KeyT' && !modalTogglerRef.current.checked) {
      e.preventDefault();
      modalTogglerRef.current.click();
      inputRef.current.focus();
    }

    // Close Terminal
    if (e.shiftKey && e.code === 'KeyQ' && modalTogglerRef.current.checked) {
      e.preventDefault();
      displayReplace([]);
      modalTogglerRef.current.click();
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleTyping);

    return () => {
      document.removeEventListener('keypress', handleTyping);
    };
  }, []);
};
