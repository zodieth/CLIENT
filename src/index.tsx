import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
          <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
