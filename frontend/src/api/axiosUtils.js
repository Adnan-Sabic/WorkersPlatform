import axios from "axios";
import { TOKEN_KEY } from "../constants";
import { getFromLocalStorage } from "../util/localStorageUtil";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_API,
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
  return client(options).then(onSuccess); //.catch(onError); commented so that react query can handle errors
};
