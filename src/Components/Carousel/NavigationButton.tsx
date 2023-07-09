import { FC, useMemo } from "react";
import { BoxProps, Flex } from "@chakra-ui/react";

import { Orientation } from "./utils";

import { LeftIcon } from "../../assets/svg";

type NavigationButtonProps = BoxProps & {
  carouselItemWidth: number;
  orientation: Orientation;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  carouselItemWidth,
  orientation = Orientation.left,
  ...rest
}) => {
  const width = useMemo(() => {
    const lWidth = carouselItemWidth / 7 + 1000 / carouselItemWidth;

    if (lWidth > 75) return 75;
    else if (lWidth < 15) return 15;

    return lWidth;
  }, [carouselItemWidth]);

  const margin = carouselItemWidth / 12 - 1000 / carouselItemWidth;

  const padding = width / 7;

  return (
    <Flex
      justify="center"
      align="center"
      position="absolute"
      cursor="pointer"
      top={carouselItemWidth / 2 - width / 2}
      bg="white"
      rounded="full"
      h={`${width}px`}
      w={`${width}px`}
      p={`${padding}px`}
      {...(orientation === Orientation.left
        ? { left: margin }
        : { right: margin, transform: "rotate(180deg)" })}
      {...rest}
    >
      <LeftIcon style={{ transform: "translateX(-5%)" }} />
    </Flex>
  );
};

export default NavigationButton;
