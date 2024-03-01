import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  let throttleRef = useRef(false);

  useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        throttleRef.current = true;
        callback(...args);
      }

      setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    },
    [callback, delay]
  );
}
