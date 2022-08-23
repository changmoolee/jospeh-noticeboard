import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Modal, TextInput } from "joseph-ui-kit";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import SignUp from "../../components/SignUp/SignUp";

const SignIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warnEmail, setWarnEmail] = useState("");
  const [warnPassword, setWarnPassword] = useState("");

  const openSignUpModal = () => {
    setIsModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const auth = getAuth();

  const onSignIn = (event: any) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        goToMain();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/invalid-email") {
          setWarnEmail("유효하지 않는 이메일입니다.");
        } else if (errorCode === "auth/user-not-found") {
          setWarnEmail("존재하지 않는 아이디입니다.");
        } else if (errorCode === "auth/wrong-password") {
          setWarnEmail("");
          setWarnPassword("일치하지 않는 비밀번호입니다.");
        }
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const onGoogleClick = (event: any) => {
    const {
      target: { name },
    } = event;

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        goToMain();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
          );
        }
      });
  };

  const onGithubClick = (event: any) => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential && credential.accessToken;
        goToMain();
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "이미 다른 auth 계정에 의해 등록되어 있습니다. 중복된 auth 계정은 사용 불가능합니다."
          );
        }
      });
  };

  return (
    <>
      <form className={styles.inputlist}>
        <TextInput
          id="id"
          placeholder="아이디를 입력해 주세요."
          type="text"
          label="아이디"
          width="250px"
          maxLength={40}
          onChange={(data) => setEmail(data.value)}
          warn={warnEmail}
        />
        <TextInput
          id="password"
          placeholder="비밀번호를 입력해 주세요."
          label="비밀번호"
          type="password"
          width="250px"
          maxLength={40}
          onChange={(data) => setPassword(data.value)}
          warn={warnPassword}
        />
      </form>
      <div className={styles.buttonlist}>
        <Button kind="default" name="로그인" width="200px" onClick={onSignIn} />
        <Button
          kind="secondary"
          name="회원가입"
          width="200px"
          onClick={openSignUpModal}
        />
        <Button
          kind="tertiary"
          name="Google 로그인"
          width="200px"
          onClick={onGoogleClick}
        />
        <Button
          kind="tertiary"
          name="Github 로그인"
          width="200px"
          onClick={onGithubClick}
        />
      </div>
      {isModalOpen ? (
        <Modal
          width="400px"
          height="auto"
          label="회원가입"
          title="회원가입"
          closeModal={closeSignUpModal}
          firstButtonDisabled
          secondaryButtonDisabled
        >
          <SignUp />
        </Modal>
      ) : null}
    </>
  );
};

export default SignIn;
