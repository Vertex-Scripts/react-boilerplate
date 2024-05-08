import { useEffect } from "react";

export type NuiAction<T> = {
  action: string;
  data: T;
};

export function useNuiEvent<T>(action: string, handler: (data: T) => void) {
  useEffect(() => {
    const listener = (event: MessageEvent<NuiAction<T>>) => {
      const { action: eventAction, data } = event.data;
      if (eventAction === action) {
        handler(data);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  });
}
