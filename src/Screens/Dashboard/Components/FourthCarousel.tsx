import { Carousel } from "../../../Components";

const data = [
  {
    id: 1,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/5027a28c-3984-4287-94d1-ee6198238ce9/nike-just-do-it.jpg",
    title: "Football",
  },
  {
    id: 2,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/11550514-c82b-46b2-afd8-e5dd62698371/nike-just-do-it.jpg",
    title: "Dance",
  },
  {
    id: 3,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/3aef76c8-46c5-4f2a-a18c-3e9bdc148433/nike-just-do-it.jpg",
    title: "Running",
  },
  {
    id: 4,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/b4722f0f-c0e4-4a1b-8050-9f026ef947e9/nike-just-do-it.jpg",
    title: "Training",
  },
  {
    id: 5,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/5f432ab0-7ed1-48b9-b8c8-9eb3f5dcb63d/nike-just-do-it.jpg",
    title: "Tennis",
  },
  {
    id: 6,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/be13cfe4-b5a9-4c26-bee0-b716e98b099d/nike-just-do-it.jpg",
    title: "Basketball",
  },
  {
    id: 7,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/ed6efa3d-bb62-4d41-89f1-49d01418fe49/nike-just-do-it.jpg",
    title: "Yoga",
  },
  {
    id: 8,
    img: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_500,c_limit/1d2fd0c4-a7dd-4159-84c0-a0364c0990e3/nike-just-do-it.jpg",
    title: "Skateboarding",
  },
];

const FourthCarousel = () => {
  return <Carousel data={data} title="Shop By Sport" />;
};

export default FourthCarousel;
