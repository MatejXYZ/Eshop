import { FC, useMemo } from "react";
import { BoxProps, Flex } from "@chakra-ui/react";

import { LeftIcon } from "../../assets/svg";

export enum Orientation {
  left,
  right,
}

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
    const width = carouselItemWidth / 8;

    if (width > 75) return 75;
    else if (width < 35) return 35;

    return width;
  }, [carouselItemWidth]);

  const margin = width / 2;

  const padding = width / 7;

  return (
    <Flex
      justify="center"
      align="center"
      position="absolute"
      cursor="pointer"
      top={carouselItemWidth / 2 - width / 2}
      zIndex="1"
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
      <LeftIcon />
    </Flex>
  );
};

export default NavigationButton;
