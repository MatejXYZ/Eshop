import { useState, useEffect, FC, useMemo } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Box, Flex, Button, BoxProps } from "@chakra-ui/react";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../../../atoms";

import colors from "../../../../colors";

import { menuData } from "../../../../data";

import { LogoIcon } from "../../../../assets/svg";

import { SearchBar, SearchResults } from "./Components";

import { NAVIGATION_HEIGHT } from "../../../../constants";

const height = `${NAVIGATION_HEIGHT}px`;

const Logo: FC<BoxProps> = () => (
  <Flex flex="1" justify="start" h={height}>
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
);

const NavigationButton: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Flex
      cursor="pointer"
      color={colors.black}
      px="0.75rem"
      alignItems="center"
      justifyContent="center"
      position="relative"
      role="group"
      fontWeight="bold"
      {...rest}
    >
      {children}
    </Flex>
  );
};

const Navigation = () => {
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

  const MenuButtonList = () => (
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
          <NavigationButton
            key={key}
            bg={
              key === menuContentKey && isMenuHovered
                ? colors.lightBlack
                : "transparent"
            }
            color={
              key === menuContentKey && isMenuHovered
                ? colors.white
                : colors.black
            }
            onMouseEnter={() => {
              setDisableEffects(true);

              setTimeout(() => {
                setDisableEffects(false);
              }, 50);

              setMenuContentKey(key);
            }}
          >
            {title}
          </NavigationButton>
        );
      })}
    </Flex>
  );

  const menuContent = useMemo(
    () => (
      <Box
        bg={colors.lightBlack}
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
              ? "translateY(1rem)"
              : "translateY(0)"
          }
          opacity={!disableEffects && isMenuHovered ? "1" : "0"}
          transition={
            disableEffects
              ? "none"
              : "transform 0.2s ease-out, opacity 0.2s ease-in"
          }
          justify="center"
          p="2rem"
        >
          {menuData[menuContentKey]?.items.map((item) => (
            <Box key={item.title} fontSize="1rem" w="14rem">
              <Box cursor="pointer" pb="1.125rem" color={colors.white}>
                {item.title}
              </Box>
              {item.items.map((subItem) => (
                <Box
                  key={subItem}
                  color={colors.black}
                  _hover={{ color: colors.white }}
                  cursor="pointer"
                  pb="0.25rem"
                  fontWeight="bold"
                  transition="color 0.15s ease"
                >
                  {subItem}
                </Box>
              ))}
            </Box>
          ))}
        </Flex>
      </Box>
    ),
    [disableEffects, isMenuHovered, menuContentKey]
  );

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
          <Logo
            position={isSearchActive ? "absolute" : "relative"}
            left={isSearchActive ? "2rem" : "0"}
          />
          {!isSearchActive && <MenuButtonList />}
          <Flex flex="1" justify="end">
            <SearchBar />
          </Flex>
        </Flex>
        {isSearchActive && <SearchResults />}
        {menuContent}
      </Flex>
      <Box h={height} />
    </>
  );
};

export default Navigation;
