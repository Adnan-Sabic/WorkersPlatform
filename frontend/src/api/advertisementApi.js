import { request } from "./axiosUtils";

const ADVERTISEMENTS_ENDPOINT = "advertisements";

export const findAllAdvertisements = (params = {}) => {
  return request({ url: ADVERTISEMENTS_ENDPOINT, params: params });
};
