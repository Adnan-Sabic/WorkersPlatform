import axios from "axios";

export const updatePricuteToS3 = ({ presignedUrl, imageData }) => {
  return axios.put(presignedUrl, imageData);
};

export const updateMultiplePicturesToS3 = ({ presignedUrls, imagesData }) => {
  let promises = [];
  imagesData = imagesData.filter(Boolean);
  for (let i = 0; i < presignedUrls.length; i++) {
    promises.push(axios.put(presignedUrls[i], imagesData[i]));
  }
  return Promise.all(promises);
};
