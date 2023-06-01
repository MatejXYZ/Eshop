import { MediaType } from "./findMediaType";

const doesMediaUrlWork: (props: {
  url: string;
  type: MediaType;
}) => Promise<true | false | void> = async ({ url, type }) => {
  if (type === MediaType.other) return false;

  const testEl = document.createElement(
    type === MediaType.image ? "img" : "video"
  );

  testEl.src = url;

  return new Promise((resolve) => {
    testEl.onload = () => {
      resolve(true);
    };

    testEl.oncanplay = () => {
      resolve(true);
    };

    testEl.onerror = () => {
      resolve(false);
    };
  });
};

export default doesMediaUrlWork;
