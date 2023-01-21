import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";



// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache,
//   HttpLink,
//   gql,
// } from "@apollo/client";

const container = document.getElementById("root")!;
const root = createRoot(container);

// const getAuth = () => {
//   const token = localStorage.getItem("user-token");
//   return token ? token : null;
// };

// const client = new ApolloClient({
//   connectToDevTools: true,
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     headers: {
//       authorization: getAuth(),
//     },
//     uri: "http://localhost:3001",
//   }),
// });

root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
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
    {/* </ApolloProvider> */}
  </React.StrictMode>
);
