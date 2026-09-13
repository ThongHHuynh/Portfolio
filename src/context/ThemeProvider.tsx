import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { STORAGE_KEY, ThemeContext } from "./theme-context";
import type { Theme } from "./theme-context";

function readInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  // The inline script in index.html already resolved this before first paint;
  // read back what it decided so React starts in the same state.
  const applied = document.documentElement.dataset.theme;

  if (applied === "light" || applied === "dark") {
    return applied;
  }

  // Light is the default; dark is only ever an explicit choice.
  return "light";
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    // Keep the mobile browser chrome in step with the page.
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0a1020" : "#faf9f6");

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing or blocked storage — the theme still applies for this visit.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export default ThemeProvider;
