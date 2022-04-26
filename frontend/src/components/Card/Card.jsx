import { Carousel } from "antd";
import React from "react";
import styles from "./Card.module.css";

const Card = () => {
  return (
    <div className={styles.mainContainer}>
      <img
        className={styles.imageContainer}
        src="https://cdn.vox-cdn.com/thumbor/IneeXFCJM7YjxGrqgg5zJBmblHA=/0x0:3809x2857/1200x800/filters:focal(1601x1125:2209x1733)/cdn.vox-cdn.com/uploads/chorus_image/image/66274935/Workshop_0919-HS-40Something_Ask-studio_TommyCorner-1.0.0.jpg"
      ></img>
      <div className={styles.contentContainer}>
        <div className={styles.title}>
          Ovo je neki veliki naslov koji treba ado ado ado ado ado ado ado ado ado ado
        </div>
        <div className={`${styles.rowContainer} ${styles.titleContainer}`}>
          <div className={styles.type}>Potraznja</div>
          <div className={styles.category}>Elektricarstvo</div>
        </div>
        <div className={styles.price}>Cijena: Po dogovoru</div>
        <div className={`${styles.rowContainer} ${styles.userInfoContainer}`}>
          <a className={styles.userName}>MujagaMuricdsfd</a>
          <div className={styles.category}>062-111-684</div>
        </div>
        <div className={styles.creationDate}>prije 3 dana</div>
      </div>
    </div>
  );
};

export default Card;
