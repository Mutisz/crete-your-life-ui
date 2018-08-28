import React from "react";
import { render } from "react-dom";
import createClient from "./config/createClient";
import createI18n from "./config/createI18n";
import createTheme from "./config/createTheme";
import registerServiceWorker from "./config/registerServiceWorker";

import { ApolloProvider } from "react-apollo";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import App from "./components/App";

const client = createClient();
const i18n = createI18n();
const theme = createTheme();
render(
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </I18nextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
