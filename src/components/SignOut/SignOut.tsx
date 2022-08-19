import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./SignOut.module.scss";
import { Button } from "joseph-ui-kit";

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
        goToMain();
      })
      .catch((error) => {
        // An error happened.
      });
  return (
    <Button
      name="로그아웃"
      width="100%"
      padding="0"
      position="center"
      onClick={onClick}
    />
  );
};

export default SignOut;
