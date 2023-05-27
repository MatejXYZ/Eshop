import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

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

  const [unanimatedOffset, setUnanimatedOffset] = useState(0);

  const [animatedOffset, setAnimatedOffset] = useState(0);

  const offset = unanimatedOffset + animatedOffset;

  const setOffset = ({
    animated,
    unanimated,
  }: {
    animated: number;
    unanimated: number;
  }) => {
    setAnimatedOffset(animated);

    setUnanimatedOffset(unanimated);
  };

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      let newOffset = e.clientX - initialX;

      if (Math.abs(newOffset) > (items.length - 2) * itemWidth) {
        newOffset = 2 * itemWidth * (newOffset < 0 ? 1 : -1);

        setInitialX(e.clientX - offset);
      }

      setOffset({
        unanimated: newOffset - animatedOffset,
        animated: animatedOffset,
      });
    };

    if (isMouseDown) {
      window.addEventListener("mousemove", onMouseMove);

      return () => window.removeEventListener("mousemove", onMouseMove);
    }
  }, [animatedOffset, initialX, isMouseDown, itemWidth, items.length, offset]);

  useEffect(() => {
    const onMouseUp = (e: globalThis.MouseEvent) => {
      setIsMouseDown(false);

      for (let i = -items.length; i <= items.length; i++) {
        if (offset <= (i + 0.5) * itemWidth) {
          const dragLength = e.clientX - initialX;

          setOffset({
            unanimated: dragLength - animatedOffset,
            animated: animatedOffset - dragLength + i * itemWidth,
          });

          break;
        }
      }
    };

    if (isMouseDown) {
      window.addEventListener("mouseup", onMouseUp);
    }

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, [
    animatedOffset,
    contentWidth,
    initialX,
    isMouseDown,
    itemWidth,
    items.length,
    offset,
  ]);

  return (
    <Flex ref={visibleAreaRef} w="full" overflow="hidden">
      <Flex
        w={`${items.length * itemWidth}px`}
        userSelect="none"
        transition={"transform 0.5s"}
        transform={`translateX(${animatedOffset}px)`}
      >
        {[1, 2, 3].map((content) => (
          <Flex
            key={content}
            w="full"
            transform={`translateX(${unanimatedOffset - 2 * contentWidth}px)`}
            onMouseDown={(e) => {
              setInitialX(e.clientX - offset);

              setIsMouseDown(true);
            }}
          >
            {items.map(({ id, url }) => {
              return (
                <Flex
                  key={id}
                  w={`${itemWidth}px`}
                  h={`${itemWidth}px`}
                  p="0 0.25rem"
                  position="relative"
                >
                  <Box flex="1" id="media-container">
                    <img
                      id={`image-${id}`}
                      src={url}
                      draggable={false}
                      alt=""
                      onError={() => {
                        const video = document.createElement("video");
                        video.autoplay = true;
                        video.loop = true;
                        video.src = url;
                        video.addEventListener("error", () => {});
                        const target = document.getElementById(`image-${id}`);
                        target?.insertAdjacentElement("beforebegin", video);
                        target?.remove();
                      }}
                    />
                  </Box>
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
