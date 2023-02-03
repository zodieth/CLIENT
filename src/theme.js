import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    intialColorMode: "dark", /// nuestro modo inicial sera en modo oscuro, si el usuario quiere modo luminoso lo haremos por el 
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        WebKitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },

      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
    },
  },
};

export default extendTheme(theme)