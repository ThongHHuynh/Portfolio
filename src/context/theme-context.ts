import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export type ThemeValue = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export const STORAGE_KEY = "portfolio-theme";

export function useTheme(): ThemeValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return value;
}
