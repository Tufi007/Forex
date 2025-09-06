import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const ThemeSelector = ({ showLabel = false, size = 'md' }) => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = {
    dark: '#3b82f6',
    light: '#3b82f6',
    green: '#10b981',
    blue: '#0ea5e9'
  };

  const themeIcons = {
    dark: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
    light: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
      </svg>
    ),
    green: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    blue: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <div 
          className="w-4 h-4 rounded-full border border-border"
          style={{ backgroundColor: themeColors[currentTheme] }}
        />
        {showLabel && <span>{themes[currentTheme].name}</span>}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-medium z-20 py-1">
            {Object.entries(themes).map(([themeKey, theme]) => (
              <button
                key={themeKey}
                className={`w-full px-4 py-3 text-left hover:bg-surfaceHover transition-colors flex items-center gap-3 ${
                  currentTheme === themeKey ? 'bg-surfaceHover' : ''
                }`}
                onClick={() => {
                  changeTheme(themeKey);
                  setIsOpen(false);
                }}
              >
                <div 
                  className="w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: themeColors[themeKey] }}
                >
                  {themeIcons[themeKey]}
                </div>
                <div className="flex-1">
                  <div className="text-text font-medium">{theme.name}</div>
                  <div className="text-textMuted text-xs">
                    {themeKey === 'dark' && 'Dark theme'}
                    {themeKey === 'light' && 'Light theme'}
                    {themeKey === 'green' && 'Trading green'}
                    {themeKey === 'blue' && 'Ocean blue'}
                  </div>
                </div>
                {currentTheme === themeKey && (
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;