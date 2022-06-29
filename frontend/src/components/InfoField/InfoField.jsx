import React from "react";
import styles from "./InfoField.module.css";

const InfoField = ({
  label,
  data,
  textArea = false,
  width,
  textAreaWidth,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={styles.mainContainer}
      style={width ? { width: width } : {}}
    >
      <div className={styles.label}>{label}</div>
      <div
        className={`${textArea ? `${styles.maxHeight}` : `${styles.data}`}`}
        style={textAreaWidth ? { inlineSize: textAreaWidth } : {}}
      >
        {data}
      </div>
    </div>
  );
};

export default InfoField;
