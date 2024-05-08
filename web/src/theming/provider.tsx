import { createContext, useContext, useEffect, useState } from "react";
import { useNuiEvent } from "~/hooks/useNuiEvent";

import { Theme } from ".";
import { dark } from "./themes/dark";
import { light } from "./themes/light";
import { appylTheme as applyTheme } from "./utils";

type RegisteredTheme = {
  name: string;
  theme: Theme;
};

type ThemeContextType = {
  theme: string;
  setTheme: (name: string) => void;

  registeredThemes: RegisteredTheme[];
  registerTheme: (name: string, theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const defaultThemes: RegisteredTheme[] = [
  {
    name: "dark",
    theme: dark,
  },
  {
    name: "light",
    theme: light,
  },
];

export function ThemeProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [registeredThemes, setRegisteredThemes] = useState(defaultThemes);

  function registerTheme(name: string, theme: Theme) {
    setRegisteredThemes((prev) => [...prev, { name, theme }]);
  }

  useEffect(() => {
    const themeObject = registeredThemes.find((t) => t.name === theme);
    if (themeObject?.theme) {
      applyTheme(themeObject.theme);
    }
  }, [theme]);

  useNuiEvent<string>("setTheme", (theme) => {
    setTheme(theme);
    console.log("setTheme", theme);
  });

  useNuiEvent<RegisteredTheme>("registerTheme", (data) => {
    registerTheme(data.name, data.theme);
    console.log("registerTheme", data);
  });

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, registeredThemes, registerTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
