import { FC, useEffect, useState } from "react";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";

import colors from "../../../colors";

const sliderData = [
  {
    title: "Buy 2 or More, Get 25% Off",
    description:
      "Nike Members, use code MEMBER23 at checkout. On selected fleece styles.*",
    links: [{ text: "Shop" }, { text: "Promo Terms", asterisk: true }],
  },
  {
    title: "Student Discount",
    description: "10% off for students.",
    links: [{ text: "Discover" }],
  },
  {
    title: "Free Delivery & Returns",
    description: "Nike Members get free delivery and free 30-day returns.",
    links: [{ text: "Learn More" }, { text: "Join Us" }],
  },
];

type SliderContentProps = {
  title: string;
  description: string;
  links: { text: string; asterisk?: boolean }[];
};

const SliderItem: FC<SliderContentProps> = ({ title, description, links }) => (
  <Flex flex="1" flexDir="column" align="center" justify="center">
    <Heading lineHeight="1.5rem" fontSize="1rem" fontWeight="500">
      {title}
    </Heading>
    <Text fontSize="0.75rem">
      {description}
      {links.map(({ text, asterisk }) => (
        <Text as="span" key={text} display="inline" ml="0.25rem">
          {asterisk && "*"}
          <Link textDecor="underline" key={text}>
            {text}
          </Link>
        </Text>
      ))}
    </Text>
  </Flex>
);

const ThirdBar = () => {
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderPosition((prev) => (prev + 1) % sliderData.length);
    }, 6000);

    return () => clearInterval(interval);
  });

  return (
    <Flex
      h="3.5rem"
      w="full"
      overflow="hidden"
      bg={colors.gray}
      pos="relative"
      borderBottom={`1px solid ${colors.darkGray}`}
    >
      <Flex
        w="300%"
        h="full"
        pos="absolute"
        left={`-${sliderPosition * 100}%`}
        transition="left 0.5s"
      >
        {sliderData.map((item, index) => (
          <SliderItem key={index} {...item} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ThirdBar;
