import { request } from "./axiosUtils";

const ADVERTISEMENTS_ENDPOINT = "advertisements";

export const findAllAdvertisements = (params = {}) => {
  return request({ url: ADVERTISEMENTS_ENDPOINT, params: params });
};

export const getAdvertisementById = (id) => {
  //TODO find smarter way to stop executing useQuery
  if (id) {
    const finalEndpoint = ADVERTISEMENTS_ENDPOINT + "/" + id;
    return request({ method: "get", url: finalEndpoint });
  }
};

export const editAdvertisementById = (data = {}) => {
  return request({ method: "put", url: ADVERTISEMENTS_ENDPOINT, data: data });
};

export const createNewAdvertisement = (data) => {
  return request({
    method: "post",
    url: ADVERTISEMENTS_ENDPOINT,
    data: data,
  });
};

export const deleteAdvertisementById = (id) => {
  const finalEndpoint = ADVERTISEMENTS_ENDPOINT + "/" + id;
  return request({
    method: "delete",
    url: finalEndpoint,
  });
};
