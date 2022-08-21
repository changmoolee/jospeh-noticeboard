import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, TextInput } from "joseph-ui-kit";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warnEmail, setWarnEmail] = useState("");
  const [warnPassword, setWarnPassword] = useState("");
  const [warnConfirmPassword, setWarnConfirmPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const goToMain = () => {
    navigate("/");
  };

  const onSubmit = () => {
    const exptext = /^[A-Za-z0-9]*@[A-Za-z0-9]*.[A-Za-z]{2,3}$/;
    if (!exptext.test(email)) {
      setWarnEmail("이메일 형식에 맞지 않습니다.");
      return;
    } else if (password.length < 6) {
      setWarnEmail("");
      setWarnPassword("비밀번호는 6자 이상 설정해 주세요.");
      return;
    } else if (password !== confirmPassword) {
      setWarnPassword("");
      setWarnConfirmPassword("비밀번호가 같지 않습니다.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setEmail("");
        setPassword("");
        // ...
        goToMain();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.inputlist}>
        <TextInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          warn={warnEmail}
          maxLength={50}
          onChange={(data) => setEmail(data.value)}
        />
        <TextInput
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          warn={warnPassword}
          onChange={(data) => setPassword(data.value)}
        />
        <TextInput
          id="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          warn={warnConfirmPassword}
          onChange={(data) => setConfirmPassword(data.value)}
        />
      </form>
      <Button
        kind="secondary"
        width="200px"
        name="회원가입"
        onClick={onSubmit}
      />
    </div>
  );
};

export default SignUp;
