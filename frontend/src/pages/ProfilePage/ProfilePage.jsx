import React from "react";
import HomeFooter from "../../features/HomeFooter/HomeFooter";
import HomeHeader from "../../features/HomeHeader/HomeHeader";
import ProfileMainContent from "../../features/ProfileMainContent/ProfileMainContent";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.mainContainer}>
      <HomeHeader></HomeHeader>
      <ProfileMainContent></ProfileMainContent>
      <HomeFooter></HomeFooter>
    </div>
  );
};

export default ProfilePage;
