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
            <div className={styles.userNickname}>{post.userNickname}</div>
            <div className={styles.createdTime}>{post.createdTime}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.contentImageWrapper}>
          {post.contentImage ? (
            <img
              className={styles.contentImage}
              alt="contentImage"
              src={post.contentImage}
              onError={(e: any) =>
                (e.target.src =
                  "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-camera.png?alt=media&token=7e7b3794-bc4a-469f-92f5-bdba30ed5226")
              }
            />
          ) : null}
        </div>
        {post.content}
      </div>
      <CommentContainer post={post} />
    </div>
  );
};

export default Post;
