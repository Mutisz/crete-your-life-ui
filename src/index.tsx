import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

import { render } from "react-dom";
import initializeI18n from "./config/initializeI18n";
import createTheme from "./config/createTheme";
import createClient from "./config/createClient";
import { register } from "./config/registerServiceWorker";

initializeI18n();
const theme = createTheme();
const client = createClient();
render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <ApolloProviderHooks client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProviderHooks>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

register();
