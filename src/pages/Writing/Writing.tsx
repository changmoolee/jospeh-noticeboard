import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, Button, Modal } from "joseph-ui-kit";
import styles from "./Writing.module.scss";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleWarn, setTitleWarn] = useState("");
  const [contentWarn, setContentWarn] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.providerData[0].displayName;
  const userimage =
    user?.providerData[0].photoURL === null ||
    user?.providerData[0].photoURL === undefined
      ? ""
      : user?.providerData[0].photoURL;

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const addPost = () => {
    if (title === "") {
      setTitleWarn("입력된 제목이 없습니다.");
      setContentWarn("");
    } else if (content === "") {
      setTitleWarn("");
      setContentWarn("입력된 내용이 없습니다.");
    } else {
      addDoc(collection(db, "freeboard"), {
        userId: userId,
        userImage: userimage,
        created_time: new Date().toLocaleString(),
        title: title,
        content: content,
      })
        .then(() => goToMain())
        .catch((err) => {
          alert("글쓰기가 실패했습니다.");
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.container}>
      글쓰기
      <TextInput
        width="100%"
        placeholder="제목을 입력해 주세요."
        hideLabel
        warn={titleWarn}
        onChange={(data) => setTitle(data.value)}
      />
      <TextArea
        width="100%"
        placeholder="내용을 입력해 주세요."
        hideLabel
        warn={contentWarn}
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
