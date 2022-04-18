import React from "react";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import HomeMainContent from "../../features/HomeMainContent/HomeMainContent";
import HomeSideBar from "../../features/HomeSideBar/HomeSideBar";
import styles from "./HomePage.module.css";

const HomePage = () => {
  console.log("Home page");
  return (
    <div className={styles.mainContainer}>
      <HomeHeader></HomeHeader>
      <div className={styles.contentContainer}>
        <HomeSideBar></HomeSideBar>
        <HomeMainContent></HomeMainContent>
      </div>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default HomePage;
