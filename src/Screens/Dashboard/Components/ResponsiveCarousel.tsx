import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";

type Item = {
  id: number;
  url: string;
};

type ResponsiveCarouselProps = {
  items: Item[];
  numberOfVisibleItems?: number;
  isCentered?: boolean;
};

const ResponsiveCarousel: FC<ResponsiveCarouselProps> = ({
  items,
  numberOfVisibleItems = 1.25,
  isCentered = false,
}) => {
  const visibleAreaRef = useRef<null | HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [visibleAreaWidth, setVisibleAreaWidth] = useState(0);

  const itemWidth = useMemo(
    () => visibleAreaWidth / numberOfVisibleItems,
    [numberOfVisibleItems, visibleAreaWidth]
  );

  const contentWidth = useMemo(
    () => itemWidth * items.length,
    [itemWidth, items.length]
  );

  useEffect(() => {
    const lVisibleAreaWidth =
      visibleAreaRef.current?.getBoundingClientRect().width;

    if (lVisibleAreaWidth) setVisibleAreaWidth(lVisibleAreaWidth);
  }, [windowWidth]);

  const [initialX, setInitialX] = useState(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [offset, setOffset] = useState(0);

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      let newOffset = e.clientX - initialX;

      if (newOffset > contentWidth) {
        newOffset = 0;

        setInitialX(e.clientX - offset);
      } else if (newOffset < -contentWidth) {
        newOffset = 0;

        setInitialX(e.clientX - offset);
      }

      setOffset(newOffset);
    };

    if (isMouseDown) {
      window.addEventListener("mousemove", onMouseMove);

      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, [contentWidth, initialX, isMouseDown, offset, visibleAreaWidth]);

  useEffect(() => {
    const onMouseUp = (e: globalThis.MouseEvent) => {
      setIsMouseDown(false);

      setIsAnimated(true);

      for (let i = -items.length - 100; i <= items.length + 100; i++) {
        if (offset <= (i + 0.5) * itemWidth) {
          setOffset(i * itemWidth);

          break;
        }
      }
    };

    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [contentWidth, itemWidth, items.length, offset]);

  return (
    <Flex
      ref={visibleAreaRef}
      outline="solid 5px orange"
      w="full"
      overflow="hidden"
    >
      <Flex
        w={`${items.length * itemWidth}px`}
        userSelect="none"
        outline="solid 3px blue"
      >
        {[1, 2, 3, 4].map((content) => (
          <Flex
            key={content}
            w="full"
            transform={`translateX(${offset - 2 * contentWidth}px)`}
            transition={isAnimated ? "transform 0.5s" : "none"}
            onMouseDown={(e) => {
              setInitialX(e.clientX - offset);

              setIsMouseDown(true);

              setIsAnimated(false);
            }}
          >
            {items.map((item, index) => {
              return (
                <Flex
                  key={item.id}
                  w={`${itemWidth}px`}
                  h={`${itemWidth}px`}
                  p="0 0.25rem"
                >
                  <Flex
                    fontSize="2rem"
                    fontWeight="bold"
                    position="relative"
                    bg={`url("${item.url}")`}
                    backgroundSize="cover"
                    w="full"
                    h="full"
                    align="center"
                    justify="center"
                    color="blue"
                  >
                    {index + 1}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ResponsiveCarousel;
