import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#A15801", // dark brown
      light: "#7e4501",
      dark: "#7e4501",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f5f5f5", // light gray
      light: "#fcc769",
      dark: "#fff",
      contrastText: "#555555",
    },
    info: {
      main: "#FBAD23", // yellow
      light: "#fcc769",
      dark: "#fcc769",
      contrastText: "#3b3a48",
    },
    
  },
  typography: {
    fontFamily: ["'Public Sans', sans-serif"].join(","),
    // fontSize: 20,
    h1: {
      fontSize: "calc(2.9375rem + 0.1vw) !important",
      lineHeight: "1.25",
      fontWeight: 700,
    },
    h2: {
      fontSize: "calc(1.8125rem + 0.1vw) !important",
      lineHeight: "1.375",
      fontWeight: 700,
    },
    h3: {
      fontSize: "calc(1.8125rem + 0.1vw) !important",
      lineHeight: "1.5",
      fontWeight: 700,
    },
    h4: {
      fontSize: "calc(1.4375rem + 0.1vw) !important",
      lineHeight: "1.625",
      fontWeight: 700,
    },
    h5: {
      fontSize: "calc(1.125rem + 0.1vw) !important",
      lineHeight: "1.25",
      fontWeight: 700,
    },
    h6: {
      fontSize: "calc(0.875rem + 0.1vw) !important",
      lineHeight: "1.75",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary'},
          style: {
            boxShadow: 'none',
            "&.Mui-disabled": {
                background: "#A15801",
                color: "#fff",
                opacity: "0.65",
              }
            }
        },
        {
          props: { variant: 'contained', color: 'secondary'},
          style: {
            boxShadow: 'none',
            border: '1px solid #555555',
            borderRadius: '4px',
            "&.Mui-disabled": {
                background: "#f5f5f5",
                color: "#000",
                opacity: "0.65",
              },
              "&:hover": {
                backgroundColor: '#fff',
                color: '#02374e',
                borderColor: '#000'
              },
            }
        },
        {
          props: { variant: 'contained', color: 'info'},
          style: {
            boxShadow: 'none',
            "&.Mui-disabled": {
                background: "#fdc341",
                color: "#3b3a48",
                opacity: "0.65",
              }
            }
        }
      ]
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #dee2e6',
          padding: '30px 20px'
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root: {
          fontSize: 'calc(1rem + 0.1vw)'
        }
      }
    },
    MuiPaginationItem:{
      styleOverrides:{
        root:{
          padding: '5px',
          color: '#4a4958',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          '&:hover':{
            borderRadius: 0,
            backgroundColor: '#fff',
            boxShadow: 'inset 0 0 0 3px #d4d4d7'
          },
          '&.Mui-selected': {
            backgroundColor: '#fff',
            boxShadow: 'inset 0 0 0 1px #d4d4d7 !important',
            borderRadius: 0,
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#fff'
            }
          }
        }
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root: {
          fontSize: ' calc(1.125rem + 0.1vw)',
          color: '#343a40'
        }
      }
    },
    MuiDialogTitle:{
      styleOverrides:{
        root:{
          fontSize: 'calc(1.125rem + 0.1vw) !important',
          fontWeight: 700
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
       root:{
          fontSize: '18px',
        },
        
       
      }
    }
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={100000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
