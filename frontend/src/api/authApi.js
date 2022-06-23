import { request } from "./axiosUtils";

const LOGIN_ENDPOINT = "login";

export const login = (data = {}) => {
  return request({ method: "post", url: LOGIN_ENDPOINT, data: data });
};
