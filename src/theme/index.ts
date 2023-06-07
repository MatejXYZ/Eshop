import { extendTheme } from "@chakra-ui/react";

import { buttonTheme } from "./Components";

const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
});

export default theme;
