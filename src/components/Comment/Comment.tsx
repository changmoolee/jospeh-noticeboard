import React from "react";
import UserImage from "../UserImage/UserImage";
import styles from "./Comment.module.scss";

const Comment = ({ comment }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.userImageWrapper}>
          <UserImage userImageData={comment?.userImage} />
        </div>
        <div className={styles.nicknameAndTime}>
          <div className={styles.userNickname}>
            {comment.userNickname + " 님의 댓글"}
          </div>
          <div className={styles.createdTime}>{comment.createdTime}</div>
        </div>
      </div>
      <div className={styles.commentContent}>
        <p>{comment.commentContent}</p>
      </div>
    </div>
  );
};

export default Comment;
