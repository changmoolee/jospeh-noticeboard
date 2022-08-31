import React from "react";
import styles from "./Post.module.scss";
import CommentContainer from "../CommentContainer/CommentContainer";
import UserImage from "../UserImage/UserImage";

export interface PostPropertiesProps {
  content: string;
  contentImage: string;
  createdTime: string;
  postId: string;
  title: string;
  userId: string;
  userImage: string;
  userNickname: string;
}

export interface PostProps {
  post: PostPropertiesProps;
}

const Post = ({ post }: PostProps) => {
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
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                (
                  e.target as HTMLImageElement
                ).src = require("../../assets/images/no-camera.png");
              }}
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
