import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Box, Flex, Button } from "@chakra-ui/react";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../../../atoms";

import colors from "../../../../colors";

import { menuData } from "../../../../data";

import { LogoIcon } from "../../../../assets/svg";

import { SearchBar, SearchResults } from "./Components";

import { SECOND_BAR_HEIGHT } from "../../../../constants";

const height = `${SECOND_BAR_HEIGHT}px`;

const SecondBar = () => {
  const setIsBackgroundEffectActive = useSetRecoilState(
    isBackgroundEffectActiveState
  );

  const isSearchActive = useRecoilValue(isSearchActiveState);

  const [isMenuHovered, setIsMenuHovered] = useState(false);

  const [disableEffects, setDisableEffects] = useState(false);

  const [menuContentKey, setMenuContentKey] = useState("");

  const [mouseOverBar, setMouseOverBar] = useState(false);

  const [mouseOverMenu, setMouseOverMenu] = useState(false);

  useEffect(() => {
    if (!(mouseOverBar || mouseOverMenu)) {
      setIsMenuHovered(false);
      setIsBackgroundEffectActive(false);
    } else {
      setIsMenuHovered(true);
      setIsBackgroundEffectActive(true);
    }
  }, [mouseOverBar, mouseOverMenu, setIsBackgroundEffectActive]);

  return (
    <>
      <Flex
        bg={colors.white}
        w="full"
        maxH={isSearchActive ? "none" : isMenuHovered ? "30rem" : height}
        minH={isMenuHovered || isSearchActive ? "20rem" : height}
        direction="column"
        overflow="hidden"
        zIndex={isSearchActive ? "4" : "2"}
        position="fixed"
        transition="max-height, min-height, transform"
        transitionDuration={
          isSearchActive ? "0s, 0s, 0.2s" : "0.2s, 0.2s, 0.2s"
        }
        transitionDelay={isSearchActive ? "0s, 0s, 0.2s" : "0s, 0s, 0s"}
      >
        <Flex h={height} minH={height} px="2.25rem">
          <Flex
            flex="1"
            justify="start"
            position={isSearchActive ? "absolute" : "relative"}
            left={isSearchActive ? "2rem" : "0"}
            h={height}
          >
            <Button
              variant="unstyled"
              color={colors.black}
              rounded="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              transition="none"
              onClick={() => {}}
              _hover={{ color: colors.lighterBlack }}
              h="100%"
            >
              <Box w="5rem" h="5rem">
                <LogoIcon />
              </Box>
            </Button>
          </Flex>
          {!isSearchActive && (
            <Flex
              onMouseEnter={() => {
                setMouseOverBar(true);
              }}
              onMouseLeave={() => {
                setMouseOverBar(false);
              }}
            >
              {Object.entries(menuData).map(([key, { title }]) => {
                return (
                  <Flex
                    key={key}
                    onMouseEnter={() => {
                      setDisableEffects(true);

                      setTimeout(() => {
                        setDisableEffects(false);
                      }, 50);

                      setMenuContentKey(key);
                    }}
                    cursor="pointer"
                    color={colors.black}
                    px="0.75rem"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    role="group"
                  >
                    <Flex
                      h="80%"
                      w="100%"
                      borderBottom="2px solid"
                      borderBottomColor={
                        key === menuContentKey && isMenuHovered
                          ? colors.black
                          : "transparent"
                      }
                      position="absolute"
                    />
                    {title}
                  </Flex>
                );
              })}
            </Flex>
          )}
          <Flex flex="1" justify="end">
            <SearchBar />
          </Flex>
        </Flex>
        {isSearchActive && <SearchResults />}
        {isMenuHovered && (
          <Box
            onMouseEnter={() => {
              setMouseOverMenu(true);
            }}
            onMouseLeave={() => {
              setMouseOverMenu(false);
            }}
            flex="1"
            pb="2rem"
          >
            <Flex
              transform={
                !disableEffects && isMenuHovered
                  ? "translateY(0.5rem)"
                  : "translateY(0)"
              }
              opacity={!disableEffects && isMenuHovered ? "1" : "0"}
              transition={
                disableEffects
                  ? "none"
                  : "transform 0.2s ease-out 0.1s, opacity 0.2s ease-in 0.1s"
              }
              justify="center"
              p="2rem"
            >
              {menuData[menuContentKey]?.items.map((item) => (
                <Box key={item.title} fontSize="1rem" w="14rem">
                  <Box cursor="pointer" pb="1.125rem">
                    {item.title}
                  </Box>
                  {item.items.map((subItem) => (
                    <Box
                      key={subItem}
                      fontSize="0.875rem"
                      color={colors.lighterBlack}
                      _hover={{ color: colors.black }}
                      cursor="pointer"
                      pb="0.25rem"
                    >
                      {subItem}
                    </Box>
                  ))}
                </Box>
              ))}
            </Flex>
          </Box>
        )}
      </Flex>
      <Box h={height} />
    </>
  );
};

export default SecondBar;
