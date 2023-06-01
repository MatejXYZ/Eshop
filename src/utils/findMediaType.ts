const videoSuffixes = [
  "webm",
  "mkv",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "drc",
  "gif",
  "gifv",
  "mng",
  "avi",
  "mts",
  "m2ts",
  "ts",
  "mov",
  "qt",
  "wmv",
  "yuv",
  "rm",
  "rmvb",
  "viv",
  "asf",
  "amv",
  "mp4",
  "m4p",
  "m4v",
  "mpg",
  "mp2",
  "mpeg",
  "mpe",
  "mpv",
  "m2v",
  "svi",
  "3gp",
  "3g2",
  "mxf",
  "roq",
  "nsv",
  "f4v",
  "f4p",
  "f4a",
  "f4b",
];
const imageSuffixes = [
  "apng",
  "avif",
  "gif",
  "jpg",
  "jpeg",
  "jfif",
  "pjpeg",
  "pjp",
  "png",
  "svg",
  "webp",
];

export enum MediaType {
  "video",
  "image",
  "other",
}

const findMediaType: (url: string) => MediaType = (url) => {
  const suffix = url.split("?")[0].slice(-5).toLowerCase();

  if (videoSuffixes.find((item) => suffix.includes(`.${item}`)))
    return MediaType.video;

  if (imageSuffixes.find((item) => suffix.includes(`.${item}`)))
    return MediaType.image;

  return MediaType.other;
};

export default findMediaType;
