import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./pages/Layout";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "src/assets/scss/style.scss";
import client from "./graphql/client";
import { store } from "src/redux/store";

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client()}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
