import { Box, VStack, Flex, Wrap, Stack } from "@chakra-ui/react";

import colors from "../../../colors";

import { footerData } from "../../../mockData";

const Footer = () => (
  <Flex
    justify="center"
    bg={colors.darkWhite}
    p="48px"
    pb="12px"
    color={colors.darkBlue}
    fontSize="12px"
  >
    <VStack spacing="24px" maxW="1000px" align="start">
      <Stack direction={{ base: "column", xl: "row" }}>
        <Flex
          flexWrap={{ base: "wrap", xl: "nowrap" }}
          flexDirection={{ base: "row", xl: "column" }}
          w={{ base: "auto", xl: "240px" }}
          gap="20px"
          pb="40px"
        >
          {footerData.leftMenu.map((item) => (
            <Box
              key={item}
              textTransform="uppercase"
              color={colors.white}
              fontSize="14px"
              lineHeight="1"
              fontFamily="'Anton'"
              cursor="pointer"
            >
              {item}
            </Box>
          ))}
        </Flex>
        <Wrap spacing="10px">
          {footerData.middleMenu.map(({ title, items }) => (
            <VStack
              key={title}
              align="flex-start"
              spacing="20px"
              width={["160px", "240px"]}
              pb="20px"
            >
              <Box
                textTransform="uppercase"
                color={colors.white}
                fontSize="14px"
                lineHeight="1"
                fontFamily="'Anton'"
                cursor="pointer"
              >
                {title}
              </Box>
              <VStack align="flex-start" spacing="20px">
                {items.map((item) => (
                  <Box
                    key={item}
                    lineHeight="1"
                    cursor="pointer"
                    _hover={{
                      color: colors.white,
                    }}
                  >
                    {item}
                  </Box>
                ))}
              </VStack>
            </VStack>
          ))}
        </Wrap>
      </Stack>
      <Wrap spacing={{ base: "10px", xl: "28px" }}>
        {footerData.bottomMenu.map((item) => (
          <Box
            cursor="pointer"
            _hover={{
              color: colors.white,
            }}
            key={item}
          >
            {item}
          </Box>
        ))}
      </Wrap>
    </VStack>
  </Flex>
);

export default Footer;
