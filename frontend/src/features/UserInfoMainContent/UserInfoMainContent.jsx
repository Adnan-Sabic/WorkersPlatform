import { Button, Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { findUserInfoById } from "../../api/userApi";
import InfoField from "../../components/InfoField/InfoField";
import styles from "./UserInfoMainContent.module.css";

const UserInfoMainContent = () => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  const { data: user, isLoading } = useQuery(
    ["user", location.state.userId],
    () => findUserInfoById(location.state.userId)
  );

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.columnContainer}>
        <div className={styles.aboutUser}>Informacije o korisniku</div>
        <div className={styles.rowContainer}>
          <div className={styles.columnContainer}>
            <InfoField
              label={"Ime i prezime"}
              data={`${user?.data?.firstName} ${user?.data?.lastName}`}
            ></InfoField>
            <InfoField label={"Grad"} data={user?.data?.city?.name}></InfoField>
            <InfoField
              label={"Broj telefona"}
              data={user?.data?.contactNumber}
            ></InfoField>
          </div>
          <div className={`${styles.columnContainer} ${styles.imageContainer}`}>
            <img
              className={styles.userImage}
              src={user?.data?.imageUrl}
              alt="slika"
            />
          </div>
        </div>

        <div className={`${styles.rowContainer}`}>
          <InfoField
            label={"Opis"}
            data={user?.data?.about}
            textArea
          ></InfoField>
        </div>
        <div
          className={`${styles.rowContainer} ${styles.sendMessageButtonContainer}`}
        >
          {loggedIn && (
            <Button type="primary" className={styles.sendMessageButton}>
              Pošalji poruku
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoMainContent;
