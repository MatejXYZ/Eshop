import { Carousel } from "../../../Components";

const carouselInitialItems = [
  {
    id: 1,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/c73cc835-5320-41de-8e00-09b9e1d1b5c8/nike-just-do-it.jpg",
    title: "Access Member Products",
  },
  {
    id: 2,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/73b4ea93-aab8-46cc-b551-065ee89bd542/nike-just-do-it.png",
    title: "Unlock Member Rewards",
  },
  {
    id: 3,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/0ab81f7c-aa67-4be4-98f8-64665115c150/nike-just-do-it.png",
    title: "Enjoy Sport & Wellbeing",
  },
  {
    id: 4,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/c38f818b-6536-4c33-92ab-ae1ab3695fed/nike-just-do-it.png",
    title: "Join Member Experiences",
  },
  {
    id: 5,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/6d7f78c8-0280-42d7-bfde-1a8985be2b7b/nike-just-do-it.png",
    title: "More of Membership",
  },
];

const FifthCarousel = () => {
  return <Carousel data={carouselInitialItems} title="Nike Membership" />;
};
export default FifthCarousel;
