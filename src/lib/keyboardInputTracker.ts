import { useEffect, useState } from 'react';
import { useDOM } from './dom';

export function useKeyboardInputTracker(): boolean {
  const { document } = useDOM();

  const [isKeyboardInputActive, toggleKeyboardInput] = useState<boolean>(true);

  useEffect(() => {
    const enableKeyboardInput = ({ key }: KeyboardEvent) => {
      if (key.toUpperCase() === 'TAB') {
        toggleKeyboardInput(true);
      }
    };

    const disableKeyboardInput = () => {
      toggleKeyboardInput(false);
    };

    const eventOptions = {
      passive: true,
      capture: true,
    };

    document.addEventListener('keydown', enableKeyboardInput, eventOptions);

    document.addEventListener('mousedown', disableKeyboardInput, eventOptions);
    document.addEventListener('touchstart', disableKeyboardInput, eventOptions);

    return () => {
      document.removeEventListener('keydown', enableKeyboardInput, eventOptions);

      document.removeEventListener('mousedown', disableKeyboardInput, eventOptions);
      document.removeEventListener('touchstart', disableKeyboardInput, eventOptions);
    };
  }, []);

  return isKeyboardInputActive;
}
