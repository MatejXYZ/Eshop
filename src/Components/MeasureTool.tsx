import { Box } from "@chakra-ui/react";

const MeasureTool = () => {
  return (
    <Box position="absolute" display="flex" flexWrap="wrap" w="full" h="full">
      {Array.from(Array(100).keys()).map((item) => (
        <Box w="10%" h="10%" bg="linear-gradient(45deg, seagreen, sandybrown)">
          {item}
        </Box>
      ))}
    </Box>
  );
};

export default MeasureTool;
