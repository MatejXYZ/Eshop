import { atom } from "recoil";

const isBackgroundEffectActiveState = atom({
  key: "isBackgroundEffectActiveState",
  default: false,
});

export default isBackgroundEffectActiveState;
