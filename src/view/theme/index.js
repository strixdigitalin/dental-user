import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    primary: {
      main: "#f13a5a",
      dark: "#E42E22",
    },
    secondary: {
      main: "#F0F0F0",
      dark: "#EBD9D8",
    },
  },
});

const theme = {
  ...defaultTheme,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.primary.main,
        },
        outlined: {
          backgroundColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#ffffff",
          },
        },
        contained: {
          "&:hover": {
            backgroundColor: "#f13a5a",
          },
        },
      },
    },
  },
};

export default theme;
