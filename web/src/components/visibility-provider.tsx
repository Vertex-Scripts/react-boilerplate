import { createContext, useContext, useState } from "react";

const defaultValue = {
  visible: false,
  setVisible: (_state: boolean) => {},
};

const VisibilityContext = createContext(defaultValue);

export function VisibilityProvider(props: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <VisibilityContext.Provider value={{ visible, setVisible }}>
      {props.children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  return useContext(VisibilityContext);
}
