import { Box } from "@chakra-ui/react";

import { BackgroundEffect, Carousel, Navigation } from "./Components";

const Dashboard = () => (
  <Box w="100vw" h="100vh" overflow="hidden auto">
    <Navigation />
    <Box justifyContent="center" py="100px" px={{ xl: "500px" }}>
      <Carousel />
    </Box>
    <BackgroundEffect />
  </Box>
);

export default Dashboard;
