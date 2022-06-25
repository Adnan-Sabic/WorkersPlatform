import axios from "axios";
import { BACKEND_BASE_API, TOKEN_KEY } from "../constants";
import { getFromLocalStorage } from "../util/localStorageUtil";

const client = axios.create({
  baseURL: BACKEND_BASE_API,
  headers: {
    "Content-type": "application/json",
  },
});

export const request = ({ ...options }) => {
  const jwtToken = getFromLocalStorage(TOKEN_KEY);
  if (jwtToken) {
    client.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  }
  const onSuccess = (response) => response;
  // const onError = (error) => {
  //   return error;
  // };
  return client(options).then(onSuccess); //.catch(onError); commented so that react query can handle errors
};
