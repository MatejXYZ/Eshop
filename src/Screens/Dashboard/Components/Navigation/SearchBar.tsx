import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { SearchIcon } from "../../../../assets/svg";

import colors from "../../../../colors";

import { isSearchActiveState } from "../../../../atoms";

const SearchBar = () => {
  const ref = useRef<null | HTMLInputElement>(null);

  const [isActive, setIsActive] = useRecoilState(isSearchActiveState);

  const [isButtonActive, setIsButtonActive] = useState(false);

  const onMouseLeave = useCallback(() => {
    setIsExpanded(false);

    setIsActive(false);

    ref.current?.blur();
  }, [setIsActive]);

  const onClick = useCallback(() => {
    if (!isActive) {
      setIsActive(true); // BUG - on touch device gets called when closing search-bar

      ref.current?.focus();
    } else onMouseLeave();
  }, [isActive, onMouseLeave, setIsActive]);

  const [isExpanded, setIsExpanded] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsExpanded(true);
  }, []);

  return (
    <Flex
      rounded="full"
      w="64px"
      h="40px"
      {...(isExpanded
        ? {
            w: isActive ? { base: "90%", xl: "80%" } : "80px",
            h: "42px",
          }
        : null)}
      transition="width 0.2s, height 0.25s"
      position="relative"
      borderColor={colors.gray} // NOTE - to be inherited by .search-bar-border
      overflow="hidden"
      align="center"
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onTouchStart={onMouseEnter}
    >
      <Box
        position="absolute"
        w="full"
        h="full"
        border="solid"
        rounded="full"
        borderColor={isButtonActive ? colors.gray : colors.black}
      />
      <Flex flex="1" justify="center">
        <Input
          variant="unstyled"
          placeholder="Write here..."
          ref={ref}
          fontSize="14px"
          display="block"
          w="calc(100% - 25px)"
          onBlur={onMouseLeave} // NOTE - gets called twice if using mouse
        />
      </Flex>
      <Button
        maxW="80px"
        minW="64px"
        _hover={{
          minWidth: "80px",
          bg: colors.gray,
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
        onClick={onClick}
      >
        <SearchIcon />
      </Button>
    </Flex>
  );
};

export default SearchBar;
