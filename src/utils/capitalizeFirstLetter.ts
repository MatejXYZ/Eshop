const capitalizeFirstLetter = (str: string) =>
  str.toLowerCase().replace(/^\w/, (letter) => letter.toUpperCase());

export default capitalizeFirstLetter;
