import { request } from "./axiosUtils";

const CITY_ENDPOINT = "cities";

export const findAllCities = () => {
  return request({ url: CITY_ENDPOINT });
};
