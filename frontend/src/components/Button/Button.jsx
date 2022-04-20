import React from "react";
import styles from "./Button.module.css";

const Button = ({ icon: Icon, className, text, onClick }) => {
  return (
    <div className={`${styles.mainContainer} ${className}`} onClick={onClick}>
      {Icon}
      {text}
    </div>
  );
};

export default Button;
