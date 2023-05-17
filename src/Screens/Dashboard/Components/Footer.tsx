import { Box, HStack, VStack, chakra, Flex, Grid } from "@chakra-ui/react";
import { useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  LocationIcon,
} from "../../../assets/svg";

import colors from "../../../colors";

const data = {
  leftMenu: [
    "GIFT CARDS",
    "FIND A STORE",
    "NIKE JOURNAL",
    "BECOME A MEMBER",
    "FEEDBACK",
    "PROMO CODES",
  ],
  middleMenu: [
    {
      title: "GET HELP",
      items: [
        "Order Status",
        "Shipping and Delivery",
        "Returns",
        "Payment Options",
        "Contact Us",
      ],
    },
    {
      title: "ABOUT NIKE",
      items: ["News", "Careers", "Investors", "Sustainability"],
    },
    {
      title: "JOIN US",
      items: ["Nike App", "Nike Run Club", "Nike Training Club", "SNKRS"],
    },
  ],
  bottomMenu: [
    "Guides",
    "Terms of Use",
    "Terms of Sale",
    "Company Details",
    "Privacy & Cookie Policy",
    "Cookie Settings",
  ],
  popUp: [
    "Nike Adapt",
    "Nike FlyEase",
    "Nike Free",
    "Nike Vaporfly",
    "Nike Fan Gear",
    "Nike Air",
    "Nike Flyknit",
    "Nike Pegasus",
    "Nike Zoom Fly",
    "Nike Factory Store",
    "Nike Air Max",
    "Nike Flyleather",
    "Nike React",
    "Nike ZoomX",
    "Nike Airtopia",
  ],
} as const;

const Footer = () => {
  const [showGuidePopup, setShowGuidePopup] = useState(false);

  return (
    <VStack
      w="full"
      bg={colors.black}
      color={colors.lightestBlack}
      fontSize="0.75rem"
      p="3rem 16.5rem 0.75rem 16.5rem"
      spacing="3rem"
    >
      <Flex w="full" justify="space-between" align="start">
        <HStack spacing="0.625rem" align="start">
          <VStack align="flex-start" spacing="1.25rem" width="15.625rem">
            {data.leftMenu.map((item) => (
              <Box
                key={item}
                textTransform="capitalize"
                color={colors.white}
                fontSize="0.875rem"
                lineHeight="0.875rem"
                fontFamily="'Anton'"
                cursor="pointer"
              >
                {item}
              </Box>
            ))}
          </VStack>
          <HStack spacing="0.625rem" align="start">
            {data.middleMenu.map(({ title, items }) => (
              <VStack
                key={title}
                align="flex-start"
                spacing="1.25rem"
                width="15.625rem"
              >
                <Box
                  textTransform="capitalize"
                  color={colors.white}
                  fontSize="0.875rem"
                  lineHeight="0.875rem"
                  fontFamily="'Anton'"
                  cursor="pointer"
                >
                  {title}
                </Box>
                <VStack align="flex-start" spacing="1.25rem">
                  {items.map((item) => (
                    <Box
                      key={item}
                      lineHeight="0.75rem"
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
          </HStack>
        </HStack>
        <HStack spacing="0.875rem">
          {[TwitterIcon, FacebookIcon, YouTubeIcon, InstagramIcon].map(
            (Icon) => (
              <Box
                transition="color 0.175s"
                _hover={{ color: colors.white }}
                cursor="pointer"
              >
                {<Icon />}
              </Box>
            )
          )}
        </HStack>
      </Flex>
      <Flex justify="space-between" w="full">
        <HStack spacing="1.5rem">
          <HStack style={{ padding: 0 }} color={colors.white} cursor="pointer">
            <LocationIcon />
            <chakra.span lineHeight="0.75rem">United Kingdom</chakra.span>
          </HStack>
          <Box>© 2023 Nike, Inc. All Rights Reserved</Box>
        </HStack>
        <HStack spacing="1.75rem" position="relative">
          {showGuidePopup && (
            <Grid
              onMouseLeave={() => {
                setShowGuidePopup(false);
              }}
              border={`solid ${colors.white}`}
              position="absolute"
              right="0"
              bottom="0"
              bg={colors.black}
              p="1.5rem"
              gridTemplateColumns="1fr 1fr 1fr"
              w="42.5rem"
              rowGap="1rem"
            >
              {data.popUp.map((item) => (
                <Box
                  fontSize="0.75rem"
                  lineHeight="0.75rem"
                  key={item}
                  cursor="pointer"
                  _hover={{
                    color: colors.white,
                  }}
                >
                  {item}
                </Box>
              ))}
            </Grid>
          )}
          {data.bottomMenu.map((item) => (
            <Box
              cursor="pointer"
              _hover={{
                color: colors.white,
              }}
              key={item}
              onMouseEnter={() => {
                if (item === "Guides") setShowGuidePopup(true);
              }}
            >
              {item}
            </Box>
          ))}
        </HStack>
      </Flex>
    </VStack>
  );
};

export default Footer;
