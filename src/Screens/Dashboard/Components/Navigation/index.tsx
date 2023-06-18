import { Box, Flex, HStack } from "@chakra-ui/react";
import { useState } from "react";

import { navigationData } from "../../../../mockData";

import "./slide.css";

const activeMenuButtonStyle = {
  bg: "#555",
  px: "48px",
  color: "#eee",
};

const expandedMenuStyle = {
  minH: "300px",
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  return (
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
      >
        <HStack justify="space-around" spacing="8px" bg="#eee" minH="50px">
          {navigationData.map(({ title, id }) => {
            const isActive = id === activeSection;

            return (
              <Flex
                key={id}
                h="full"
                p="0 32px"
                fontWeight="700"
                color="#113"
                {...(isActive ? activeMenuButtonStyle : null)}
                transition="padding 0.5s"
                onMouseEnter={() => {
                  setActiveSection(id);

                  setLastActiveSection(activeSection);
                }}
                align="center"
                cursor="pointer"
              >
                {title}
              </Flex>
            );
          })}
        </HStack>
        <Box flex="1" flexShrink="1" w="full" p="16px">
          <HStack
            key={activeSection}
            justify="space-around"
            align="start"
            animation={`0.25s ease 0s ${
              Number(lastActiveSection) > Number(activeSection)
                ? "slide-in-from-right"
                : "slide-in-from-left"
            }`}
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
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navigation;
