import { useState, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { Box, Flex, Image, Spinner } from "@chakra-ui/react";

import { userSearchState } from "../../../../../atoms";

import colors from "../../../../../colors";

import { searchResultData } from "../../../../../data";

const POPULAR_SEARCHES = ["Air Force 1", "Jordan", "Air Max", "Blazer"];

const ResultTiles = ({ activeSearchItem }: { activeSearchItem: string }) => {
  const data = searchResultData[activeSearchItem];

  return data ? (
    <Flex columnGap="3rem">
      {data.map(({ image, title, category, price }) => (
        <Flex
          key={`${title}${category}`}
          direction="column"
          fontSize="0.875rem"
          pb="8rem"
        >
          <Image src={image} w="18.75rem" h="24rem" objectFit="cover" />
          <Box>{title}</Box>
          <Box color={colors.lighterBlack}>{category}</Box>
          <Box h="0.5rem" />
          <Box>{price}</Box>
        </Flex>
      ))}
    </Flex>
  ) : null;
};

const SearchResults = () => {
  const [displayResults, setDisplayResults] = useState(false);

  const [userSearch, setUserSearch] = useRecoilState(userSearchState);

  const initialActiveItem = useMemo(
    () =>
      (userSearch?.length > 1 &&
        Object.keys(searchResultData).find((key) =>
          key.includes(userSearch.toLowerCase())
        )) ||
      "",
    [userSearch]
  );

  const [activeSearchItem, setActiveSearchItem] = useState(initialActiveItem);

  useEffect(() => {
    setActiveSearchItem(initialActiveItem);
  }, [initialActiveItem]);

  const isSearchExpanded = !!initialActiveItem;

  useEffect(() => {
    setDisplayResults(true);
  }, []);

  const animationProps = {
    transition: "transform, opacity",
    transitionDuration: "0.3s, 0.3s",
    transitionDelay: displayResults ? "0.4s" : "0s",
    transform: displayResults ? "translateY(0)" : "translateY(-0.5rem)",
    opacity: displayResults ? "1" : "0",
  };

  const [isSearchMockLoaded, setIsSearchMockLoaded] = useState(false);

  useEffect(() => {
    setIsSearchMockLoaded(false);

    if (isSearchExpanded) {
      const timeout = setTimeout(() => {
        setIsSearchMockLoaded(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isSearchExpanded, userSearch, activeSearchItem]);

  return (
    <Flex
      align={isSearchExpanded ? "start" : "center"}
      justify={isSearchExpanded ? "start" : "center"}
      py="0.25rem"
      px="4rem"
    >
      <Flex direction="column" w={isSearchExpanded ? "auto" : "41rem"}>
        <Box
          color={colors.lighterBlack}
          fontSize="1rem"
          py="0.75rem"
          w={isSearchExpanded ? "15rem" : "auto"}
          {...animationProps}
        >
          {isSearchExpanded ? "Top Suggestions" : "Popular Search Terms"}
        </Box>
        <Flex
          direction="column"
          {...animationProps}
          transitionDelay={displayResults ? "0.475s" : "0.25s"}
          rowGap="0.5rem"
        >
          {(isSearchExpanded
            ? Object.keys(searchResultData)
            : POPULAR_SEARCHES
          ).map((item) => {
            let content: string | JSX.Element = item;

            if (isSearchExpanded) {
              const index = item
                .toLowerCase()
                .indexOf(userSearch.toLowerCase());

              if (index !== -1) {
                content = (
                  <Box color={colors.lighterBlack}>
                    {item.slice(0, index)}
                    <Box as="span" color={colors.black}>
                      {item.slice(index, index + userSearch.length)}
                    </Box>
                    {item.slice(index + userSearch.length)}
                  </Box>
                );
              }
            }

            return (
              <Box
                key={item}
                color={isSearchExpanded ? colors.lighterBlack : colors.black}
                _hover={isSearchExpanded ? {} : { color: colors.lightBlack }}
                fontSize="1.25rem"
                cursor="pointer"
                w={isSearchExpanded ? "full" : "fit-content"}
                onMouseEnter={() => {
                  if (isSearchExpanded) {
                    setActiveSearchItem(item);
                  }
                }}
                onClick={() => {
                  if (!isSearchExpanded) {
                    setUserSearch(item);
                  }
                }}
              >
                {content}
              </Box>
            );
          })}
        </Flex>
      </Flex>
      {isSearchExpanded && (
        <Flex>
          {isSearchMockLoaded ? (
            <ResultTiles activeSearchItem={activeSearchItem} />
          ) : (
            <Box p="1rem">
              <Spinner
                size="lg"
                speed="1s"
                color="transparent"
                border="solid 0.125rem black"
                borderBottomColor="transparent"
              />
            </Box>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default SearchResults;
