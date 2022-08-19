import React from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import WritingIcon from "../../assets/icons/WritingIcon";
import MyProfileIcon from "../../assets/icons/MyProfileIcon";

const Header = () => {
  const auth = getAuth();

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
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={goToMain}></div>
          {auth.currentUser !== null ? (
            <div className={styles.rightIconContainer}>
              <div className={styles.icon} onClick={goToWriting}>
                <WritingIcon />
              </div>
              <div className={styles.icon} onClick={goToMyProfile}>
                <MyProfileIcon />
              </div>
            </div>
          ) : (
            <div className={styles.rightIconContainer}>
              <div className={styles.login} onClick={goToSignIn}>
                <span>로그인</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
