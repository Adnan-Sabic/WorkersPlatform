import { request } from "./axiosUtils";

const CATEGORY_ENDPOINT = "categories";

export const findAllCategories = () => {
  return request({ url: CATEGORY_ENDPOINT });
};
