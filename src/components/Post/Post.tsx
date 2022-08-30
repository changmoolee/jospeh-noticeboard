import React from "react";
import styles from "./Post.module.scss";
import CommentContainer from "../CommentContainer/CommentContainer";
import UserImage from "../UserImage/UserImage";

const Post = ({ post }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.userInfo}>
          <div className={styles.userImageWrapper}>
            <UserImage userImageData={post.userImage} />
          </div>
          <div className={styles.nicknameAndTime}>
            <div className={styles.userNickname}>
              {post.userNickname ? post.userNickname : "익명"}
            </div>
            <div className={styles.createdTime}>{post.createdTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        {post.contentImage ? (
          <div className={styles.contentImageWrapper}>
            <img
              className={styles.contentImage}
              alt="contentImage"
              src={post.contentImage}
              referrerPolicy="no-referrer"
              onError={(e: any) =>
                (e.target.src =
                  "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=8e62d94f-3465-45bb-8cce-15476c91b727")
              }
            />
          </div>
        ) : null}
        <p className={styles.contentText}>{post.content}</p>
      </div>
      <CommentContainer post={post} />
    </div>
  );
};

export default Post;
