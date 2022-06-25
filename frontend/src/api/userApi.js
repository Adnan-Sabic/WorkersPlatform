import { USER_ID } from "../constants";
import { getFromLocalStorage } from "../util/localStorageUtil";
import { request } from "./axiosUtils";

const USER_ENDPOINT = "users";

export const registerUser = (data = {}) => {
  return request({ method: "post", url: USER_ENDPOINT, data: data });
};

export const findUserById = () => {
  const finalEndPoint = USER_ENDPOINT + "/" + getFromLocalStorage(USER_ID);
  return request({ url: finalEndPoint });
};

export const editUserById = (data = {}) => {
  return request({method: "put", url: USER_ENDPOINT, data: data})
};
