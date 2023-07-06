import { FC } from "react";
import { useRecoilState } from "recoil";
import { Box } from "@chakra-ui/react";

import { isBackgroundEffectActiveState } from "../../../atoms";

type BackgroundEffectProps = {
  callback?: () => void;
};

const BackgroundEffect: FC<BackgroundEffectProps> = ({ callback }) => {
  const [isActive, setIsActive] = useRecoilState(isBackgroundEffectActiveState);

  return (
    <Box
      backdropFilter={isActive ? "blur(0.25rem) brightness(0.75)" : "none"}
      transition={isActive ? "backdrop-filter 1s" : "backdrop-filter 0.5s"}
      zIndex={isActive ? "1" : "-1"}
      position="absolute"
      w="100%"
      h="100%"
      onClick={() => {
        setIsActive(false);

        callback?.();
      }}
      top="0"
      left="0"
    />
  );
};

export default BackgroundEffect;
