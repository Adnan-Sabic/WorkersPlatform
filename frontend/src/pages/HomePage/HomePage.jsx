import React from "react";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import HomeMainContent from "../../features/HomeMainContent/HomeMainContent";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader></HomeHeader>
      <HomeMainContent></HomeMainContent>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default HomePage;
