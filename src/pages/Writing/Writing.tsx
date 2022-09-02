import React, { useState, useEffect } from "react";
import styles from "./Writing.module.scss";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  FileUploaderDropContainer,
  TextArea,
  Button,
} from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import LoadingState from "../../components/LoadingState/LoadingState";

const Writing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState("");
  const [typedTitle, setTypedTitle] = useState("");
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

  const addPost = async () => {
    setIsLoading(true);
    const postId = uuidv4();
    if (typedTitle === "") {
      setWarnTitleInput("입력된 제목이 없습니다.");
      setWarnContentInput("");
    } else if (typedContent === "") {
      setWarnTitleInput("");
      setWarnContentInput("입력된 내용이 없습니다.");
    } else {
      let url;
      if (attachment) {
        const storage = getStorage();
        const postImageRef = ref(storage, postId);

        await uploadString(postImageRef, attachment, "data_url");

        url = await getDownloadURL(ref(storage, postId));
      } else {
        url = "";
      }

      setDoc(doc(db, "freeboard", postId), {
        postId: postId,
        createdTime: new Date().toLocaleString(),
        userId: userId,
        userNickname: userNickname,
        userImage: userImage,
        title: typedTitle,
        contentImage: url,
        content: typedContent,
      })
        .then(() => {
          setDoc(doc(db, "comment", postId), { comments: [] });
          alert("게시물이 등록되었습니다.");
          setIsLoading(false);
          goToMain();
        })
        .catch((err) => {
          alert("글쓰기가 실패했습니다.");
          setIsLoading(false);
          console.log(err);
        });
      setIsLoading(false);
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
        alert("잘못된 접근입니다.");
        goToMain();
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? <LoadingState /> : null}
      <div className={styles.container}>
        당신의 반려동물 이야기를 공유해주세요!
        <TextInput
          width="100%"
          placeholder="제목을 입력해 주세요."
          hideLabel
          warn={warnTitleInput}
          maxLength={50}
          onChange={(data) => setTypedTitle(data.value)}
        />
        <FileUploaderDropContainer
          width="100%"
          labelText="이미지를 등록하기 위해 클릭하거나, 등록할 이미지를 드래그 해주세요. (업로드할 수 있는 이미지 파일은 1MB 이하)"
          fileSize={1}
          onError={() =>
            alert(
              "업로드할 수 있는 이미지 파일은 1MB 이하 사이즈만 가능합니다."
            )
          }
          onChange={(_, data) => setAttachment(data.result)}
        />
        <TextArea
          width="100%"
          placeholder="내용을 입력해 주세요."
          hideLabel
          warn={warnContentInput}
          maxLength={1000}
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
    </>
  );
};

export default Writing;
