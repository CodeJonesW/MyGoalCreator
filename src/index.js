import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import configureAppStore from "./redux/configureStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeConfig } from "./theme";
import { Provider } from "react-redux";
import AppRoutes from "./AppRoutes";

const preloadedState = {};

const store = configureAppStore(preloadedState);

const theme = createTheme(themeConfig);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
