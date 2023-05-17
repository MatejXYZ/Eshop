import {
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

import colors from "../colors";

import { RightRoundedIcon, LeftRoundedIcon } from "../assets/svg";
import Title from "./Title";

type CarouselItem = {
  id: number;
  img: string;
  title: string;
};

type CarouselProps = {
  data: CarouselItem[];
  itemWidth?: number;
  title?: string;
};

const Carousel: FC<CarouselProps> = ({
  data: initialItems,
  itemWidth = 520,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [startingX, setStartingX] = useState(0);

  const [endingX, setEndingX] = useState(itemWidth);

  const [x, setX] = useState(itemWidth);

  const [animatedX, setAnimatedX] = useState(0);

  const [currentItem, setCurrentItem] = useState(initialItems.length);

  const [movementXAfterMouseDown, setMovementXAfterMouseDown] = useState({
    highest: 0,
    count: 0,
  });

  const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);

    setMovementXAfterMouseDown({ highest: 0, count: 0 });

    setStartingX(e.screenX);
  }, []);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isDragging) {
        setMovementXAfterMouseDown((prev) => ({
          highest:
            Math.abs(e.movementX) > Math.abs(prev.highest)
              ? e.movementX
              : prev.highest,
          count: prev.count + 1,
        }));

        setX(endingX + e.screenX - startingX);
      }
    },
    [endingX, isDragging, startingX]
  );

  const [carouselItems, setCarouselItems] = useState(initialItems);

  type EndDragParams =
    | { initial?: boolean; container?: DOMRect; slide?: "left" | "right" }
    | undefined;

  const endDrag = useCallback(
    (props: EndDragParams) => {
      let { initial, container, slide } = props ?? {};

      if (initial || isDragging || slide) {
        let newX = 0;

        let offsetX = 0;

        container = container || containerRef.current?.getBoundingClientRect();

        if (container) {
          const containerMiddle = container.width / 2;

          if (
            slide ||
            (Math.abs(movementXAfterMouseDown.highest) > 5 &&
              movementXAfterMouseDown.count < 10)
          ) {
            const direction = slide
              ? slide === "left"
                ? -1
                : 1
              : movementXAfterMouseDown.highest > 0
              ? -1
              : 1;

            const targetIndex =
              carouselItems.findIndex((item) => item.id === currentItem) +
              direction;

            newX = containerMiddle - targetIndex * itemWidth - itemWidth / 2;

            setCurrentItem(carouselItems[targetIndex].id);
          } else {
            let targetMiddle = itemWidth / 2;
            let targetIndex = 0;

            for (let i = 1; i < carouselItems.length; i++) {
              const currentTargetMiddle = itemWidth * i + itemWidth / 2;

              if (
                Math.abs(
                  currentTargetMiddle + x + animatedX - containerMiddle
                ) < Math.abs(targetMiddle + x + animatedX - containerMiddle)
              ) {
                targetMiddle = currentTargetMiddle;
                targetIndex = i;
              }
            }

            setCurrentItem(carouselItems[targetIndex].id);

            newX = containerMiddle - targetMiddle;
          }

          if (currentItem > carouselItems.slice(-initialItems.length)[0].id) {
            let newItems: CarouselItem[] = [];

            const lastId = carouselItems[carouselItems.length - 1].id;

            initialItems.forEach((item, index) => {
              newItems.push({
                ...item,
                id: lastId + index + 1,
              });
            });

            setCarouselItems([...carouselItems, ...newItems]);
          }

          if (currentItem <= carouselItems[0].id + initialItems.length) {
            let newItems: CarouselItem[] = [];

            const firstId = carouselItems[0].id;

            initialItems.forEach((item, index, arr) => {
              newItems.push({
                ...item,
                id: firstId + index - arr.length,
              });
            });

            setCarouselItems([...newItems, ...carouselItems]);

            offsetX = -initialItems.length * itemWidth;
          }

          setX(x + offsetX);
          setEndingX(x + offsetX);
          setAnimatedX(newX - x);
        }

        setIsDragging(false);
      }
    },
    [
      animatedX,
      carouselItems,
      currentItem,
      initialItems,
      isDragging,
      itemWidth,
      movementXAfterMouseDown.count,
      movementXAfterMouseDown.highest,
      x,
    ]
  );

  const [isPositionInitialized, setIsPositionInitialized] = useState(false);

  useEffect(() => {
    if (!isPositionInitialized) {
      const interval = setInterval(() => {
        const container = containerRef.current?.getBoundingClientRect();

        if (container) {
          endDrag({ initial: true, container });

          setIsPositionInitialized(true);

          clearInterval(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [endDrag, isPositionInitialized]);

  return (
    <VStack w="full" align="start" spacing="0.25rem">
      <Title>{title}</Title>
      <Box p="16px 0 12px 0" w="full" position="relative">
        <Box
          position="absolute"
          left="0"
          top="16px"
          h="500px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          width="172px"
        >
          <Box
            bg={colors.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            zIndex="1"
            rounded="full"
            cursor="pointer"
            onClick={() => {
              endDrag({ slide: "left" });
            }}
          >
            <LeftRoundedIcon width={20} height={20} />
          </Box>
        </Box>
        <Box
          position="relative"
          overflow="hidden"
          ref={containerRef}
          w="full"
          h="540px"
          cursor="pointer"
        >
          <Flex transform={`translateX(${x}px)`} h="full">
            <Flex
              onMouseDown={onMouseDown}
              onMouseMove={onMove}
              onMouseUp={() => endDrag({})}
              position="absolute"
              transform={`translateX(${animatedX}px)`}
              userSelect="none"
              transition={"transform 0.25s ease-out"}
              h="full"
            >
              {carouselItems.map(({ id, title, img }, index) => {
                const isActive = id === currentItem;

                return (
                  <Flex
                    key={id}
                    direction="column"
                    px="10px"
                    w={`${itemWidth}px`}
                    minW={`${itemWidth}px`}
                    maxW={`${itemWidth}px`}
                    h="full"
                  >
                    <Flex
                      flex="1"
                      bg={`url("${img}")`}
                      position="relative"
                      bgSize="cover"
                    >
                      <Box
                        position="absolute"
                        right="46px"
                        top="50px"
                        p="0.4rem 1rem"
                        bg={colors.black + "6"}
                        color={colors.white}
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity={isActive ? 1 : 0}
                        transition={isActive ? "none" : "opacity 0.2s ease"}
                      >
                        {`${(index % initialItems.length) + 1}/${
                          initialItems.length
                        }`}
                      </Box>
                    </Flex>
                    <Flex h="40px" align="end">
                      <Box
                        transition={
                          isActive ? "opacity 0.3s ease 0.3s" : "none"
                        }
                        color={colors.lighterBlack}
                        opacity={isActive ? 1 : 0}
                      >
                        {title}
                      </Box>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Box>
        <Box
          position="absolute"
          right="0"
          top="16px"
          h="500px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          width="172px"
        >
          <Box
            bg={colors.white}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="40px"
            h="40px"
            zIndex="1"
            rounded="full"
            cursor="pointer"
            onClick={() => {
              endDrag({ slide: "right" });
            }}
          >
            <RightRoundedIcon width={20} height={20} />
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default Carousel;
