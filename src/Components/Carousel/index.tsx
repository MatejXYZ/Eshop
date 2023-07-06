import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

import NavigationButton from "./NavigationButton";

import { Item, Orientation, padItems } from "./utils";

type CarouselProps = {
  items: Item[];
  numberOfVisibleItems?: number;
  isCentered?: boolean;
  displayNavigationButtons?: boolean;
};

const Carousel: FC<CarouselProps> = ({
  items: initialItems,
  numberOfVisibleItems = 1.25,
  isCentered = false,
  displayNavigationButtons,
}) => {
  const items = useMemo(() => padItems(initialItems), [initialItems]);

  const visibleAreaRef = useRef<null | HTMLDivElement>(null);

  const [visibleAreaWidth, setVisibleAreaWidth] = useState(0);

  const itemWidth = useMemo(
    () => visibleAreaWidth / numberOfVisibleItems,
    [numberOfVisibleItems, visibleAreaWidth]
  );

  const initialOffset = isCentered ? (visibleAreaWidth - itemWidth) / 2 : 0;

  const contentWidth = useMemo(
    () => itemWidth * items.length,
    [itemWidth, items.length]
  );

  const [initialX, setInitialX] = useState(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [unanimatedOffset, setUnanimatedOffset] = useState(0);

  const [animatedOffset, setAnimatedOffset] = useState(0);

  const [shortDrag, setShortDrag] = useState<null | {
    count: number;
    value: number;
    direction: Orientation.left | Orientation.right;
  }>({ count: 0, value: 0, direction: Orientation.right });

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

  const slideLeft = useCallback(() => {
    setOffset({
      unanimated: unanimatedOffset,
      animated: animatedOffset + itemWidth,
    });
  }, [animatedOffset, itemWidth, unanimatedOffset]);

  const slideRight = useCallback(() => {
    setOffset({
      unanimated: unanimatedOffset,
      animated: animatedOffset - itemWidth,
    });
  }, [animatedOffset, itemWidth, unanimatedOffset]);

  const checkRowEnding = useCallback(() => {
    if (!isMouseDown && Math.abs(offset) > (items.length - 2) * itemWidth) {
      setOffset({
        unanimated: (offset < 0 ? 1 : -1) * itemWidth - animatedOffset,
        animated: animatedOffset,
      });
    }
  }, [animatedOffset, isMouseDown, itemWidth, items.length, offset]);

  const recordShortDrag = useCallback(
    ({ movementX }: { movementX: number }) => {
      setShortDrag((prev) => {
        const lMovementX = Math.abs(movementX);

        if (
          prev &&
          prev.value + lMovementX < itemWidth / 2 &&
          prev.count < itemWidth / 10
        ) {
          if (lMovementX < 1) return prev;

          return {
            count: prev.count + 1,
            value: prev.value + lMovementX,
            direction: movementX > 0 ? Orientation.left : Orientation.right,
          };
        }

        return null;
      });
    },
    [itemWidth]
  );

  useEffect(() => {
    if (visibleAreaRef.current) {
      const observer = new ResizeObserver(([res]) => {
        setVisibleAreaWidth(res.contentRect.width);
      });

      observer.observe(visibleAreaRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    checkRowEnding();
  }, [checkRowEnding]);

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      recordShortDrag({ movementX: e.movementX });

      let newOffset = e.clientX - initialX; // drag length

      // if near end of row, skip back to beginning
      if (Math.abs(newOffset) > (items.length - 2) * itemWidth) {
        newOffset = 2 * itemWidth * (newOffset < 0 ? 1 : -1);

        setInitialX(e.clientX - newOffset);
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
  }, [
    animatedOffset,
    initialX,
    isMouseDown,
    itemWidth,
    items.length,
    offset,
    recordShortDrag,
  ]);

  useEffect(() => {
    const onMouseUp = (e: globalThis.MouseEvent) => {
      if (e.button !== 0) return;

      let newOffset = offset;

      setIsMouseDown(false);

      setShortDrag({ count: 0, value: 0, direction: Orientation.right });

      if (shortDrag?.value) {
        // slide offset by one space
        newOffset =
          shortDrag.direction === Orientation.right
            ? offset - itemWidth
            : offset + itemWidth;
      }

      // loop through item positions to find the closest one
      for (let i = -items.length; i <= items.length; i++) {
        if (newOffset <= (i + 0.5) * itemWidth) {
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
    shortDrag,
    offset,
  ]);

  // handle touch

  const [isTouching, setIsTouching] = useState(true);

  const [touchX, setTouchX] = useState(0);

  useEffect(() => {
    const onTouchMove = (e: globalThis.TouchEvent) => {
      const { clientX } = e.touches[0];

      recordShortDrag({ movementX: clientX - touchX });

      setTouchX(clientX);

      let newOffset = clientX - initialX; // drag length

      // if near end of row, skip back to beginning
      if (Math.abs(newOffset) > (items.length - 2) * itemWidth) {
        newOffset = 2 * itemWidth * (newOffset < 0 ? 1 : -1);

        setInitialX(clientX - offset);
      }

      setOffset({
        unanimated: newOffset - animatedOffset,
        animated: animatedOffset,
      });
    };

    if (isTouching) {
      window.addEventListener("touchmove", onTouchMove);
    }

    return () => window.removeEventListener("touchmove", onTouchMove);
  }, [
    animatedOffset,
    initialX,
    isTouching,
    itemWidth,
    items.length,
    offset,
    recordShortDrag,
    touchX,
  ]);

  useEffect(() => {
    const onTouchEnd = (e: globalThis.TouchEvent) => {
      let lInitialX = initialX;

      let newOffset = offset;

      setIsTouching(false);

      setShortDrag({ count: 0, value: 0, direction: Orientation.right });

      if (shortDrag?.value) {
        // slide offset by one space
        newOffset =
          shortDrag.direction === Orientation.right
            ? offset - itemWidth
            : offset + itemWidth;
      }

      // loop through item positions to find the closest one
      for (let i = -items.length; i <= items.length; i++) {
        if (newOffset <= (i + 0.5) * itemWidth) {
          const dragLength = touchX - lInitialX;

          setOffset({
            unanimated: dragLength - animatedOffset,
            animated: animatedOffset - dragLength + i * itemWidth,
          });

          break;
        }
      }
    };

    if (isTouching) {
      window.addEventListener("touchend", onTouchEnd);
    }

    return () => window.removeEventListener("touchend", onTouchEnd);
  }, [
    animatedOffset,
    contentWidth,
    initialX,
    isTouching,
    itemWidth,
    items.length,
    offset,
    shortDrag,
    touchX,
  ]);

  return (
    <Flex ref={visibleAreaRef} w="full" overflow="hidden" position="relative">
      <Flex
        w={`${contentWidth}px`}
        userSelect="none"
        transition={"transform 0.4s ease"}
        transform={`translateX(${animatedOffset}px)`}
      >
        {[1, 2, 3].map((content) => (
          <Flex
            key={content}
            w="full"
            transform={`translateX(${
              unanimatedOffset - 2 * contentWidth + initialOffset
            }px)`}
            onTouchStart={(e) => {
              setInitialX(e.touches[0].clientX - offset);

              setIsTouching(true);
            }}
            onMouseDown={(e) => {
              if (e.button !== 0) return;

              setInitialX(e.clientX - offset);

              setIsMouseDown(true);
            }}
          >
            {items.map(({ id, url, title }) => {
              return (
                <Flex
                  key={id}
                  w={`${itemWidth}px`}
                  p="0 0.25rem"
                  flexDir="column"
                >
                  <Box h={`calc(${itemWidth}px - 0.25rem)`}>
                    <Image
                      id={`image-${id}`}
                      src={url}
                      draggable={false}
                      alt=""
                      h="100%"
                      w="100%"
                      objectFit="cover"
                      onError={() => {
                        const video = document.createElement("video");
                        video.autoplay = true;
                        video.muted = true;
                        video.loop = true;
                        video.src = url;
                        video.addEventListener("error", () => {});
                        video.setAttribute(
                          "style",
                          "object-fit: cover; display: flex; width: 100%; height: 100%;"
                        );
                        const target = document.getElementById(`image-${id}`);
                        target?.insertAdjacentElement("beforebegin", video);
                        target?.remove();
                      }}
                    />
                  </Box>
                  <Box wordBreak="break-all" noOfLines={5}>
                    {title}
                  </Box>
                </Flex>
              );
            })}
          </Flex>
        ))}
      </Flex>
      {!!displayNavigationButtons && (
        <>
          <NavigationButton
            carouselItemWidth={itemWidth}
            orientation={Orientation.left}
            onClick={slideLeft}
          />
          <NavigationButton
            carouselItemWidth={itemWidth}
            orientation={Orientation.right}
            onClick={slideRight}
          />
        </>
      )}
    </Flex>
  );
};

export default Carousel;
