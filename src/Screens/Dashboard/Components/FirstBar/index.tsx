import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Flex, HStack, Link, Text } from "@chakra-ui/react";

import colors from "../../../../colors";

import { isSearchActiveState } from "../../../../atoms";

import { Popover } from "../../../../Components";

import { ReactComponent as JordanIcon } from "../../../../assets/svg/jordan.svg";
import { ReactComponent as ConverseIcon } from "../../../../assets/svg/converse.svg";

import { FIRST_BAR_HEIGHT } from "../../../../constants";

import Help from "./Help";

const FirstBar = () => {
  const isSearchActive = useRecoilValue(isSearchActiveState);

  const [isPopoverTriggered, setIsPopoverTriggered] = useState(false);

  return (
    <Box
      bg={colors.gray}
      px="2.25rem"
      h={`${FIRST_BAR_HEIGHT}px`}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      zIndex="3"
      opacity={isSearchActive ? "0" : "1"}
      transition="opacity 0.2s"
    >
      <HStack spacing="0">
        {[
          { key: "jordan", Icon: JordanIcon, onClick: () => {} },
          { key: "converse", Icon: ConverseIcon, onClick: () => {} },
        ].map(({ key, Icon, onClick }) => (
          <Button
            key={key}
            variant="unstyled"
            color={colors.black}
            h="2.25rem"
            w="3rem"
            rounded="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            transition="none"
            onClick={onClick}
            _hover={{ color: colors.lighterBlack }}
          >
            <Box w="1.5rem" h="1.5rem">
              <Icon />
            </Box>
          </Button>
        ))}
      </HStack>
      <HStack spacing="0" h="100%">
        {[
          { text: "Find a Store", onClick: () => {} },
          { text: "Help", onClick: () => {} },
          { text: "Join Us", onClick: () => {} },
          { text: "Sign In", onClick: () => {} },
        ].map(({ text, onClick }, index, arr) => {
          const isHelpLink = text === "Help";

          return (
            <Flex
              key={text}
              h="100%"
              align="center"
              onMouseLeave={
                isHelpLink ? () => setIsPopoverTriggered(false) : undefined
              }
              position="relative"
            >
              <Link
                key={text}
                fontSize="0.75rem"
                color={colors.black}
                _hover={{ color: colors.lighterBlack }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={onClick}
                transition="none"
                p="0 0.75rem"
                onMouseEnter={
                  isHelpLink ? () => setIsPopoverTriggered(true) : undefined
                }
              >
                {text}
              </Link>
              {isHelpLink && (
                <Popover
                  isTriggered={isPopoverTriggered}
                  position="absolute"
                  top="100%"
                  right="0.5rem"
                  bg={colors.white}
                >
                  <Help />
                </Popover>
              )}
              {index < arr.length - 1 ? (
                <Text fontSize="0.75rem">|</Text>
              ) : null}
            </Flex>
          );
        })}
      </HStack>
    </Box>
  );
};

export default FirstBar;
