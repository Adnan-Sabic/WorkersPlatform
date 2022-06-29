import React from "react";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import UserInfoMainContent from "../../features/UserInfoMainContent/UserInfoMainContent";
import styles from "./UserInfoPage.module.css";

const UserInfoPage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader />
      <UserInfoMainContent />
      <HomeFooter />
    </div>
  );
};

export default UserInfoPage;
