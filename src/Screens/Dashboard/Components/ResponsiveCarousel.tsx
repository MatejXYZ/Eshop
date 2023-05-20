import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

type Item = {
  id: number;
  url: string;
};

type ResponsiveCarouselProps = { items: Item[] };

const ResponsiveCarousel: FC<ResponsiveCarouselProps> = ({ items }) => {
  const ref = useRef<null | HTMLDivElement>(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [width, setWidth] = useState(0);

  const itemWidth = useMemo(() => width / items.length, [items.length, width]);

  useEffect(() => {
    const lWidth = ref.current?.getBoundingClientRect().width;

    if (lWidth) setWidth(lWidth);
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

      for (let i = -3; i <= 3; i++) {
        if (offset <= (i + 0.5) * itemWidth) {
          if (Math.abs(i) > 2) setOffset(0);
          else setOffset(i * itemWidth);
          break;
        }
      }
    };

    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [itemWidth, offset]);

  return (
    <Flex
      w="full"
      ref={ref}
      userSelect="none"
      outline="solid 3px blue"
      overflow="hidden"
    >
      {[1, 2, 3].map((content) => (
        <Flex
          key={content}
          w="full"
          transform={`translateX(${offset + -width}px)`}
          onMouseDown={(e) => {
            setInitialX(e.clientX - offset);

            setIsMouseDown(true);
          }}
        >
          {items.map((item, index, arr) => {
            const itemWidth = 100 / arr.length;

            return (
              <Flex
                key={item.id}
                h="20rem"
                w={`${width / arr.length}px`}
                p="0 0.25rem"
              >
                <Flex
                  fontSize="2rem"
                  fontWeight="bold"
                  position="relative"
                  color="white"
                  bg={`url("${item.url}")`}
                  backgroundSize="cover"
                  w="full"
                  h="full"
                  align="center"
                  justify="center"
                >
                  {index === Math.floor(arr.length / 2) && (
                    <Box
                      color="red"
                      fontSize="1rem"
                      position="absolute"
                      top="1rem"
                      left="0"
                      width="100%"
                      textAlign="center"
                    >
                      {Math.floor(
                        ref.current?.getBoundingClientRect().width ?? 0
                      )}
                    </Box>
                  )}
                  <Box
                    color="blue"
                    fontSize="1rem"
                    position="absolute"
                    top="2.5rem"
                    left="0"
                    width="100%"
                    textAlign="center"
                  >
                    {index + 1}
                  </Box>
                  {itemWidth.toString(10).slice(0, 4)} %
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};

export default ResponsiveCarousel;
