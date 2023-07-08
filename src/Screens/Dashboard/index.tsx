import { Box, Flex } from "@chakra-ui/react";

import { BackgroundEffect, Carousel, Navigation } from "./Components";

const Dashboard = () => (
  <Box w="100vw" h="100vh" overflow="hidden auto" position="relative">
    <Navigation />
    <Flex justify="center" pt="20px">
      <Box w="80%" maxW="1000px">
        <Carousel />
      </Box>
    </Flex>
    <BackgroundEffect />
  </Box>
);

export default Dashboard;
