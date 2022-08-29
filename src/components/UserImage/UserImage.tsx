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
          "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=7e7b3794-bc4a-469f-92f5-bdba30ed5226")
      }
    />
  ) : (
    <img
      className={styles.nullImage}
      alt="nullimage"
      src="https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/user.png?alt=media&token=15ca2c88-e117-4ad1-8a2c-c2d081925023"
      onError={(e: any) =>
        (e.target.src =
          "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=7e7b3794-bc4a-469f-92f5-bdba30ed5226")
      }
    />
  );
};

export default UserImage;
