import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./pages/Theme";

ReactDOM.render(
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ContextProvider>,
  document.getElementById("root")
);
