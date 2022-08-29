import React from "react";
import styles from "./UserImage.module.scss";

const UserImage = ({ userImageData }: any) => {
  return userImageData ? (
    <img
      className={styles.userImage}
      alt="userimage"
      src={userImageData}
      onError={(e: any) =>
        (e.target.src =
          "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=8e62d94f-3465-45bb-8cce-15476c91b727")
      }
    />
  ) : (
    <img
      className={styles.nullImage}
      alt="nullimage"
      src="https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/user.png?alt=media&token=15ca2c88-e117-4ad1-8a2c-c2d081925023"
      onError={(e: any) =>
        (e.target.src =
          "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=8e62d94f-3465-45bb-8cce-15476c91b727")
      }
    />
  );
};

export default UserImage;
