export type StoreInfo = {
  _id: string;
  name: string;
  image: string;
  review: number;
  tip: number;
};

export interface getStoreListResponse {
  result: string;
  store_list: StoreInfo[];
}
