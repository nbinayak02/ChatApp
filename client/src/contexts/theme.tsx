import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
interface ContextType {
  toggleTheme: () => void;
}

export const ColorModeContext = createContext<ContextType | undefined>(
  undefined
);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize theme state with localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") return false;

    // First check localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme on mount and when isDark changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Apply the theme class
    document.body.classList.toggle("dark", isDark);

    // Save to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: any) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    console.log("Toggling theme");
    setIsDark((prev) => !prev);
  };

  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Custom hook with error handling
export function useThemeSwitch() {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useThemeSwitch must be used within a ColorModeProvider");
  }

  return context;
}
