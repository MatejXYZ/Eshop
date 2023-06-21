import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";

import { navigationData } from "../../../../mockData";
import { SearchIcon } from "../../../../assets/svg";

import "./slide.css";

const activeMenuButtonStyle = {
  bg: "#555",
  flex: "2",
  color: "#eee",
};

const expandedMenuStyle = {
  minH: "300px",
  h: "fit-content",
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  return (
    <HStack justifyContent="space-evenly">
      <Box
        w="50%"
        _hover={{
          w: "60%",
        }}
        transition="width 0.25s"
      >
        <Flex justify="center" w="full" h="50px" zIndex={1} position="relative">
          <Flex
            onMouseLeave={() => {
              setLastActiveSection(activeSection);

              setActiveSection(null);
            }}
            bg="#555"
            minH="full"
            h="full"
            flexDirection="column"
            {...(activeSection !== null ? expandedMenuStyle : null)}
            transition="min-height 0.5s"
            position="absolute"
            overflow="hidden"
            minW="250px"
            w="full"
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
                    transition="flex 0.25s, background-color 0.125s, color 0.125s"
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
              flex="1"
              flexShrink="1"
              w="full"
              p="16px"
              display="flex"
              flexWrap="wrap"
              animation={`0.375s ease 0s ${
                Number(lastActiveSection) > Number(activeSection)
                  ? "slide-in-from-right"
                  : "slide-in-from-left"
              }`}
              justifyContent="space-around"
            >
              {navigationData
                .find((item) => item.id === activeSection)
                ?.subCategories.map((subCategory) => (
                  <Box>
                    <Box color="#eee" cursor="pointer">
                      {subCategory.title}
                    </Box>
                    {subCategory.items.map((item) => (
                      <Box
                        color="#113"
                        key={item.id}
                        cursor="pointer"
                        _hover={{ color: "#eee" }}
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
      <Flex w="120px" alignSelf="stretch" align="center">
        <Button>
          <SearchIcon />
        </Button>
      </Flex>
    </HStack>
  );
};

export default Navigation;
