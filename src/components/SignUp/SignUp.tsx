import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { TextInput, Modal } from "joseph-ui-kit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ closeSignUpModal }: any) => {
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [typedConfirmPassword, setTypedConfirmPassword] = useState("");
  const [warnEmailInput, setWarnEmailInput] = useState("");
  const [warnPasswordInput, setWarnPasswordInput] = useState("");
  const [warnConfirmPasswordInput, setWarnConfirmPasswordInput] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const goToMain = () => {
    navigate("/");
  };

  const requestSignUp = () => {
    const expEmail = /^[A-Za-z0-9]*@[A-Za-z0-9]*.[A-Za-z]{2,3}$/;
    if (!expEmail.test(typedEmail)) {
      setWarnEmailInput("이메일 형식에 맞지 않습니다.");
      return;
    } else if (typedPassword.length < 6) {
      setWarnEmailInput("");
      setWarnPasswordInput("비밀번호는 6자 이상 설정해 주세요.");
      return;
    } else if (typedPassword !== typedConfirmPassword) {
      setWarnPasswordInput("");
      setWarnConfirmPasswordInput("비밀번호가 같지 않습니다.");
      return;
    }
    createUserWithEmailAndPassword(auth, typedEmail, typedPassword)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        setTypedEmail("");
        setTypedPassword("");
        // ...
        goToMain();
      })
      .catch((err) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
        console.log(err, "회원가입을 실패했습니다.");
      });
  };

  return (
    <Modal
      width="400px"
      height="auto"
      label="회원가입"
      title="회원가입"
      closeModal={closeSignUpModal}
      firstButtonText="회원가입"
      secondaryButtonText="취소"
      firstButtonOnClick={requestSignUp}
      secondaryButtonOnClick={closeSignUpModal}
    >
      <div className={styles.container}>
        <form className={styles.inputlist}>
          <TextInput
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            warn={warnEmailInput}
            maxLength={50}
            onChange={(data) => setTypedEmail(data.value)}
          />
          <TextInput
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            warn={warnPasswordInput}
            maxLength={50}
            onChange={(data) => setTypedPassword(data.value)}
          />
          <TextInput
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            warn={warnConfirmPasswordInput}
            maxLength={50}
            onChange={(data) => setTypedConfirmPassword(data.value)}
          />
        </form>
      </div>
    </Modal>
  );
};

export default SignUp;
