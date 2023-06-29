import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState } from "react";

import { navigationData } from "../../../../mockData";
import { SearchIcon } from "../../../../assets/svg";

import "./slide.css";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  return (
    <Flex justifyContent="space-evenly" h="50px">
      <Spacer flex={activeSection ? "1" : "2"} transition="flex 0.25s" />
      <Box transition="flex 0.25s" flex={activeSection ? "7" : "6"}>
        <Flex justify="center" w="full" h="50px" zIndex={1} position="relative">
          <Flex
            onMouseLeave={() => {
              setLastActiveSection(activeSection);

              setActiveSection(null);
            }}
            bg="#555"
            flexDirection="column"
            position="absolute"
            overflow="hidden"
            minW="250px"
            w="full"
            maxH={activeSection === null ? "50px" : "600px"}
            transition="max-height 0.25s"
          >
            <Flex justify="space-around" bg="#eee">
              {navigationData.map(({ title, id }) => {
                const isActive = id === activeSection;

                return (
                  <Flex
                    flex={isActive ? "2" : "1"}
                    bg={isActive ? "#555" : "transparent"}
                    color={isActive ? "#eee" : "#113"}
                    key={id}
                    h="50px"
                    px="8px"
                    fontWeight="700"
                    transition="flex 0.25s, background-color 0.25s, color 0.25s"
                    onMouseEnter={() => {
                      setActiveSection(id);

                      setLastActiveSection(activeSection);
                    }}
                    align="center"
                    justify="center"
                    cursor="pointer"
                  >
                    {title}
                  </Flex>
                );
              })}
            </Flex>
            <Box
              key={activeSection}
              flex="3"
              flexShrink="1"
              w="full"
              p="16px"
              display="flex"
              flexWrap="wrap"
              animation={`0.25s ease 0s ${
                Number(lastActiveSection) > Number(activeSection)
                  ? "slide-in-from-right"
                  : "slide-in-from-left"
              }`}
              justifyContent="space-around"
              pb="7%"
            >
              {navigationData
                .find((item) => item.id === activeSection)
                ?.subCategories.map((subCategory) => (
                  <Box key={subCategory.id}>
                    <Box
                      color="#eee"
                      cursor="pointer"
                      textTransform="capitalize"
                    >
                      {subCategory.title}
                    </Box>
                    {subCategory.items.map((item) => (
                      <Box
                        color="#113"
                        key={item.id}
                        cursor="pointer"
                        _hover={{ color: "#eee" }}
                        textTransform="capitalize"
                      >
                        {item.title}
                      </Box>
                    ))}
                  </Box>
                ))}
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Flex
        flex={activeSection ? "2" : "3"}
        opacity={activeSection ? "0" : "1"}
        alignSelf="stretch"
        align="center"
        justify="center"
        overflow="hidden"
        transition="width 0.25s, opacity 0.125s, flex 0.25s, padding 0.25s"
      >
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navigation;
