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
    if (type === MediaType.image) {
      testEl.onload = () => {
        resolve(true);
      };
    } else {
      testEl.oncanplay = () => {
        resolve(true);
      };
    }

    testEl.onerror = () => {
      resolve(false);
    };
  });
};

export default doesMediaUrlWork;
