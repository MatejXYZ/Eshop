import { Box, HStack, VStack } from "@chakra-ui/react";

import colors from "../../../colors";

import { ScrollCarousel } from "../../../Components";

type DataItem = {
  id: number;
  img: string;
  title: string;
  price: string;
  category: string;
};

const carouselItems: DataItem[] = [
  {
    id: 1,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/35b03b99-2867-4331-bc58-1f795a5b14e7/air-max-1-87-shoes.png",
    title: "Nike Air Max 1 '87",
    price: "£152.95",
    category: "Women's Shoes",
  },
  {
    id: 2,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/cd0d5e79-2726-412a-951e-6a3f9726fa2c/air-max-1-shoes.png",
    title: "Nike Air Max 1 Premium",
    price: "£152.95",
    category: "Shoes",
  },
  {
    id: 3,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/fe58bca7-c430-4d7c-97db-907a94fc25ed/air-max-1-shoes.png",
    title: "Nike Air Max 1 Premium",
    price: "£152.95",
    category: "Men's Shoes",
  },
  {
    id: 4,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/9efef841-ea76-49f0-ad1c-f6767453d6e2/air-max-scorpion-flyknit-se-shoes.png",
    title: "Nike Air Max Scorpion Flyknit SE",
    price: "£224.95",
    category: "Men's Shoes",
  },
  {
    id: 5,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/a3734282-d3ff-4df6-96bd-bbe1227ef63c/cortez-shoes.png",
    title: "Nike Cortez",
    price: "£89.95",
    category: "Men's Shoes",
  },
  {
    id: 6,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/aa0b3789-bdae-433d-a9bb-604a2deda43d/air-jordan-2-retro-low-shoes.png",
    title: "Air Jordan 2 Retro Low",
    price: "£144.95",
    category: "Women's Shoes",
  },
  {
    id: 7,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/14f7ed0f-8d50-45c8-a9ad-2bd80dbe40c8/air-force-1-low-ambush-shoes.png",
    title: "Nike Air Force 1 Low Ambush",
    price: "£169.95",
    category: "Men's Shoes",
  },
  {
    id: 8,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/48979f39-1f45-4fa6-9b16-217e3e6f9556/cortez-shoes.png",
    title: "Nike Cortez",
    price: "£99.95",
    category: "Men's Shoes",
  },
  {
    id: 9,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/1985a880-4040-4a90-a636-5fd00db3ef77/terminator-high-og-shoes.png",
    title: "Nike Terminator High OG",
    price: "£124.95",
    category: "Men's Shoes",
  },
  {
    id: 10,
    img: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_599,c_limit/c9d2720e-d75b-4532-96ad-350b79f4c963/cortez-shoes.png",
    title: "Nike Cortez",
    price: "£89.95",
    category: "Women's Shoes",
  },
];

const SecondCarousel = () => {
  return (
    <ScrollCarousel showNavigationButtons title="SNKRS Exclusives">
      {carouselItems.map(({ id, img, title, price, category }) => {
        return (
          <VStack cursor="pointer" key={id} pr="0.75rem" spacing="1.25rem">
            <Box w="37.5rem" h="37.5rem" bg={`url("${img}")`} bgSize="cover" />
            <VStack alignSelf="stretch" align="flex-start" spacing="0">
              <HStack justify="space-between" alignSelf="stretch" pr="1rem">
                <Box>{title}</Box>
                <Box>{price}</Box>
              </HStack>
              <Box color={colors.lighterBlack}>{category}</Box>
            </VStack>
          </VStack>
        );
      })}
    </ScrollCarousel>
  );
};

export default SecondCarousel;
