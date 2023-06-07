import { FC, useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { Box, BoxProps, Flex, Input } from "@chakra-ui/react";

import {
  HeartIcon,
  SearchIcon,
  BagIcon,
  CancelIcon,
} from "../../../../../assets/svg";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
  userSearchState,
} from "../../../../../atoms";

import colors from "../../../../../colors";

const SecondBarIcon: FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      rounded="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="2.5rem"
      minW="2.5rem"
      h="2.5rem"
      minH="2.5rem"
      cursor="pointer"
      _hover={{ bg: colors.darkGray }}
      color={colors.black}
      {...rest}
    >
      {children}
    </Box>
  );
};

const CancelButton = () => {
  const setIsBackgroundEffectActive = useSetRecoilState(
    isBackgroundEffectActiveState
  );

  const setIsSearchActive = useSetRecoilState(isSearchActiveState);

  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(1);
  }, []);

  return (
    <Flex align="center" justify="center" w="5rem" h="2rem">
      <Box
        fontSize={`${size}rem`}
        transition="font-size 0.2s"
        transitionTimingFunction="cubic-bezier(0.2, 1, 0.8, 1.2)"
        transitionDelay="0.4s"
        cursor="pointer"
        onClick={() => {
          setIsSearchActive(false);
          setIsBackgroundEffectActive(false);
        }}
        _hover={{ color: colors.lighterBlack }}
      >
        Cancel
      </Box>
    </Flex>
  );
};

const SearchBar = () => {
  const [searchBarHover, setSearchBarHover] = useState(false);

  const [userSearch, setUserSearch] = useRecoilState(userSearchState);

  const setIsBackgroundEffectActive = useSetRecoilState(
    isBackgroundEffectActiveState
  );

  const [isSearchActive, setIsSearchActive] =
    useRecoilState(isSearchActiveState);

  useEffect(() => {
    if (!isSearchActive) setUserSearch("");
  }, [isSearchActive, setUserSearch]);

  return (
    <Flex
      w={isSearchActive ? "full" : "20rem"}
      justify={isSearchActive ? "center" : "end"}
      transition="width 0.2s"
      align="center"
      columnGap="0.5rem"
    >
      <Flex
        bg={searchBarHover ? colors.darkGray : colors.gray}
        rounded="full"
        p="0.125rem"
        h="2.5rem"
        w={isSearchActive ? "41rem" : "11.25rem"}
        id="search-bar"
        align="center"
        onMouseEnter={() => setSearchBarHover(true)}
        onMouseLeave={() => setSearchBarHover(false)}
      >
        <SecondBarIcon
          onClick={() => {
            setIsSearchActive(true);
            setIsBackgroundEffectActive(true);
          }}
          onMouseEnter={() => setSearchBarHover(false)}
          onMouseLeave={() => setSearchBarHover(true)}
        >
          <SearchIcon />
        </SecondBarIcon>
        <Input
          variant="unstyled"
          onChange={(e) => {
            setIsSearchActive(true);
            setIsBackgroundEffectActive(true);
            setUserSearch(e.currentTarget.value);
          }}
          pl="0.25rem"
          pr="0.5rem"
          h="full"
          placeholder="Search"
          _placeholder={{
            color: searchBarHover ? colors.lighterBlack : colors.darkerGray,
          }}
          rounded="full"
          value={userSearch}
        />
        {isSearchActive && (
          <SecondBarIcon
            onMouseEnter={() => setSearchBarHover(false)}
            onMouseLeave={() => setSearchBarHover(true)}
            onClick={() => {
              setIsSearchActive(false);
              setIsBackgroundEffectActive(false);
            }}
          >
            <CancelIcon />
          </SecondBarIcon>
        )}
      </Flex>
      {isSearchActive ? (
        <Box position="absolute" right="2.25rem">
          <CancelButton />
        </Box>
      ) : (
        <>
          <SecondBarIcon>
            <HeartIcon />
          </SecondBarIcon>
          <SecondBarIcon>
            <BagIcon />
          </SecondBarIcon>
        </>
      )}
    </Flex>
  );
};

export default SearchBar;
