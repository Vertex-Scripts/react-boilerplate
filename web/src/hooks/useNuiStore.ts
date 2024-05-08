import { useEffect, useState } from "react";
import { fetchNui, fetchNuiReturning } from "~/utils/fetchNui";

import { useNuiEvent } from "./useNuiEvent";

type UpdateStoreAction<T> = {
  name: string;
  value: T;
};

export function useNuiStore<T>(name: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    fetchNuiReturning<T>("getStoreValue", name).then((value) => {
      setValue(value);
    });
  }, []);

  useNuiEvent<UpdateStoreAction<T>>("updateStore", (data) => {
    if (data.name !== name) {
      return;
    }

    setValue(data.value);
  });

  return {
    value,
    setValue: (value: T) => {
      setValue(value);
      fetchNui("setStoreValue", { name: name, value: value });
    },
  };
}

export const useVisibilityNuiStore = () => useNuiStore("visibility", false);
export const useCounterNuiStore = () => useNuiStore("counter", 0);
