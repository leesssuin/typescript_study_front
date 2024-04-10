import axios from "./config/axiosInstance";

import { getStoreListResponse } from "types";

const getStoreList = async <T = getStoreListResponse>() => {
  const response = await axios.get<T>("/");

  return response.data;
};

export const StoreApi = { getStoreList };
