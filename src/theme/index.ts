import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }
  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

export const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1100,
      xl: 1436,
    },
  },
  palette: {
    primary: {
      main: "#368F54",
    },
    secondary: {
      main: "#808080",
    },
    white: {
      main: "#FFFFFF",
    },
    background: {
      default: "#F9F9F9",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 10,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flex: 1,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
        },
      },
    },
  },
});
