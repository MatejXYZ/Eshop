import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { useState } from "react";

import { navigationData } from "../../../../mockData";
import { SearchIcon } from "../../../../assets/svg";

import "./slide.css";

const activeMenuButtonStyle = {
  bg: "#555",
  flex: "2",
  color: "#eee",
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  return (
    <Flex justifyContent="space-evenly" h="50px">
      <Spacer flex="1" />
      <Box
        transition="flex 0.25s"
        flex="6"
        _hover={{
          flex: 10,
        }}
      >
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
                    flex="1"
                    key={id}
                    h="50px"
                    px="8px"
                    fontWeight="700"
                    color="#113"
                    {...(isActive ? activeMenuButtonStyle : null)}
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
        flex={activeSection ? "1" : "3"}
        alignSelf="stretch"
        align="center"
        justify="center"
        w={activeSection ? "0" : "120px"}
        overflow="hidden"
        opacity={activeSection ? "0" : "1"}
        transition="width 0.25s, opacity 0.25s, flex 0.25s, max-width 0.25s"
      >
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navigation;
