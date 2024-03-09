// ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [showCopied, setShowCopied] = useState(false);
    const showCopyAlert = () => {
      setShowCopied(true);
      
      setTimeout(() => {
        setShowCopied(false);
      }, 6000); // 3000 milliseconds = 3 seconds
    };
    useEffect(() => {
      const preferredTheme = localStorage.getItem('theme');
  
      if (preferredTheme) {
        setTheme(preferredTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    }, []);
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, showCopied, showCopyAlert }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
