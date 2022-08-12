import React from "react";
import styles from "./MyProfile.module.scss";
import { TextInput, Button } from "joseph-ui-kit";

const MyProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image} />
      <div className={styles.subContainer}>
        <TextInput width="200px" label="닉네임" hideWarn />
        <Button width="200px" />
      </div>
    </div>
  );
};

export default MyProfile;
