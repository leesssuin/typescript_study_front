import axios from "./config/axiosInstance";

import { getMenuListResponse, getStoreListResponse } from "types";

const getStoreList = async <T = getStoreListResponse>() => {
  const response = await axios.get<T>("/");

  return response.data;
};

const getStoreInfo = async <T = getMenuListResponse>(
  id: string | undefined
) => {
  const response = await axios.get<T>(`/${id}`);

  return response.data;
};

export const StoreApi = { getStoreList, getStoreInfo };
