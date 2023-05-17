import { Box, Button, HStack, VStack } from "@chakra-ui/react";

import colors from "../../../colors";

import { Title } from "../../../Components";

type DataItem = {
  title: string;
  buttonText: string;
  img: string;
};

const data: DataItem[] = [
  {
    title: "Get the latest Air on the Nike App",
    buttonText: "Download Now",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/d5199682-2dd8-4741-9a05-1b9834f502fc/nike-just-do-it.jpg",
  },
  {
    title: "Get access to exclusives and more",
    buttonText: "Download SNKRS",
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_906,c_limit/de40e5b2-433e-4ba0-9b05-127dc377c8ab/nike-just-do-it.jpg",
  },
];

const MonthBar = () => {
  return (
    <VStack w="full" pb="5rem" spacing="2rem">
      <Title>Month of Air</Title>
      <HStack w="full" spacing="0.75rem">
        {data.map(({ title, buttonText, img }) => (
          <VStack
            key={title}
            flex="1"
            bg={`url("${img}")`}
            h="25rem"
            justify="end"
            align="start"
            p="3rem"
            spacing="2rem"
          >
            <Box color={colors.white} fontSize="1.25rem">
              {title}
            </Box>
            <Button colorScheme="white">{buttonText}</Button>
          </VStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default MonthBar;
