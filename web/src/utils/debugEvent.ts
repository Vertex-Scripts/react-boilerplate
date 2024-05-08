import { NuiAction } from "~/hooks/useNuiEvent";

import { isBrowser } from "./cef";

export function debugEvent<T>(
  events: NuiAction<T> | NuiAction<T>[],
  delay: number = 1000,
) {
  if (!isBrowser()) return;

  events = Array.isArray(events) ? events : [events];
  for (const event of events) {
    setTimeout(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            action: event.action,
            data: event.data,
          },
        }),
      );
    }, delay);
  }
}
