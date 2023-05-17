import { atom } from "recoil";

const secondBarDisplayState = atom({
  key: "secondBarDisplayState",
  default: { isFixed: false, isVisible: true },
});

export default secondBarDisplayState;
