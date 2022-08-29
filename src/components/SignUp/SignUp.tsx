import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { TextInput, Modal, Button } from "joseph-ui-kit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import LoadingState from "../LoadingState/LoadingState";

const SignUp = ({ closeSignUpModal }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(false);
  const [typedNickname, setTypedNickname] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [typedConfirmPassword, setTypedConfirmPassword] = useState("");
  const [warnNicknameInput, setWarnNicknameInput] = useState("");
  const [warnEmailInput, setWarnEmailInput] = useState("");
  const [warnPasswordInput, setWarnPasswordInput] = useState("");
  const [warnConfirmPasswordInput, setWarnConfirmPasswordInput] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const goToMain = () => {
    navigate("/");
  };

  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  const checkNicknameDuplicate = async () => {
    const nicknameRef = collection(db, "userNickname");

    const nicknameDataQuery = query(
      nicknameRef,
      where("nickname", "==", typedNickname)
    );

    const nicknameDataSnapshot = await getDocs(nicknameDataQuery);

    nicknameDataSnapshot.forEach((doc) => {
      if (doc.data()) {
        setIsDuplicateNickname(true);
        alert("이미 존재하는 닉네임입니다.");
        throw Error();
      }
    });
    setIsDuplicateNickname(false);
    alert("사용 가능한 닉네임입니다.");
  };

  const checkNickname = async () => {
    if (typedNickname === "") {
      setWarnNicknameInput("닉네임을 입력하세요.");
    } else if (typedNickname.length < 2) {
      setWarnNicknameInput("닉네임은 최소 2글자 이상이여야 합니다.");
    } else {
      checkNicknameDuplicate();
    }
  };

  const requestSignUp = () => {
    if (isDuplicateNickname) {
      alert("아직 닉네임 중복체크를 통과하지 못했습니다.");
      throw Error();
    }
    const expEmail = /^[A-Za-z0-9]*@[A-Za-z0-9]*.[A-Za-z]{2,3}$/;
    if (!expEmail.test(typedEmail)) {
      alert("이메일 형식에 맞지 않습니다.");
      setWarnEmailInput("이메일 형식에 맞지 않습니다.");
      throw Error();
    } else if (typedPassword !== typedConfirmPassword) {
      setWarnPasswordInput("");
      setWarnConfirmPasswordInput("비밀번호 확인이 일치하지 않습니다.");
      throw Error();
    }

    createUserWithEmailAndPassword(auth, typedEmail, typedPassword)
      .then((userCredential) => {
        setIsLoading(true);

        // Signed in
        const user = userCredential.user;

        // ...
        updateProfile(user, {
          displayName: typedNickname,
        })
          .then(() => {
            setTypedEmail("");
            setTypedPassword("");
            alert("회원가입이 완료되었습니다.");
            setIsLoading(false);
            goToMain();
          })
          .catch((err) => {
            console.log(
              err,
              "회원가입이 되었지만, 닉네임 설정에는 실패했습니다. 나의 프로필 페이지에서 다시 시도해 주세요."
            );
            alert(
              "회원가입이 되었지만, 닉네임 설정에는 실패했습니다. 나의 프로필 페이지에서 다시 시도해 주세요."
            );
            goToMyProfile();
          });

        setDoc(doc(db, "userNickname", user.uid), {
          nickname: typedNickname,
        });
      })
      .catch((err) => {
        const errorCode = err.code;
        // const errorMessage = err.message;
        // ..
        console.log(err, "회원가입을 실패했습니다.");
        if (errorCode === "auth/email-already-in-use") {
          alert("이미 가입된 이메일입니다.");
          setWarnEmailInput("이미 가입된 이메일입니다.");
        }
        if (errorCode === "auth/invalid-email") {
          alert("이메일 형식에 맞지 않습니다.");
          setWarnEmailInput("이메일 형식에 맞지 않습니다.");
        }
        if (errorCode === "auth/weak-password") {
          alert("비밀번호는 6자 이상 설정해 주세요.");
          setWarnEmailInput("");
          setWarnPasswordInput("비밀번호는 6자 이상 설정해 주세요.");
        }
      });
  };

  return (
    <>
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
              id="nickname"
              label="닉네임"
              type="nickname"
              placeholder="닉네임을 입력해주세요"
              warn={warnNicknameInput}
              maxLength={10}
              onChange={(data) => {
                setTypedNickname(data.value);
                setIsDuplicateNickname(true);
              }}
            />
            <Button
              width="120px"
              kind="secondary"
              name="닉네임 중복 확인"
              onClick={checkNickname}
            />
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
        {isLoading ? <LoadingState /> : <></>}
      </Modal>
    </>
  );
};

export default SignUp;
