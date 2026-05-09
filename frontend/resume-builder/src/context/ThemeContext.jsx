import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

/**
 * ThemeProvider — Global theme controller.
 * Adds/removes "dark" class directly on <html> so ALL
 * Tailwind dark: variants and CSS variables activate globally.
 * No per-component or per-page dark styling needed.
 */
export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Read persisted preference, or respect OS setting
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Convenience hook — use anywhere in the app */
export const useTheme = () => useContext(ThemeContext);
