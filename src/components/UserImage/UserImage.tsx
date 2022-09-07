import React from "react";
import styles from "./UserImage.module.scss";
import NullImage from "../../assets/icons/NullImage";

interface UserImageProps {
  userImageData: string;
}

const UserImage = ({ userImageData }: UserImageProps) => {
  return userImageData ? (
    <img
      className={styles.userImage}
      alt="userimage"
      src={userImageData}
      referrerPolicy="no-referrer"
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (
          e.target as HTMLImageElement
        ).src = require("../../assets/images/no-camera.png");
      }}
    />
  ) : (
    <NullImage />
  );
};

export default UserImage;
