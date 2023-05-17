import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

import colors from "../../colors";

const variantRound = defineStyle((props) => {
  const { colorScheme: c } = props;

  const colorStyle =
    c === "white"
      ? {
          bg: colors.white,
          color: colors.black,
          _hover: {
            bg: colors.darkWhite,
            _disabled: {
              bg: colors.white,
            },
          },
        }
      : {
          bg: colors.black,
          color: colors.white,
          _hover: {
            bg: colors.lighterBlack,
            _disabled: {
              bg: colors.black,
            },
          },
        };

  return {
    borderRadius: "full",
    h: "2.375rem",
    fontWeight: "normal",
    px: "1.25rem",
    transition: "none",
    ...colorStyle,
  };
});

const buttonTheme = defineStyleConfig({
  variants: {
    round: variantRound,
  },
  defaultProps: {
    variant: "round",
  },
});

export default buttonTheme;
