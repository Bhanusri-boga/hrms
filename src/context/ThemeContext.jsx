import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Enforce dark mode for the futuristic UI
  const darkMode = true; // Hardcoded to true

  useEffect(() => {
    // Apply dark mode class to HTML element
    document.documentElement.classList.add('dark');
    // Persist theme choice (though it's fixed to dark)
    localStorage.setItem('theme', 'dark');

    // Apply base body class for dark theme from global.css
    // This ensures the primary background is set correctly.
    // Note: global.css now handles the bg-dark-900 for html, body
    // so explicitly adding here might be redundant if global.css is loaded correctly.
    // However, it's good for ensuring the class is present.
    document.body.classList.add('bg-dark-900'); 

    // Clean up function: remove the class if the ThemeProvider is ever unmounted
    return () => {
      // Potentially remove 'dark' from html and 'bg-dark-900' from body 
      // if the app structure allowed for theme switching outside this provider,
      // but for a fixed dark theme, this cleanup might not be strictly necessary.
      // document.documentElement.classList.remove('dark');
      // document.body.classList.remove('bg-dark-900');
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // The toggleTheme function is removed as the theme is fixed.
  // If it were needed for some internal logic, it would just re-assert dark mode.
  // const toggleTheme = () => { /* No longer needed */ };

  return (
    // Provide darkMode status. toggleTheme is no longer provided.
    <ThemeContext.Provider value={{ darkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;