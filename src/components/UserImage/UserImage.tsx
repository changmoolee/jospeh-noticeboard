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
    <div className={styles.nullImage} />
  );
};

export default UserImage;
