import { Button, message, Popconfirm } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { deleteAdvertisementById } from "../../api/advertisementApi";
import { ADVERTISEMENT_TYPE_OPTIONS } from "../../constants";
import styles from "./Card.module.css";

const Card = ({
  id,
  title,
  type = "OFFER",
  category,
  price,
  city,
  userId,
  userName,
  userNumber,
  daysAgo,
  imagesUrls,
  showOptionButtons = true,
  refreshAdvertisementsFunction,
}) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(deleteAdvertisementById, {
    onSuccess: (data) => {
      message.success(`Uspješno ste obrisali oglas '${title}'`);
      refreshAdvertisementsFunction();
    },
    onError: () => {
      message.error(`Brisanje oglasa '${title}' nije uspjelo`);
    },
  });

  const handleModifyButton = (e) => {
    e.stopPropagation();
    navigate("/advertisement", { state: { advertisementId: id } });
  };

  const handleNavigateToUserInfoPage = (e) => {
    e.stopPropagation();
    navigate("/userInfo", { state: { userId: userId } });
  };

  const handleOnCardClick = () => {
    navigate("/advertisementInfo", {
      state: {
        id: id,
        daysAgo: daysAgo,
      },
    });
  };

  const confirmDelete = (e) => {
    e.stopPropagation();
    mutate(id);
  };

  return (
    <div className={styles.mainContainer} onClick={handleOnCardClick}>
      <img
        className={styles.imageContainer}
        src={imagesUrls[0]}
        alt="Slika"
      ></img>
      <div className={styles.contentContainer}>
        <div className={styles.title}>{title}</div>
        <div className={`${styles.rowContainer}`}>
          {type === ADVERTISEMENT_TYPE_OPTIONS[1].value ? (
            <div className={styles.typeDemand}>
              {ADVERTISEMENT_TYPE_OPTIONS[1].label}
            </div>
          ) : (
            <div className={styles.typeOffer}>
              {ADVERTISEMENT_TYPE_OPTIONS[2].label}
            </div>
          )}
          <div className={styles.category}>{category}</div>
        </div>
        <div className={`${styles.rowContainer}`}>
          <div className={styles.price}>Cijena: {price || " Po dogovoru"}</div>
          <div className={styles.category}>{city}</div>
        </div>
        <div className={`${styles.rowContainer}`}>
          {showOptionButtons ? (
            <>
              <Button
                className={styles.modifyButton}
                type="primary"
                onClick={handleModifyButton}
              >
                Izmjeni
              </Button>
              <Popconfirm
                placement="top"
                title={"Da li ste sigurni da želite obrisati oglas?"}
                onConfirm={confirmDelete}
                okText="Da"
                cancelText="Ne"
              >
                <Button
                  className={styles.deleteButton}
                  type="primary"
                  danger
                  onClick={(e) => e.stopPropagation()}
                >
                  Obriši
                </Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <div
                className={styles.userLink}
                onClick={handleNavigateToUserInfoPage}
              >
                {userName}
              </div>
              <div className={styles.category}>{userNumber}</div>
            </>
          )}
        </div>
        <div className={styles.creationDate}>
          {daysAgo === 0 ? "danas" : "prije " + daysAgo + " dana"}
        </div>
      </div>
    </div>
  );
};

export default Card;
