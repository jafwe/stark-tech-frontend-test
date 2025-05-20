import "@/styles/globals.css";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { chipClasses } from "@mui/material/Chip";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { selectClasses } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";

export const theme = createTheme({
  components: {
    MuiCard: {
      defaultProps: {
        sx: {
          backgroundColor: "white",
          border: "1px solid #DFDFDF",
          borderRadius: "3px",
          padding: "0",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      defaultProps: {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 18px 0px 18px",
          boxShadow: "none",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          [`& .${selectClasses.standard}`]: {
            backgroundColor: "#0386F4",
            color: "white",
            borderRadius: "3px",
            height: "auto",
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "18px",
            padding: "10px 16px 10px 16px !important",
            border: "none",
            textAlign: "right",
            "&:hover": {
              border: "none",
            },
            "&:focus": {
              border: "none",
              borderRadius: "3px",
            },
          },
          "&:after": {
            border: "none",
          },
          "&:before": {
            border: "none",
          },
        },
      },
    },
    MuiChip: {
      defaultProps: {
        sx: {
          backgroundColor: "#0386F4",
          color: "white",
          borderRadius: "3px",
          height: "auto",
          fontWeight: 600,
          fontSize: "13px",
          lineHeight: "18px",
          padding: "10px 16px",
          [`& .${chipClasses.label}`]: {
            padding: "0",
          },
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        sx: {
          width: 400,
          backgroundColor: "#FAFAFA",
          [`& .${outlinedInputClasses.root}`]: {
            padding: "0 0 0 8px",
            boxShadow: "inset 0 0 3px 1px #E9E9E9",
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderRadius: "3px",
            borderColor: "#DFDFDF",
          },
          [`& .${autocompleteClasses.popupIndicator}`]: {
            transform: "none",
          },
        },
      },
    },
    MuiTable: {
      defaultProps: {
        sx: {
          borderRadius: "0",
        },
      },
    },
    MuiTableContainer: {
      defaultProps: {
        sx: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
    },
    MuiTableRow: {
      defaultProps: {
        sx: { "&:last-child": { backgroundColor: "#F6F8FA" } },
      },
    },
    MuiTableCell: {
      defaultProps: {
        sx: { fontWeight: 600, border: "1px solid #E9E9E9" },
      },
    },
    MuiTypography: {
      defaultProps: {
        color: "#434343",
        whiteSpace: "pre-line",
        align: "right",
        fontSize: 13,
        lineHeight: "24px",
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
