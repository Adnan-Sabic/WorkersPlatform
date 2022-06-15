import { request } from "./axiosUtils";

const USER_ENDPOINT = "users";

export const registerUser = (data = {}) => {
  return request({ method: "post", url: USER_ENDPOINT, data: data });
};
