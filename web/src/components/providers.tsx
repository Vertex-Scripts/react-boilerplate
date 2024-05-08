import { ThemeProvider } from "~/theming/provider";

export function Providers(props: { children: React.ReactNode }) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}
