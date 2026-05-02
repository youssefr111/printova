import { createContext, useEffect, useState } from "react";
import RootDataContext from "./RootDataContext";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkTheme');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify(isDark));

    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;