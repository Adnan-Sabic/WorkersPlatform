import React from "react";
import Logo from "../../components/Logo/Logo";
import { ReactComponent as LogoImage } from "../../assets/logo.svg";
import styles from "./HomeHeader.module.css";

const HomeHeader = () => {
  console.log("ado");

  return (
    <div className={styles.mainContainer}>
      <Logo image={LogoImage} text="Majstori" redirectPath="/home"></Logo>
      <div>Middle Part?</div>
      <div>Icons</div>
    </div>
  );
};

export default HomeHeader;
