import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { navigationData } from "../../../../mockData";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../../../atoms";

import SearchBar from "./SearchBar";

import "./slide.css";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  const isSearchActive = useRecoilValue(isSearchActiveState);

  const onMouseEnter = useCallback(
    (id: number) => {
      setActiveSection(id);

      setLastActiveSection(activeSection);
    },
    [activeSection]
  );

  const setIsBackgroundEffectActive = useSetRecoilState(
    isBackgroundEffectActiveState
  );

  const onMouseLeave = useCallback(() => {
    setLastActiveSection(activeSection);

    setActiveSection(null);
  }, [activeSection]);

  useEffect(() => {
    setIsBackgroundEffectActive(!!activeSection);
  });

  return (
    <Flex justifyContent="space-evenly" h="50px">
      <Spacer flex={["0", activeSection ? "1" : "2"]} transition="flex 0.25s" />
      <Box
        flex={[
          isSearchActive ? "0" : activeSection ? "7" : "6",
          null,
          activeSection ? "7" : "6",
        ]}
        opacity={[isSearchActive ? "0" : "1", null, "1"]}
        transition="flex 0.25s, opacity 0.25s"
        zIndex={2}
      >
        <Flex justify="center" w="full" h="50px" zIndex={1} position="relative">
          <Flex
            onMouseLeave={onMouseLeave}
            bg="#555"
            flexDirection="column"
            position="absolute"
            overflow="hidden"
            minW={["200px", "250px"]}
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
                    fontSize={["14px", "18px"]}
                    fontWeight="700"
                    transition="flex 0.25s, background-color 0.25s, color 0.25s"
                    onMouseEnter={() => onMouseEnter(id)}
                    onTouchStart={() => {
                      if (isActive) onMouseLeave();
                      else onMouseEnter(id);
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
              minH={activeSection ? "400px" : "0"}
              transition="min-height 0.25s"
            >
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
                gridGap="10px"
              >
                {navigationData
                  .find((item) => item.id === activeSection)
                  ?.subCategories.map((subCategory) => (
                    <Flex flex="1" justify="center">
                      <VStack
                        key={subCategory.id}
                        align="start"
                        spacing={["4px", null, "2px"]}
                        w="fit-content"
                      >
                        <Box
                          color="#eee"
                          cursor="pointer"
                          textTransform="capitalize"
                          fontSize={["14px", "16px"]}
                          whiteSpace="nowrap"
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
                            onClick={onMouseLeave}
                            onTouchStart={onMouseLeave}
                            fontSize={["12px", "14px", "16px"]}
                          >
                            {item.title}
                          </Box>
                        ))}
                      </VStack>
                    </Flex>
                  ))}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Flex
        flex={[activeSection ? "0" : "3", activeSection ? "1" : "3"]}
        opacity={activeSection ? "0" : "1"}
        alignSelf="stretch"
        align="center"
        justify="center"
        overflow="hidden"
        transition="opacity 0.125s, flex 0.25s, padding 0.25s"
      >
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Navigation;
