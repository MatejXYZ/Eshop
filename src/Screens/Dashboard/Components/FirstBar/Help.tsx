import { Box, VStack } from "@chakra-ui/react";

import colors from "../../../../colors";

const Help = () => (
  <Box p="1.5rem 1.5rem 1.5rem 1rem" w="15rem">
    <Box fontSize="1rem" color={colors.black} pb="1.5rem">
      Help
    </Box>
    <VStack color={colors.lighterBlack} align="left" spacing="0">
      {[
        "Order Status",
        "Dispatch and Delivery",
        "Returns",
        "Size Charts",
        "Contact Us",
        "Privacy Policy",
        "Terms of Sale",
        "Terms of Use",
        "Send Us Feedback",
      ].map((item) => (
        <Box
          key={item}
          fontSize="0.875rem"
          cursor="pointer"
          _hover={{ color: colors.black }}
          py="0.25rem"
        >
          {item}
        </Box>
      ))}
    </VStack>
  </Box>
);

export default Help;
