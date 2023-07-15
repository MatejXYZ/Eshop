import { Box, Flex } from "@chakra-ui/react";

import { BackgroundEffect, Carousel, Footer, Navigation } from "./Components";

const Dashboard = () => (
  <Flex
    w="100vw"
    h="100vh"
    overflow="hidden auto"
    position="relative"
    flexDir="column"
  >
    <Box flex="1">
      <Navigation />
      <Flex justifyContent="center" pt={["15px", "20px"]} pb={["30px", "40px"]}>
        <Box w={["full", null, "80%"]} maxW="960px">
          <Carousel />
        </Box>
      </Flex>
    </Box>
    <Footer />
    <BackgroundEffect />
  </Flex>
);

export default Dashboard;
