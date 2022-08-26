import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.scss";
import { useNavigate } from "react-router-dom";
import { TextInput, Button } from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import SignOut from "../../components/SignOut/SignOut";
import UserImage from "../../components/UserImage/UserImage";
import LoadingState from "../../components/LoadingState/LoadingState";

const MyProfile = () => {
  const auth = getAuth();

  const user = auth?.currentUser;

  const isAuthLogin =
    user?.providerData[0].providerId === "github.com" ||
    user?.providerData[0].providerId === "google.com"
      ? true
      : false;

  const userImage =
    user?.providerData[0].photoURL === null ||
    user?.providerData[0].photoURL === undefined
      ? ""
      : user?.providerData[0].photoURL;

  const userNickname =
    user?.displayName === null || user?.displayName === undefined
      ? ""
      : user?.displayName;

  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState(userImage);
  const [typedNickname, setTypedNickname] = useState(userNickname);
  const [warnNicknameInput, setWarnNicknameInput] = useState("");

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const clearAttachment = () => {
    setAttachment("");
  };

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async () => {
    if (user === null) {
      alert("로그인이 되어있지 않습니다. 잘못된 접근입니다.");
      goToMain();
    } else {
      if (userNickname !== typedNickname) {
        const nicknameRef = collection(db, "userNickname");

        const nicknameDataQuery = query(
          nicknameRef,
          where("nickname", "==", typedNickname)
        );

        const nicknameDataSnapshot = await getDocs(nicknameDataQuery);

        nicknameDataSnapshot.forEach((doc) => {
          if (doc.data()) {
            alert("이미 존재하는 닉네임입니다.");
            throw Error();
          }
        });
      }

      if (typedNickname === "") {
        setWarnNicknameInput("닉네임을 입력하세요.");
      } else if (typedNickname.length < 2) {
        setWarnNicknameInput("닉네임은 최소 2글자 이상이여야 합니다.");
      } else {
        if (user) {
          if (attachment !== "" && userImage !== attachment) {
            // 첨부된 이미지가 새로운 파일일 경우
            const storage = getStorage();
            const userImageRef = ref(storage, user.uid);

            await uploadString(userImageRef, attachment, "data_url");

            const url = await getDownloadURL(ref(storage, user.uid));

            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: url,
            });

            addDoc(collection(db, "userNickname"), { nickname: typedNickname });

            setAttachment(url);
            alert("프로필 수정이 완료되었습니다.");
          } else if (attachment !== "" && userImage === attachment) {
            // 첨부된 이미지가 이전과 동일할 경우 (빈 이미지 x)

            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: attachment,
            });
            alert("프로필 수정이 완료되었습니다.");
          } else {
            // 첨부된 이미지가 빈 이미지일 경우
            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: "",
            });
            alert("프로필 수정이 완료되었습니다.");
          }
        }
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        if (user.providerData[0].photoURL) {
          setAttachment(user.providerData[0].photoURL);
        }
        if (user.displayName) {
          setTypedNickname(user?.displayName);
        }
      } else {
        // User is signed out
        // ...
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <LoadingState />
  ) : (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <label htmlFor="upload" className={styles.userImageWrapper}>
          <UserImage userImageData={attachment} />
        </label>
        {isAuthLogin ? null : (
          <div className={styles.buttonWrapper}>
            <Button
              padding="10px"
              name="이미지 삭제"
              onClick={clearAttachment}
            />
          </div>
        )}
        <TextInput
          defaultValue={userNickname}
          label="닉네임"
          warn={warnNicknameInput}
          disabled={isAuthLogin}
          placeholder="닉네임을 입력해 주세요."
          onChange={(data) => setTypedNickname(data.value)}
        />
        <div className={styles.buttonContainer}>
          {isAuthLogin ? (
            <span>OAuth 2.0으로 로그인 시, 프로필 수정은 불가합니다.</span>
          ) : (
            <Button
              width="100%"
              name="프로필 수정"
              padding="0"
              position="center"
              onClick={onSubmit}
            />
          )}
          <SignOut />
        </div>
      </div>
      {isAuthLogin ? null : (
        <input
          style={{ display: "none" }}
          id="upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      )}
    </div>
  );
};

export default MyProfile;
