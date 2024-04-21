export type Option = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export interface OptionsCategory {
  _id: string;
  category_name: string;
  choice_count: number;
  options: Option[];
}

export interface Menu {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  order_options: OptionsCategory[];
}

export interface StoreInfo {
  _id: string;
  name: string;
  image: string;
  review: number;
  tip: number;
  menu: Menu[];
}

export interface getStoreListResponse {
  result: string;
  store_list: StoreInfo[];
}

export interface getMenuListResponse {
  result: string;
  store_info: StoreInfo;
}

export interface getMenuInfoResponse {
  result: string;
  menu_options: Menu;
}
