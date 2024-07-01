import { atom } from "recoil";

export const autocompleteResults = atom({
  key: "autocompleteResultAtom",
  default: [],
});
