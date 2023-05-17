import { atom } from "recoil";

export const isSearchActiveState = atom({
  key: "isSearchActiveState",
  default: false,
});

export const userSearchState = atom({
  key: "userSearchState",
  default: "",
});
