import React from "react";
import Logo from "../../components/Logo/Logo";
import { ReactComponent as LogoImage } from "../../assets/logo.svg";
import { Form, Input, Button as Buttoon, Checkbox } from "antd";
import Button from "../../components/Button/Button";
import styles from "./HomeHeader.module.css";
import LoginButton from "../LoginButton/LoginButton";
import RegisterButton from "../RegisterButton/RegisterButton";

const HomeHeader = () => {
  console.log("ado");
  const isLoggedIn = false;

  return (
    <div className={styles.mainContainer}>
      <Logo image={LogoImage} text="MAJSTORI" redirectPath="/home"></Logo>
      <div className={styles.rowContainer}>
        {isLoggedIn ? (
          <>
            <Button
              text="Objavi"
              icon={<ion-icon name="add-circle"></ion-icon>}
              className={styles.marginRight}
            ></Button>
            <Button
              text="Moj profil"
              icon={<ion-icon name="person"></ion-icon>}
            ></Button>
          </>
        ) : (
          <>
            <LoginButton className={styles.marginRight}></LoginButton>
            <RegisterButton></RegisterButton>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
