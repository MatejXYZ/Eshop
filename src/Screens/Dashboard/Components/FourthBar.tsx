import { Box, Button } from "@chakra-ui/react";
import { Heading, HStack, Text, VStack } from "@chakra-ui/react";

import colors from "../../../colors";

const FourthBar = () => (
  <VStack p="3.125rem" color={colors.black} spacing="0">
    <Text fontSize="1rem">Just In: Nike Invincible 3</Text>
    <Heading
      textTransform="uppercase"
      fontSize="4.5rem"
      fontFamily="'Anton'"
      transform="scale(1.1, 0.9)"
      letterSpacing="-0.1rem"
      lineHeight="4.5rem"
    >
      Feel it to believe it
    </Heading>
    <Box pt="1rem" pb="1.75rem" textAlign="center" maxW="40rem">
      <Text fontSize="1.25rem" lineHeight="1.75rem">
        Our most cushioned road-running shoe gives you extraordinary comfort,
        supreme softness and lightweight support through every mile.
      </Text>
    </Box>
    <HStack>
      <Button>Shop Men's</Button>
      <Button>Shop Women's</Button>
    </HStack>
  </VStack>
);

export default FourthBar;
