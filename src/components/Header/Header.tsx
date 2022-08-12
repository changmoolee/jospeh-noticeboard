import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  const goToWriting = () => {
    navigate("/writing");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.temp} onClick={goToMain}></div>
        <div className={styles.temp} onClick={goToSignIn}></div>
        <div className={styles.temp} onClick={goToMyProfile}></div>
        <div className={styles.temp} onClick={goToWriting}></div>
      </div>
    </>
  );
};

export default Header;
