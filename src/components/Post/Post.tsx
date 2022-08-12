import React from "react";
import styles from "./Post.module.scss";

const Post = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>제목입니당</div>
        <div className={styles.userinfo}>
          <div className={styles.userimage}></div>
          <div className={styles.nameAndTime}>
            <div className={styles.username}>이름입니다</div>
            <div className={styles.createdTime}>2022.08.12</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>wwwwwadasd</div>
    </div>
  );
};

export default Post;
