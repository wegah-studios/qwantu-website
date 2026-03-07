import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#D8DFE9",
        contrastText: "#000000",
      },
      secondary: {
        main: "#CFDECA",
        light: "#EFF0A3",
        contrastText: "#000000",
      },
      info: {
        main: "#000000",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: mode === "light" ? "#EFEFEF" : "#252424",
      },
      text: {
        secondary: "#909090",
      },
    },
    typography: {
      fontFamily: "Urbanist",
      fontWeightLight: 200,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
          },
        },
        variants: [
          {
            props: { variant: "h1" },
            style: {
              fontSize: "clamp(2rem, 4vw, 4rem)",
            },
          },
          {
            props: { variant: "h2" },
            style: {
              fontSize: "clamp(1.2rem, 4vw, 2.8rem)",
            },
          },
        ],
      },
    },
  });
};
