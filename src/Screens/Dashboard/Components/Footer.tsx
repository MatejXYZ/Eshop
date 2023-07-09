import { Box, VStack, Flex, Wrap, Stack } from "@chakra-ui/react";

import colors from "../../../colors";

import { footerData } from "../../../mockData";

const Footer = () => (
  <Flex
    justify="center"
    bg={colors.darkWhite}
    p={{ base: "24px", xl: "48px" }}
    pb={{ base: "6px", xl: "12px" }}
    color={colors.darkBlue}
    fontSize="12px"
  >
    <VStack spacing="12px" maxW="1000px" align="start">
      <Stack direction={{ base: "column", xl: "row" }}>
        <Flex
          flexWrap={{ base: "wrap", xl: "nowrap" }}
          flexDirection={{ base: "row", xl: "column" }}
          w={{ base: "auto", xl: "240px" }}
          gap={{ base: "10px", xl: "20px" }}
          pb={{ base: "20px", xl: "30px" }}
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
        <Wrap spacing={{ base: "5px", xl: "10px" }}>
          {footerData.middleMenu.map(({ title, items }) => (
            <VStack
              key={title}
              align="flex-start"
              spacing={{ base: "10px", xl: "20px" }}
              w={{ base: "160px", sm: "200px", xl: "240px" }}
              pb={{ base: "10px", xl: "20px" }}
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
              <VStack align="flex-start" spacing={{ base: "4px", xl: "8px" }}>
                {items.map((item) => (
                  <Box
                    key={item}
                    lineHeight="1.25"
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
