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
            bg: colors.lightGray,
            _disabled: {
              bg: colors.black,
            },
          },
        };

  return {
    borderRadius: "full",
    h: ["1.5rem", "2rem", "2.5rem"],
    fontWeight: "normal",
    px: ["0.25rem", "0.5rem", "1.25rem", null, "1.5rem"],
    py: ["0.25rem", "0.5rem", "0.325rem"],
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
