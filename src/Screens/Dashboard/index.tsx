import { FC, useEffect, useMemo, useState } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  isBackgroundEffectActiveState,
  isSearchActiveState,
} from "../../atoms";

import { SecondBar } from "./Components";
import colors from "../../colors";
import doesMediaUrlWork from "../../utils/doesMediaUrlWork";
import findMediaType from "../../utils/findMediaType";
import { Carousel } from "../../Components";

const URLS = [
  "https://v.ftcdn.net/05/73/48/28/240_F_573482848_v4lvfzewWuHMVJHoZjWff5OgY4eRYbzT_ST.mp4",
  "https://images.pexels.com/photos/326231/pexels-photo-326231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3265460/pexels-photo-3265460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3070989/pexels-photo-3070989.jpeg",
  "https://v.ftcdn.net/05/28/31/08/240_F_528310819_DXHCd0hRGoyNQA32oCUR0N4O7fY5ibES_ST.mp4",
  "https://images.pexels.com/photos/16327878/pexels-photo-16327878/free-photo-of-aerial-photo-of-a-mountain-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/15374845/pexels-photo-15374845/free-photo-of-koala-in-a-tree-in-australian-bush.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const getWorkingUrls: (urls: string[]) => Promise<string[]> = async (urls) => {
  return new Promise((resolve) => {
    const checkedUrls: { fail: string[]; success: string[] } = {
      fail: [],
      success: [],
    };

    urls.forEach(async (url) => {
      const doesUrlWork = await doesMediaUrlWork({
        url,
        type: findMediaType(url),
      });

      doesUrlWork ? checkedUrls.success.push(url) : checkedUrls.fail.push(url);

      if (checkedUrls.fail.length + checkedUrls.success.length === urls.length)
        resolve(checkedUrls.success);
    });
  });
};

const useWorkingUrls = (urls: string[]) => {
  const [workingUrls, setWorkingUrls] = useState<string[] | null>(null);

  useEffect(() => {
    const asyncFn = async () => {
      const lWorkingUrls = await getWorkingUrls(urls);

      setWorkingUrls(lWorkingUrls);
    };

    void asyncFn();
  }, [urls]);

  return { urls: workingUrls };
};

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
