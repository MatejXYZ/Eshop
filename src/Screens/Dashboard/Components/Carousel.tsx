import { useMemo } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

import { Carousel as DefaultCarousel } from "../../../Components";

import { useWorkingUrls } from "../../../hooks";

import { carouselUrls, getRandomStr } from "../../../mockData";

const Carousel = () => {
  const { urls } = useWorkingUrls(carouselUrls);

  const urlItems = useMemo(
    () =>
      urls?.map((item, index) => ({
        id: index,
        url: item,
        title: getRandomStr(2),
        description: getRandomStr(7),
      })) ?? [],
    [urls]
  );

  return (
    <Flex flexDir="column" align="center">
      {urlItems.length ? (
        <DefaultCarousel
          items={urlItems}
          isCentered
          displayNavigationButtons
          numberOfVisibleItems={1.25}
        />
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};

export default Carousel;
