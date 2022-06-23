import React from "react";
import Logo from "../../components/Logo/Logo";
import { useSelector } from "react-redux";
import { ReactComponent as LogoImage } from "../../assets/logo.svg";
import Button from "../../components/Button/Button";
import styles from "./HomeHeader.module.css";
import LoginButton from "../LoginButton/LoginButton";
import RegisterButton from "../RegisterButton/RegisterButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";

const HomeHeader = () => {
  console.log("Home Header");
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.mainContainer}>
      <Logo image={LogoImage} text="MAJSTORI" redirectPath="/home"></Logo>
      <div className={styles.rowContainer}>
        {loggedIn ? (
          <>
            <Button
              text="Objavi"
              icon={<ion-icon name="add-circle-outline"></ion-icon>}
              className={styles.marginRight}
            ></Button>
            <Button
              text="Moj profil"
              icon={<ion-icon name="person-outline"></ion-icon>}
              className={styles.marginRight}
            ></Button>
            <Button
              text="Odjava"
              icon={<ion-icon name="log-out-outline"></ion-icon>}
              onClick={logout}
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
