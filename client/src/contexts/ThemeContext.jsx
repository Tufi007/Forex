import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      secondary: '#64748b',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      border: '#334155',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      accent: '#8b5cf6'
    }
  },
  light: {
    name: 'Light',
    colors: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      secondary: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      surfaceHover: '#f1f5f9',
      text: '#0f172a',
      textSecondary: '#334155',
      textMuted: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      accent: '#8b5cf6'
    }
  },
  green: {
    name: 'Green',
    colors: {
      primary: '#10b981',
      primaryHover: '#059669',
      secondary: '#6b7280',
      background: '#0f1419',
      surface: '#1a2332',
      surfaceHover: '#253447',
      text: '#f0fdf4',
      textSecondary: '#dcfce7',
      textMuted: '#bbf7d0',
      border: '#22543d',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      accent: '#34d399'
    }
  },
  blue: {
    name: 'Blue',
    colors: {
      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      secondary: '#64748b',
      background: '#0c1222',
      surface: '#1e293b',
      surfaceHover: '#334155',
      text: '#f0f9ff',
      textSecondary: '#bae6fd',
      textMuted: '#7dd3fc',
      border: '#1e40af',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      accent: '#38bdf8'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      theme: themes[currentTheme],
      themes,
      changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};