import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./Components";

const theme = extendTheme({
  fonts: {
    heading: `Helvetica, Arial, sans-serif`,
    body: `Helvetica, Arial, sans-serif`,
  },
  components: {
    Button: buttonTheme,
  },
});

export default theme;
