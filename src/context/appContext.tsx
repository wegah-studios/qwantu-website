"use client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { getTheme } from "@/theme";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AppContext = createContext<{
  mode: "light" | "dark";
  captchaReturnUrl: string;
  setCaptchaReturnUrl: Dispatch<SetStateAction<string>>;
  toggleMode: () => void;
} | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [captchaReturnUrl, setCaptchaReturnUrl] = useState<string>("");

  useEffect(() => {
    const storedMode = localStorage.getItem("theme-mode") as
      | "light"
      | "dark"
      | null;

    if (storedMode) {
      setMode(storedMode);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setMode(prefersDark ? "dark" : "light");
    }
    setMounted(true);
  }, []);

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  if (!mounted) return false;

  return (
    <AppRouterCacheProvider>
      <AppContext.Provider
        value={{ mode, captchaReturnUrl, setCaptchaReturnUrl, toggleMode }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppContext.Provider>
    </AppRouterCacheProvider>
  );
};

export const userAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("userAppContext must be used within a AppContextProvider");
  }
  return context;
};
