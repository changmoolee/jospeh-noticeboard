import React from "react";
import styles from "./Post.module.scss";
import CommentContainer from "../CommentContainer/CommentContainer";

const Post = ({ post }: any) => {
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

          <div className={styles.nicknameAndTime}>
            <div className={styles.userNickname}>
              {post && post.userNickname}
            </div>
            <div className={styles.createdTime}>{post && post.createdTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>{post && post.content}</div>
      <CommentContainer post={post} />
    </div>
  );
};

export default Post;
