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
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Auth0Provider
          domain="dev-q8r68soch6pmim4b.us.auth0.com"
          clientId="kdJp165cYY5EsTRlUK4pC9LOCyyyGN0Z"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <RouterProvider router={router} />
        </Auth0Provider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
