import React, { useState, useEffect } from "react";
import styles from "./Writing.module.scss";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, Button, Loading } from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

const Writing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [attachment, setAttachment] = useState("");
  const [typedContent, setContent] = useState("");
  const [warnTitleInput, setWarnTitleInput] = useState("");
  const [warnContentInput, setWarnContentInput] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const userId = user?.uid;
  const userNickname = user?.displayName;
  const userImage = user?.photoURL;

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
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

  const addPost = () => {
    const postId = uuidv4();
    if (typedTitle === "") {
      setWarnTitleInput("입력된 제목이 없습니다.");
      setWarnContentInput("");
    } else if (typedContent === "") {
      setWarnTitleInput("");
      setWarnContentInput("입력된 내용이 없습니다.");
    } else {
      setDoc(doc(db, "freeboard", postId), {
        postId: postId,
        createdTime: new Date().toLocaleString(),
        userId: userId,
        userNickname: userNickname,
        userImage: userImage,
        title: typedTitle,
        contentImage: attachment,
        content: typedContent,
      })
        .then(() => {
          setDoc(doc(db, "comment", postId), { comments: [] });
          goToMain();
        })
        .catch((err) => {
          alert("글쓰기가 실패했습니다.");
          console.log(err);
        });
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
      } else {
        // User is signed out
        // ...
      }
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className={styles.loadingContainer}>
      <Loading />
    </div>
  ) : (
    <div className={styles.container}>
      글쓰기
      <TextInput
        width="100%"
        placeholder="제목을 입력해 주세요."
        hideLabel
        warn={warnTitleInput}
        onChange={(data) => setTypedTitle(data.value)}
      />
      <label htmlFor="upload" className={styles.uploadImageContainer}>
        {attachment ? (
          <img
            className={styles.uploadImage}
            src={attachment}
            alt="contentImage"
          />
        ) : (
          <div className={styles.uploadImageButton}>이미지 업로드</div>
        )}
      </label>
      <input
        style={{ display: "none" }}
        id="upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <TextArea
        width="100%"
        placeholder="내용을 입력해 주세요."
        hideLabel
        warn={warnContentInput}
        onChange={(data) => setContent(data.value)}
      />
      <Button
        width="100%"
        name="등록"
        padding="0"
        position="center"
        onClick={addPost}
      />
    </div>
  );
};

export default Writing;
