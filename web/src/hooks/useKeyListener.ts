import { useEffect } from "react";

export function useKeyListener(keys: string | string[], callback: () => void) {
  keys = Array.isArray(keys) ? keys : [keys];

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        callback();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  });
}
