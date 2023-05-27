import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../atoms";

import { SecondBar, ResponsiveCarousel } from "./Components";
import colors from "../../colors";

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
        <Box display="flex" p="0 45%" justifyContent="center">
          <Box w="full">
            <ResponsiveCarousel
              items={[
                {
                  id: 1,
                  url: "https://v.ftcdn.net/05/73/48/28/240_F_573482848_v4lvfzewWuHMVJHoZjWff5OgY4eRYbzT_ST.mp4",
                },
                {
                  id: 2,
                  url: "https://imagdes.pexels.com/photos/326231/pexels-photo-326231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  id: 3,
                  url: "https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                },
                {
                  id: 4,
                  url: "https://images.pexels.com/photos/3070989/pexels-photo-3070989.jpeg",
                },
              ]}
            />
          </Box>
        </Box>
        {/* TEMP - hidden */}
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
