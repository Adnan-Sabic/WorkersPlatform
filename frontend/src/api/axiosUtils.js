import axios from "axios";
import { BACKEND_BASE_API } from "../constants";

const client = axios.create({
  baseURL: BACKEND_BASE_API,
  headers: {
    "Content-type": "application/json",
  },
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;
  // const onError = (error) => {
  //   return error;
  // };

  return client(options).then(onSuccess); //.catch(onError); commented so that react query can handle errors
};
