import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";

type Item = {
  id: number;
  url: string;
};

type ResponsiveCarouselProps = { items: Item[] };

const ResponsiveCarousel: FC<ResponsiveCarouselProps> = ({ items }) => {
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

  const itemWidth = useMemo(() => visibleAreaWidth * 0.8, [visibleAreaWidth]);

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

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      const x = e.clientX;

      if (isMouseDown) setOffset(x - initialX);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [initialX, isMouseDown]);

  useEffect(() => {
    const onMouseUp = (e: globalThis.MouseEvent) => {
      setIsMouseDown(false);

      for (let i = -items.length; i <= items.length; i++) {
        if (offset <= (i + 0.5) * itemWidth) {
          if (Math.abs(i) > items.length - 1) setOffset(contentWidth);
          else setOffset(i * itemWidth);
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
        {[1, 2, 3].map((content) => (
          <Flex
            key={content}
            w="full"
            transform={`translateX(${offset + -contentWidth}px)`}
            onMouseDown={(e) => {
              setInitialX(e.clientX - offset);

              setIsMouseDown(true);
            }}
          >
            {items.map((item, index) => {
              return (
                <Flex
                  key={item.id}
                  h="20rem"
                  w={`${itemWidth}px`}
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
