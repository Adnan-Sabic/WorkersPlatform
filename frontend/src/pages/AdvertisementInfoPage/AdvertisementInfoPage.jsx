import React from "react";
import AdvertisementInfoMainContent from "../../features/AdvertisementInfoMainContent/AdvertisementInfoMainContent";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import styles from "./AdvertisementInfoPage.module.css";

const AdvertisementInfoPage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader />
      <AdvertisementInfoMainContent />
      <HomeFooter />
    </div>
  );
};

export default AdvertisementInfoPage;
