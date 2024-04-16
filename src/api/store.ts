import axios from "./config/axiosInstance";

import {
  getMenuInfoResponse,
  getMenuListResponse,
  getStoreListResponse
} from "types";

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

const getOptions = async <T = getMenuInfoResponse>(
  id: string | undefined,
  menuId: string | undefined
) => {
  const response = await axios.get<T>(`/${id}/${menuId}`);

  return response.data;
};

export const StoreApi = { getStoreList, getStoreInfo, getOptions };
