import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, TextArea, Button } from "joseph-ui-kit";
import styles from "./Writing.module.scss";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Writing = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const addPost = () =>
    addDoc(collection(db, "freeboard"), {
      created_time: new Date(),
      title: title,
      image: "image",
      content: content,
    }).then(() => goToMain());

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        글쓰기
        <TextInput
          width="200px"
          onChange={(data) => setTitle(data.value)}
          hideLabel
          hideWarn
        />
        <div className={styles.buttonWrapper}>
          <Button width="100px" name="사진 업로드" />
        </div>
        <TextArea
          width="200px"
          onChange={(data) => setContent(data.value)}
          hideLabel
          hideWarn
        />
        <Button width="200px" name="등록" onClick={addPost} />
      </div>
    </div>
  );
};

export default Writing;
