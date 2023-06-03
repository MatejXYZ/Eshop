import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flex, Image } from "@chakra-ui/react";

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    (e: globalThis.MouseEvent) => {
      setShortDrag((prev) => {
        const lMovementX = Math.abs(e.movementX);

        if (
          prev &&
          prev.value + lMovementX < itemWidth / 2 &&
          prev.count < itemWidth / 10
        ) {
          if (lMovementX < 1) return prev;

          return {
            count: prev.count + 1,
            value: prev.value + lMovementX,
            direction: e.movementX > 0 ? Orientation.left : Orientation.right,
          };
        }

        return null;
      });
    },
    [itemWidth]
  );

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const lVisibleAreaWidth =
      visibleAreaRef.current?.getBoundingClientRect().width;

    if (lVisibleAreaWidth) setVisibleAreaWidth(lVisibleAreaWidth);
  }, [windowWidth]);

  useEffect(() => {
    checkRowEnding();
  }, [checkRowEnding]);

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      recordShortDrag(e);

      let newOffset = e.clientX - initialX; // drag length

      // if near end of row, skip back to beginning
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

      let lInitialX = initialX;

      let newOffset = offset;

      setIsMouseDown(false);

      setShortDrag({ count: 0, value: 0, direction: Orientation.right });

      if (shortDrag?.value) {
        // slide offset by one space
        newOffset =
          shortDrag.direction === Orientation.right
            ? offset - itemWidth
            : offset + itemWidth;

        if (offset > 0 && initialX > contentWidth) lInitialX -= contentWidth;
        else if (offset < 0 && initialX < itemWidth) lInitialX += contentWidth;
      }

      // loop through item positions to find the closest one
      for (let i = -items.length; i <= items.length; i++) {
        if (newOffset <= (i + 0.5) * itemWidth) {
          const dragLength = e.clientX - lInitialX;

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

  return (
    <Flex ref={visibleAreaRef} w="full" overflow="hidden" position="relative">
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
            onMouseDown={(e) => {
              if (e.button !== 0) return;

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
                >
                  <Image
                    id={`image-${id}`}
                    src={url}
                    draggable={false}
                    alt=""
                    objectFit="cover"
                    flex="1"
                    onError={() => {
                      const video = document.createElement("video");
                      video.autoplay = true;
                      video.muted = true;
                      video.loop = true;
                      video.src = url;
                      video.addEventListener("error", () => {});
                      video.setAttribute(
                        "style",
                        "object-fit: cover; display: flex; flex: 1"
                      );
                      const target = document.getElementById(`image-${id}`);
                      target?.insertAdjacentElement("beforebegin", video);
                      target?.remove();
                    }}
                  />
                </Flex>
              );
            })}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Carousel;
