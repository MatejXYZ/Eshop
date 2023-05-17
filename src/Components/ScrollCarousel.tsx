import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Flex, HStack, VStack } from "@chakra-ui/react";

import colors from "../colors";

import { RightIcon, LeftIcon } from "../assets/svg";

import Title from "./Title";

type ScrollCarouselProps = {
  title: string;
  showNavigationButtons?: boolean;
};

const ScrollCarousel: FC<PropsWithChildren & ScrollCarouselProps> = ({
  children,
  title,
  showNavigationButtons,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [itemWidth, setItemWidth] = useState<number | null>(null);
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);
  const [contentWidth, setContentWidth] = useState<number | null>(null);

  const [contentLength, setContentLength] = useState<number | null>(null);

  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    if (itemWidth && contentWidth && scrollWidth) return;

    const interval = setInterval(() => {
      if (!contentWidth) {
        const scrollElement = scrollRef.current;
        const contentLength = scrollElement?.children.length;

        if (!scrollElement || !contentLength) return;

        setScrollWidth(scrollElement.offsetWidth);
        setContentWidth(scrollElement.scrollWidth);
        setItemWidth(scrollElement.scrollWidth / contentLength);
        setContentLength(scrollElement.children.length);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [contentLength, contentWidth, itemWidth, scrollWidth]);

  const scrollToItem = useCallback(
    (item: number) => {
      if (itemWidth) {
        scrollRef.current?.scrollTo({
          left: item * itemWidth,
          behavior: "smooth",
        });
      }
    },
    [itemWidth]
  );

  useEffect(() => {
    scrollToItem(currentItem);
  }, [currentItem, itemWidth, scrollToItem]);

  const isRightButtonDisabled = useMemo(
    () =>
      (itemWidth &&
        scrollWidth &&
        contentWidth &&
        itemWidth * currentItem + scrollWidth >= contentWidth) ||
      (contentLength && currentItem === contentLength - 1),
    [contentLength, contentWidth, currentItem, itemWidth, scrollWidth]
  );

  return (
    <VStack
      alignSelf="stretch"
      pb="0.75rem"
      spacing="1.25rem"
      sx={{
        ".scrollbar": {
          scrollbarColor: `${colors.lighterBlack} transparent`,
          scrollbarWidth: "thin",
        },
      }}
    >
      <HStack
        justify="space-between"
        alignSelf="stretch"
        h="2.25rem"
        align="flex-start"
      >
        <Title>{title}</Title>
        {showNavigationButtons && (
          <HStack>
            {[
              {
                id: 1,
                Icon: LeftIcon,
                onClick: () => {
                  setCurrentItem((prev) => prev - 1);
                },
                isDisabled: !currentItem,
              },
              {
                id: 2,
                Icon: RightIcon,
                onClick: () => {
                  setCurrentItem((prev) => prev + 1);
                },
                isDisabled: isRightButtonDisabled,
              },
            ].map(({ id, Icon, onClick, isDisabled }) => (
              <Flex
                key={id}
                rounded="full"
                bg={colors.darkGray}
                align="center"
                justify="center"
                w="3rem"
                h="3rem"
                onClick={isDisabled ? undefined : onClick}
                cursor={isDisabled ? "default" : "pointer"}
                opacity={isDisabled ? "0.3" : "1"}
                transition="opacity 0.1s ease 0.3s"
              >
                <Icon />
              </Flex>
            ))}
          </HStack>
        )}
      </HStack>
      <HStack
        w="full"
        overflow="auto hidden"
        pb="2.25rem"
        spacing="0"
        className="scrollbar"
        onMouseUp={() => {
          const scrollLeft = scrollRef.current?.scrollLeft;

          if (typeof scrollLeft === "number" && itemWidth) {
            const newItem = Math.round(scrollLeft / itemWidth);

            if (newItem !== currentItem) setCurrentItem(newItem);
            else scrollToItem(currentItem);
          }
        }}
        ref={scrollRef}
      >
        {children}
      </HStack>
    </VStack>
  );
};

export default ScrollCarousel;
