import React from "react";
import styles from "./SignOut.module.scss";
import { Button } from "joseph-ui-kit";
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
  const auth = getAuth();

  const onClick = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((err) => {
        // An error happened.
        console.log(err, "로그아웃에 실패하였습니다.");
      });

  return (
    <a href="/" className={styles.gotomain} onClick={onClick}>
      <Button
        kind="secondary"
        name="로그아웃"
        width="100%"
        padding="0"
        position="center"
      />
    </a>
  );
};

export default SignOut;
