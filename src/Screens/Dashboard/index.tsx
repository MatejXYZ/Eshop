import { Box } from "@chakra-ui/react";

import { BackgroundEffect, Carousel, Navigation } from "./Components";

const Dashboard = () => (
  <Box w="100vw" h="100vh" overflow="hidden auto">
    <BackgroundEffect />
    <Navigation />
    <Carousel />
  </Box>
);

export default Dashboard;
