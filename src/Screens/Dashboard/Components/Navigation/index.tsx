import { Box, Button, Flex, Input, Spacer } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { navigationData } from "../../../../mockData";

import { SearchIcon } from "../../../../assets/svg";

import colors from "../../../../colors";

import { isSearchActiveState } from "../../../../atoms";

import "./slide.css";

const SearchBar = () => {
  const ref = useRef<null | HTMLInputElement>(null);

  const [isActive, setIsActive] = useRecoilState(isSearchActiveState);

  const [isButtonActive, setIsButtonActive] = useState(false);

  return (
    <Flex
      rounded="full"
      w="64px"
      h="40px"
      _hover={{
        w: isActive ? "80%" : "80px",
        h: "42px",
      }}
      transition="width 0.2s, height 0.25s"
      position="relative"
      borderColor={colors.lightBlack} // NOTE - to be inherited by .search-bar-border
      overflow="hidden"
      align="center"
      onMouseLeave={() => {
        setIsActive(false);

        ref.current?.blur();
      }}
      onClick={() => {
        if (!isActive) {
          setIsActive(true);

          ref.current?.focus();
        }
      }}
    >
      <Box
        position="absolute"
        w="full"
        h="full"
        border="solid"
        rounded="full"
        borderColor={isButtonActive ? colors.lightBlack : colors.black}
      />
      <Flex flex="1" justify="center">
        <Input
          variant="unstyled"
          placeholder="Write here..."
          ref={ref}
          fontSize="14px"
          display="block"
          w="calc(100% - 25px)"
        />
      </Flex>
      <Button
        maxW="80px"
        minW="64px"
        _hover={{
          minWidth: "80px",
          bg: colors.lightBlack,
        }}
        w="full"
        h="full"
        flex="1"
        flexShrink="0"
        onMouseEnter={() => {
          setIsButtonActive(true);
        }}
        onMouseLeave={() => {
          setIsButtonActive(false);
        }}
        py="8px"
        px={["8px", null, "16px"]}
        transition="min-width 0.25s, padding 0.25s"
      >
        <SearchIcon />
      </Button>
    </Flex>
  );
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lastActiveSection, setLastActiveSection] = useState<number | null>(
    null
  );

  const isSearchActive = useRecoilValue(isSearchActiveState);

  return (
    <Flex justifyContent="space-evenly" h="50px">
      <Spacer
        flex={["0", null, null, activeSection ? "1" : "2"]}
        transition="flex 0.25s"
      />
      <Box
        flex={[
          isSearchActive ? "0" : activeSection ? "7" : "6",
          null,
          activeSection ? "7" : "6",
        ]}
        opacity={[isSearchActive ? "0" : "1", null, "1"]}
        transition="flex 0.25s, opacity 0.25s"
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
        transition="opacity 0.125s, flex 0.25s, padding 0.25s"
      >
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Navigation;
