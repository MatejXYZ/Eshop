import { useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

import colors from "../../../colors";

type DataItem = {
  title: string;
  items: string[];
};

const data: DataItem[] = [
  {
    title: "Shoes",
    items: [
      "Golf Shoes",
      "Winter Trainers",
      "Gore Tex trainers",
      "Walking Trainers",
      "White Air Max 90s",
      "Weightlifting Shoes",
    ],
  },
  {
    title: "Clothing",
    items: [
      "All Clothing",
      "Yoga Trousers",
      "Tech Fleece Joggers",
      "Tech Fleece Pants",
      "Tech Fleece Hoodie",
      "Football Tracksuits",
    ],
  },
  {
    title: "Kids'",
    items: ["Kids' Sliders", "Kids' Tracksuit Sale", "Kids' Puffer Jacket"],
  },
  {
    title: "Featured",
    items: [
      "Football Club Teams",
      "Football",
      "Nike Run Club",
      "Nike Training Club",
      "Black Sneakers",
      "Plus Size",
      "Factory Store",
      "Shoes under 50",
      "Sandals & Slides",
      "Black Running Shoes",
      "White Running Shoes",
      "White Football Boots",
      "Blue Football Boots",
      "Red Football Boots",
    ],
  },
];

const BottomMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex w="full" overflow="hidden" justify="center" pt="2.25rem">
      <Box
        onMouseEnter={() => {
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setIsExpanded(false);
        }}
        position="relative"
      >
        <Flex
          w="fit-content"
          bg={colors.white}
          align="start"
          h={isExpanded ? "36rem" : "16rem"}
          transition="height 0.3s ease 0.2s"
          justify="center"
          overflow="hidden"
          pl="2.5rem"
        >
          {data.map(({ title, items }) => (
            <VStack key={title} w="14.5rem" align="start" spacing="1.75rem">
              <Box>{title}</Box>
              <VStack align="start" spacing="0.75rem">
                {items.map((item, index) => (
                  <Box
                    key={item}
                    color={colors.lighterBlack}
                    _hover={{ color: colors.black }}
                    opacity={index > 3 && !isExpanded ? 0 : 1}
                    transition="color 0.3s, opacity 0.3s ease 0.2s"
                    cursor="pointer"
                  >
                    {item}
                  </Box>
                ))}
              </VStack>
            </VStack>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default BottomMenu;
