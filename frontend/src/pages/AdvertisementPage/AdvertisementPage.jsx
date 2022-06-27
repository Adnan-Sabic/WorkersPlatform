import React from "react";
import AdvertisementMainContent from "../../features/AdvertisementMainContent/AdvertisementMainContent";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import styles from "./AdvertisementPage.module.css";

const AdvertisementPage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader></HomeHeader>
      <AdvertisementMainContent></AdvertisementMainContent>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default AdvertisementPage;
