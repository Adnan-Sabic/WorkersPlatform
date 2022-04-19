import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = ({ image: LogoImage, text, redirectPath }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.mainContainer}
      onClick={() => navigate(redirectPath)}
    >
      <LogoImage className={styles.logo} />
      <div className={styles.logoText}>{text}</div>
    </div>
  );
};

export default Logo;
