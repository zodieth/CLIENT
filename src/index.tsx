import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root")!;
const root = createRoot(container);

const getAuth = () => {
  const token = localStorage.getItem("user-token");
  return token ? token : null;
};

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        {/* <Auth0Provider
          domain="dev-6d0rlv0acg7xdkxt.us.auth0.com"
          clientId="2EHZJm086BzkgwY5HXmPeK5UnbHegBXl"
          cacheLocation="localstorage"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: "https://all-tech.com",
          }}
        > */}
          <RouterProvider router={router} />
        {/* </Auth0Provider> */}
      </ChakraProvider>
    </Provider>
  // </React.StrictMode>
);
