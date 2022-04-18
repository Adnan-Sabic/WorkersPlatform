import React from "react";

import styles from "./HomeHeader.module.css";

const HomeHeader = () => {
  console.log("ado");

  return (
    <div className={styles.mainContainer}>
      <div>Logo</div>
      <div>Middle Part?</div>
      <div>Icons</div>
    </div>
  );
};

export default HomeHeader;
