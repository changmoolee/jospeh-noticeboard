import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { TextInput, Button } from "joseph-ui-kit";
import styles from "./MyProfile.module.scss";
import SignOut from "../../components/SignOut/SignOut";
import { async } from "@firebase/util";

const MyProfile = () => {
  const auth = getAuth();

  const user = auth?.currentUser;

  const userimage =
    user?.photoURL === null || user?.photoURL === undefined
      ? ""
      : user?.photoURL;

  const isAuthLogin =
    user?.providerData[0].providerId === "github.com" ||
    user?.providerData[0].providerId === "google.com"
      ? true
      : false;

  const userId =
    user?.displayName === null || user?.displayName === undefined
      ? ""
      : user?.displayName;

  const [attachment, setAttachment] = useState(userimage);
  const [nickname, setNickname] = useState(userId);
  const [nicknameWarn, setNicknameWarn] = useState("");

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

  const clearAttachment = () => {
    setAttachment("");
  };

  const onSubmit = async () => {
    if (userId !== nickname) {
      const freeboardRef = collection(db, "freeboard");

      const nicknameQuery = query(
        freeboardRef,
        where("userId", "==", nickname)
      );

      const nicknameSnapshot = await getDocs(nicknameQuery);

      nicknameSnapshot.forEach((doc) => {
        if (doc.data()) {
          alert("이미 존재하는 닉네임입니다.");
          throw Error();
        }
      });
    }

    if (nickname === "") {
      setNicknameWarn("닉네임을 입력하세요.");
    } else if (nickname.length < 2) {
      setNicknameWarn("닉네임은 최소 2글자 이상이여야 합니다.");
    } else {
      if (user) {
        if (attachment !== "" && userimage !== attachment) {
          const storage = getStorage();
          const userimageRef = ref(storage, user.uid);
          await uploadString(userimageRef, attachment, "data_url");

          const url = await getDownloadURL(ref(storage, user.uid));

          await updateProfile(user, {
            displayName: nickname,
            photoURL: url,
          });
          setAttachment(url);
          alert("프로필 수정이 완료되었습니다.");
        } else if (attachment !== "" && userimage === attachment) {
          await updateProfile(user, {
            displayName: nickname,
            photoURL: attachment,
          });
          alert("프로필 수정이 완료되었습니다.");
        } else {
          await updateProfile(user, {
            displayName: nickname,
            photoURL: "",
          });
          alert("프로필 수정이 완료되었습니다.");
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <label htmlFor="upload" className={styles.imageWrapper}>
          {attachment ? (
            <img className={styles.image} src={attachment} alt="userimage" />
          ) : (
            <div className={styles.nullImage} />
          )}
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
          defaultValue={userId}
          label="닉네임"
          warn={nicknameWarn}
          disabled={isAuthLogin}
          placeholder="닉네임을 입력해 주세요."
          onChange={(data) => setNickname(data.value)}
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
