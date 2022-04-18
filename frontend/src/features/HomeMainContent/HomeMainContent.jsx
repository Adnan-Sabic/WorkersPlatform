import React from "react";
import styles from "./HomeMainContent.module.css";

const HomeMainContent = () => {
  console.log("mainContent");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div>SortBy</div>
        <div>Search</div>
        <div>HowManyToShow</div>
      </div>
      <div className={styles.contentContainer}>
        <div>Kartica 1</div>
        <div>Kartica 2</div>
        <div>Kartica 3</div>
        <div>Kartica 4</div>
        <div>Kartica 5</div>
        <div>Kartica 6</div>
      </div>
    </div>
  );
};

export default HomeMainContent;
