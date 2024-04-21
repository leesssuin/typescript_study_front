import { atom } from "recoil";

type SelectedMenu = {
  name: string;
  tip: number;
  basePrice: number;
  image: string;
};

interface SelectedOptions {
  [category: string]: {
    id: string;
    name: string;
    category: string;
    price: number;
    isChecked: boolean;
    isRequired: boolean;
  }[];
}

export const SelectedMenuState = atom<SelectedMenu>({
  key: "selectedMenuState",
  default: {
    name: "",
    tip: 0,
    basePrice: 0,
    image: ""
  }
});

export const SelectedOptionsState = atom<SelectedOptions>({
  key: "selectedOptionsState",
  default: {}
});
