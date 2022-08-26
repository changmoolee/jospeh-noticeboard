import React from "react";
import styles from "./SignOut.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "joseph-ui-kit";
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
  const auth = getAuth();

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const onClick = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("로그아웃이 정상적으로 되었습니다.");
        goToMain();
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
