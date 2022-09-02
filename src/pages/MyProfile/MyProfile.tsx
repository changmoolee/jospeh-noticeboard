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
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import SignOut from "../../components/SignOut/SignOut";
import UserImage from "../../components/UserImage/UserImage";
import LoadingState from "../../components/LoadingState/LoadingState";
import Withdrawal from "../../components/Withdrawal/Withdrawal";

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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = (event.target as HTMLInputElement).files;

    if (files === null) throw Error("적절한 파일이 입력되지 않았습니다.");

    const theFile = files[0];

    if (theFile?.size > 1024 * 1024 * 1) {
      alert("업로드할 수 있는 이미지 파일은 1MB 이하 사이즈만 가능합니다.");
      throw Error(
        `업로드할 수 있는 이미지 파일은 1MB 이하 사이즈만 가능합니다.`
      );
    }

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const result = (finishedEvent.currentTarget as FileReader)?.result;

      if (typeof result === "string") {
        setAttachment(result);
      }
      // https://developer.mozilla.org/ko/docs/Web/API/FileReader/result
    };
    reader.readAsDataURL(theFile);
  };

  const onSubmit = async () => {
    setIsLoading(true);
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
            setIsLoading(false);
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
            // 첨부된 이미지 파일이 null이 아니고 / 이전과 다른 새로운 이미지 파일일 경우
            const storage = getStorage();
            const userImageRef = ref(storage, user.uid);

            if (userImage !== "") {
              // 이전에 저장된 프로필 이미지가 있었다면 삭제해준다.
              deleteObject(userImageRef)
                .then(() => {
                  // File deleted successfully
                })
                .catch((error) => {
                  // Uh-oh, an error occurred!
                  console.log(error, "유저 이미지 삭제에 실패했습니다.");
                });
            }

            await uploadString(userImageRef, attachment, "data_url");

            const url = await getDownloadURL(ref(storage, user.uid));

            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: url,
            });

            updateDoc(doc(db, "userNickname", user.uid), {
              nickname: typedNickname,
            });

            setAttachment(url);
            alert("프로필 수정이 완료되었습니다.");
          } else if (attachment !== "" && userImage === attachment) {
            // 첨부된 이미지가 이전과 동일할 경우 (null 이미지 x)

            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: attachment,
            });

            updateDoc(doc(db, "userNickname", user.uid), {
              nickname: typedNickname,
            });

            alert("프로필 수정이 완료되었습니다.");
          } else {
            // 첨부된 이미지가 null 이미지일 경우
            const storage = getStorage();
            const userImageRef = ref(storage, user.uid);

            if (userImage !== "") {
              // 이전에 저장된 프로필 이미지가 있었다면 삭제해준다.
              deleteObject(userImageRef)
                .then(() => {
                  // File deleted successfully
                })
                .catch((error) => {
                  // Uh-oh, an error occurred!
                  console.log(error, "유저 이미지 삭제에 실패했습니다.");
                });
            }

            await updateProfile(user, {
              displayName: typedNickname,
              photoURL: "",
            });

            updateDoc(doc(db, "userNickname", user.uid), {
              nickname: typedNickname,
            });

            alert("프로필 수정이 완료되었습니다.");
          }
        }
      }
    }
    setIsLoading(false);
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
  }, [auth]);

  return (
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
        {isLoading ? (
          <>
            <LoadingState />
            <TextInput
              defaultValue={userNickname}
              label="닉네임"
              warn={warnNicknameInput}
              disabled={isAuthLogin}
              placeholder="닉네임을 입력해 주세요."
              onChange={(data) => setTypedNickname(data.value)}
            />
          </>
        ) : (
          <TextInput
            defaultValue={userNickname}
            label="닉네임"
            warn={warnNicknameInput}
            disabled={isAuthLogin}
            placeholder="닉네임을 입력해 주세요."
            onChange={(data) => setTypedNickname(data.value)}
          />
        )}
        <div className={styles.buttonContainer}>
          {isAuthLogin ? (
            <span>OAuth 2.0으로 로그인 시, 프로필 수정은 불가합니다.</span>
          ) : (
            <Button
              name="프로필 수정"
              width="100%"
              padding="0"
              position="center"
              onClick={onSubmit}
            />
          )}
          <SignOut />
          <Withdrawal />
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
