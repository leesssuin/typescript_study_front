export type Menu = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  order_option: [];
};

export type StoreInfo = {
  _id: string;
  name: string;
  image: string;
  review: number;
  tip: number;
  menu: Menu[];
};

export interface getStoreListResponse {
  result: string;
  store_list: StoreInfo[];
}

export interface getMenuListResponse {
  result: string;
  store_info: StoreInfo;
}
