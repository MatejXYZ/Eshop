import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

import colors from "../colors";

const Title: FC<PropsWithChildren> = ({ children }) => (
  <Box fontSize="1.5rem" color={colors.black}>
    {children}
  </Box>
);

export default Title;
