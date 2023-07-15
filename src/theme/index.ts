import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./Components";

const font = `Manrope,sans`;

const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
  fonts: {
    heading: font,
    body: font,
  },
});

export default theme;
