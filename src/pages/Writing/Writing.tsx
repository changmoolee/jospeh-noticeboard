import React, { useState } from "react";
import styles from "./Writing.module.scss";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, Button } from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";

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
    const postId = uuidv4();
    if (title === "") {
      setTitleWarn("입력된 제목이 없습니다.");
      setContentWarn("");
    } else if (content === "") {
      setTitleWarn("");
      setContentWarn("입력된 내용이 없습니다.");
    } else {
      setDoc(doc(db, "freeboard", postId), {
        postId: postId,
        userId: userId,
        userImage: userimage,
        createdTime: new Date().toLocaleString(),
        title: title,
        content: content,
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
