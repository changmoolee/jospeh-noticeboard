import React from "react";
import styles from "./Post.module.scss";

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
            />
          ) : (
            <div className={styles.nullImage} />
          )}

          <div className={styles.nameAndTime}>
            <div className={styles.username}>{post && post.userId}</div>
            <div className={styles.createdTime}>
              {post && post.created_time}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>{post && post.content}</div>
    </div>
  );
};

export default Post;
