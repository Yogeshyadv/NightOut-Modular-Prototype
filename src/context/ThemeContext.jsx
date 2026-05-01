import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('nightout-theme-v2');
      if (stored) return stored === 'dark';
    } catch {}
    return true; // Default to dark mode on startup
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      document.body.classList.add('bg-dark-900', 'text-white');
      document.body.classList.remove('bg-light-50', 'text-dark-900');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('bg-dark-900', 'text-white');
      document.body.classList.add('bg-light-50', 'text-dark-900');
    }
    try { localStorage.setItem('nightout-theme-v2', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  const toggle = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};
