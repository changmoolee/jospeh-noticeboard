import React from "react";
import styles from "./Post.module.scss";
import CommentContainer from "../CommentContainer/CommentContainer";
import UserImage from "../UserImage/UserImage";

const Post = ({ post }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{post && post.title}</div>
        <div className={styles.userInfo}>
          <div className={styles.userImageWrapper}>
            <UserImage userImageData={post.userImage} />
          </div>
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
