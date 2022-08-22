import React from "react";
import styles from "./Comment.module.scss";

const Comment = ({ comment }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        {comment?.userImage ? (
          <img
            className={styles.userImage}
            alt="userimage"
            src={comment && comment?.userImage}
            onError={(e: any) =>
              (e.target.src =
                "https://firebasestorage.googleapis.com/v0/b/joseph-noticeboard.appspot.com/o/no-pictures.png?alt=media&token=0b467737-eb36-41df-9513-f674f8e6a121")
            }
          />
        ) : (
          <div className={styles.nullImage} />
        )}
        <div className={styles.nameAndTime}>
          <div className={styles.username}>{comment.user}</div>
          <div className={styles.createdTime}>{comment.createdTime}</div>
        </div>
      </div>
      <div className={styles.userComment}>
        <p>{comment.commentContent}</p>
      </div>
    </div>
  );
};

export default Comment;
