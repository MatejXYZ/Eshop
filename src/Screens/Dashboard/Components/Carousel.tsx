import { useMemo } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

import { Carousel as DefaultCarousel } from "../../../Components";

import { useWorkingUrls } from "../../../hooks";

import { URLS } from "../../../constants/carousel";

const Carousel = () => {
  const { urls } = useWorkingUrls(URLS);

  const urlItems = useMemo(
    () =>
      urls?.map((item, index) => ({
        id: index,
        url: item,
        title: index % 2 ? item : undefined,
      })) ?? [],
    [urls]
  );

  return (
    <Flex p="0 0" justifyContent="center">
      {urlItems.length ? (
        <DefaultCarousel items={urlItems} isCentered displayNavigationButtons />
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};

export default Carousel;
