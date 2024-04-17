import { atom } from "recoil";

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

export const SelectedOptionsState = atom<SelectedOptions>({
  key: "selectedOptionsState",
  default: {}
});
