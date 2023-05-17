import { Box, Button, HStack } from "@chakra-ui/react";

import { ScrollCarousel } from "../../../Components";

import { EyeIcon } from "../../../assets/svg";

type DataItem = {
  img: string;
  category: string;
};

const items: DataItem[] = [
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/efb35f07-8f4e-42df-961f-c0548a8d516b/nike-just-do-it.jpg",
    category: "Women",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/14acc094-7a56-4843-95de-edb9679d90e4/nike-just-do-it.jpg",
    category: "Men",
  },
  {
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_599,c_limit/7befca3a-3f05-4d23-84d0-6e689a368923/nike-just-do-it.jpg",
    category: "Kids",
  },
];

const ThirdCarousel = () => {
  return (
    <ScrollCarousel title="More to Explore">
      {items.map(({ img, category }) => {
        return (
          <Box key={category} pr="0.75rem" position="relative">
            <Box w="37.5rem" h="46rem" bg={`url("${img}")`} bgSize="cover" />
            <HStack
              spacing="0.25rem"
              position="absolute"
              left="2.8rem"
              bottom="2.25rem"
            >
              <Button colorScheme="white">{category}</Button>
              <Button colorScheme="white" leftIcon={<EyeIcon />}>
                Shop The Look
              </Button>
            </HStack>
          </Box>
        );
      })}
    </ScrollCarousel>
  );
};

export default ThirdCarousel;
