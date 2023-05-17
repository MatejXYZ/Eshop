import { Carousel } from "../../../Components";

const carouselInitialItems = [
  {
    id: 1,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/c87d8603-e81b-4140-bb03-b3f3b7cd8b2f/nike-just-do-it.png",
    title: "Nike Max Furyosa",
  },
  {
    id: 2,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/4eb07fe3-92ac-47c8-88a3-bbbe4575e78e/nike-just-do-it.png",
    title: "Air Max 90",
  },
  {
    id: 3,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/f8a11c34-f7b9-40e3-bad5-79f783bd2e31/nike-just-do-it.png",
    title: "Air Max Plus",
  },
  {
    id: 4,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/9422ce57-88b4-45f0-8c72-9bd4dc0f2ed9/nike-just-do-it.png",
    title: "Air Max 97",
  },
  {
    id: 5,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/ea97194c-69a1-44da-957d-efd7752d16fe/nike-just-do-it.png",
    title: "Air Max 95",
  },
  {
    id: 6,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/9526e02c-ee56-4e1f-bf01-99fbf5c25321/nike-just-do-it.png",
    title: "Air Max 270",
  },
  {
    id: 7,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/741fe7a4-997a-4e68-9255-5245a0bd3401/nike-just-do-it.jpg",
    title: "Air Max TW",
  },
];

const FirstCarousel = () => {
  return <Carousel data={carouselInitialItems} />;
};
export default FirstCarousel;
