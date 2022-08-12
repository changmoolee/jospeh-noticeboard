import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import styles from "./SignUp.module.scss";
import { Button, TextInput } from "joseph-ui-kit";

const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  const onSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setEmail("");
        setPassword("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputlist}>
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          hideWarn
          onChange={(data) => setNickname(data.value)}
        />
        <div className={styles.buttonWrapper}>
          <Button name="닉네임 확인" width="200px" />
        </div>
        <TextInput
          label="아이디"
          placeholder="아이디를 입력해주세요"
          hideWarn
          onChange={(data) => setEmail(data.value)}
        />
        <TextInput
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          hideWarn
          onChange={(data) => setPassword(data.value)}
        />
        <TextInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          hideWarn
          onChange={(data) => setPassword(data.value)}
        />
      </div>
      <Button width="200px" name="회원가입" onClick={onSubmit} />
    </div>
  );
};

export default SignUp;
