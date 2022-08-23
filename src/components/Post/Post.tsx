import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import { Button, TextInput } from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import Comment from "../Comment/Comment";

const Post = ({ post }: any) => {
  const [typedComment, setTypedComment] = useState("");
  const [warnComment, setWarnComment] = useState("");
  const [isOpenMoreComments, isSetOpenMoreComments] = useState(false);
  const [comments, setComments] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  const openMoreComment = () => {
    isSetOpenMoreComments(true);
  };

  const closeComment = () => {
    isSetOpenMoreComments(false);
  };

  const postComment = () => {
    const commentId = uuidv4();
    if (!typedComment) {
      setWarnComment("아무것도 입력하지 않으셨습니다.");
    } else {
      setWarnComment("");

      const commentRef = doc(db, "comment", post.postId);

      updateDoc(commentRef, {
        comments: [
          ...comments,
          {
            commentId: commentId,
            createdTime: new Date().toLocaleString(),
            userId: user?.uid,
            userImage: user?.photoURL,
            user: user?.displayName,
            commentContent: typedComment,
          },
        ],
      })
        .then(() => {
          const comment = getDoc(doc(db, "comment", post.postId));

          comment
            .then((doc: any) => {
              if (doc.data()?.comments) {
                setComments(doc.data()?.comments);
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const comment = getDoc(doc(db, "comment", post.postId));

    comment
      .then((doc: any) => {
        if (doc.data()?.comments) {
          setComments(doc.data()?.comments);
        }
      })
      .catch((err) => console.log(err));
  }, [warnComment, post.postId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{post && post.title}</div>
        <div className={styles.userInfo}>
          {post.userImage ? (
            <img
              className={styles.userImage}
              alt="userimage"
              src={post && post.userImage}
              onError={(e: any) =>
                (e.target.src =
                  "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-pictures.png?alt=media&token=0b467737-eb36-41df-9513-f674f8e6a121")
              }
            />
          ) : (
            <div className={styles.nullImage} />
          )}

          <div className={styles.nameAndTime}>
            <div className={styles.username}>{post && post.userId}</div>
            <div className={styles.createdTime}>{post && post.createdTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>{post && post.content}</div>
      <div className={styles.commentBox}>
        <div className={styles.inputWrapper}>
          <TextInput
            width="100%"
            placeholder="댓글을 입력해 주세요."
            hideLabel
            warn={warnComment}
            maxLength={500}
            onChange={(data) => setTypedComment(data.value)}
          />
        </div>
        <Button
          width="80px"
          padding="0"
          position="center"
          name="댓글 달기"
          onClick={postComment}
        />
      </div>
      {comments?.length === 0 ? (
        <div className={styles.noComment}>댓글이 없습니다.</div>
      ) : comments?.length === 1 ? (
        <Comment comment={comments[0]} />
      ) : isOpenMoreComments ? (
        <>
          {comments.map((comment: any) => (
            <Comment comment={comment} key={comment.commentId} />
          ))}
          <Button
            kind="tertiary"
            position="center"
            width="100%"
            padding="0"
            name="댓글 감추기"
            onClick={closeComment}
          />
        </>
      ) : (
        <>
          <Comment comment={comments[0]} />
          <Button
            kind="tertiary"
            position="center"
            width="100%"
            padding="0"
            name={`댓글 ${comments.length - 1} 개 더보기`}
            onClick={openMoreComment}
          />
        </>
      )}
    </div>
  );
};

export default Post;
