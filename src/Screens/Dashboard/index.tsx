import { FC, useMemo } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../atoms";

import { SecondBar } from "./Components";

import colors from "../../colors";

import { Carousel } from "../../Components";

import { useWorkingUrls } from "../../hooks";

import { URLS } from "../../constants/carousel";

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

  const { urls } = useWorkingUrls(URLS);

  const urlItems = useMemo(
    () => urls?.map((item, index) => ({ id: index, url: item })) ?? [],
    [urls]
  );

  return (
    <Box w="100vw" h="100vh" overflow="hidden auto">
      <BackgroundEffect
        callback={() => {
          setIsSearchActive(false);
          setIsBackgroundEffectActive(false);
        }}
      />
      <Box position="relative">
        <SecondBar />
        <Box w="full" h="3rem" bg={colors.gray} />
        <Flex p="0 40%" justifyContent="center">
          {urlItems.length ? (
            <Carousel items={urlItems} isCentered displayNavigationButtons />
          ) : (
            <Spinner />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Dashboard;
