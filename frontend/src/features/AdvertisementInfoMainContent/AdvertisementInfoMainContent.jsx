import { Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { getAdvertisementById } from "../../api/advertisementApi";
import InfoField from "../../components/InfoField/InfoField";
import { ADVERTISEMENT_TYPE_OPTIONS } from "../../constants";
import styles from "./AdvertisementInfoMainContent.module.css";

const AdvertisementInfoMainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: advertisement, isLoading } = useQuery(
    ["advertisement", location.state.id],
    () => getAdvertisementById(location.state.id)
  );

  if (isLoading) {
    return <Spin />;
  }

  console.log("data", advertisement?.data);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.columnContainer}>
        <div className={styles.aboutUser}>Informacije o oglasu</div>
        <div className={styles.rowContainer}>
          <div className={styles.columnContainer}>
            <InfoField
              label={"Naslov"}
              data={advertisement?.data?.title}
              width="40rem"
            ></InfoField>
            <div className={styles.rowContainer}>
              <InfoField
                label={"Tip"}
                data={
                  advertisement?.data?.type ===
                  ADVERTISEMENT_TYPE_OPTIONS[1].value
                    ? ADVERTISEMENT_TYPE_OPTIONS[1].label
                    : ADVERTISEMENT_TYPE_OPTIONS[2].label
                }
                width="20rem"
              ></InfoField>
              <InfoField
                label={"Kategorija"}
                data={advertisement?.data?.category?.name}
                width="20rem"
              ></InfoField>
            </div>
            <div className={styles.rowContainer}>
              <InfoField
                label={"Cijena"}
                data={`${advertisement?.data?.price || " Po dogovoru"}`}
                width="20rem"
              ></InfoField>
              <InfoField
                label={"Korisnik"}
                data={advertisement?.data?.user?.username}
                width="20rem"
                onClick={() =>
                  navigate("/userInfo", {
                    state: { userId: advertisement?.data?.user?.id },
                  })
                }
              ></InfoField>
            </div>
            <div className={styles.rowContainer}>
              <InfoField
                label={"Objavljeno"}
                data={`${
                  location.state.daysAgo === 0
                    ? "Danas"
                    : "Prije " + location.state.daysAgo + " dana"
                }`}
                width="20rem"
              ></InfoField>
              <InfoField
                label={"Grad"}
                data={advertisement?.data?.cityName}
                width="20rem"
              ></InfoField>
            </div>
          </div>
          <div className={`${styles.columnContainer} ${styles.imageContainer}`}>
            <img
              className={styles.userImage}
              src={advertisement?.data?.imagesWithUid[0].url}
              alt="car"
            />
          </div>
        </div>
        <InfoField
          label={"Detaljne informacije"}
          data={advertisement?.data?.description}
          textArea
          textAreaWidth={"72rem"}
        ></InfoField>
      </div>
    </div>
  );
};

export default AdvertisementInfoMainContent;
