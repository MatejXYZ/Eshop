import { FC, MouseEvent, useCallback, useRef } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
  secondBarDisplayState,
} from "../../atoms";

import { SecondBar, FirstCarousel, Footer } from "./Components";

import { FIRST_BAR_HEIGHT } from "../../constants";

type BackgroundEffectProps = {
  callback: () => void;
};

const BackgroundEffect: FC<BackgroundEffectProps> = ({ callback }) => {
  const isActive = useRecoilValue(isBackgroundEffectActiveState);

  return (
    <Box
      backdropFilter={isActive ? "blur(0.25rem) brightness(0.75)" : "none"}
      transition={isActive ? "backdrop-filter 1s" : "backdrop-filter 0.5s"}
      zIndex={isActive ? "1" : "-1"}
      position="absolute"
      w="100%"
      h="100%"
      onClick={callback}
    />
  );
};

const Dashboard = () => {
  const setIsSearchActive = useSetRecoilState(isSearchActiveState);

  const setIsBackgroundEffectActive = useSetRecoilState(
    isBackgroundEffectActiveState
  );

  const setDisplaySecondBar = useSetRecoilState(secondBarDisplayState);

  const ref = useRef<null | HTMLDivElement>(null);

  let lastScrollTop = ref.current?.scrollTop ?? 0;

  const onScroll = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const newScrollTop = e.currentTarget.scrollTop;

      let secondBarDisplay = {
        isFixed: false,
        isVisible: true,
      };

      if (newScrollTop > FIRST_BAR_HEIGHT) {
        secondBarDisplay.isFixed = true;

        if (newScrollTop < lastScrollTop) {
          secondBarDisplay.isVisible = true;
        } else {
          secondBarDisplay.isVisible = false;
        }
      } else {
        secondBarDisplay = {
          isFixed: false,
          isVisible: true,
        };
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      lastScrollTop = newScrollTop;

      setDisplaySecondBar(secondBarDisplay);
    },
    [lastScrollTop, setDisplaySecondBar]
  );

  return (
    <Box
      w="100vw"
      h="100vh"
      overflow="hidden auto"
      onScroll={onScroll}
      ref={ref}
    >
      <BackgroundEffect
        callback={() => {
          setIsSearchActive(false);
          setIsBackgroundEffectActive(false);
        }}
      />
      <Box position="relative">
        <SecondBar />
        <VStack pl="3rem" pr="3.5rem">
          <FirstCarousel />
        </VStack>
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
