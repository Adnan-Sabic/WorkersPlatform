import { Button, message } from "antd";
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
  userName,
  userNumber,
  daysAgo,
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

  const handleDeleteButton = () => {
    mutate(id);
  };

  const handleModifyButton = () => {
    navigate("/advertisement", { state: { advertisementId: id } });
  };

  return (
    <div className={styles.mainContainer}>
      <img
        className={styles.imageContainer}
        src="https://cdn.vox-cdn.com/thumbor/IneeXFCJM7YjxGrqgg5zJBmblHA=/0x0:3809x2857/1200x800/filters:focal(1601x1125:2209x1733)/cdn.vox-cdn.com/uploads/chorus_image/image/66274935/Workshop_0919-HS-40Something_Ask-studio_TommyCorner-1.0.0.jpg"
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
              <Button
                className={styles.deleteButton}
                type="primary"
                danger
                onClick={handleDeleteButton}
              >
                Obrisi
              </Button>
            </>
          ) : (
            <>
              <a className={styles.userName}>{userName}</a>
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
