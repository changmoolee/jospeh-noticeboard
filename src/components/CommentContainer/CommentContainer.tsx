import React, { useState, useEffect } from "react";
import styles from "./CommentContainer.module.scss";
import { useAppSelector } from "../../app/hooks";
import {
  selectIsLoggedIn,
  selectUserId,
  selectUserImage,
  selectUserNickname,
} from "../../features/auth/authSlice";
import { Button, SkeletonUI, TextInput } from "joseph-ui-kit";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import Comment from "../Comment/Comment";
import UserImage from "../UserImage/UserImage";
import { PostProps } from "../Post/Post";
import { CommentProperties } from "../Comment/Comment";

interface CommentContainerProps extends PostProps {}

const CommentContainer = ({ post }: CommentContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [typedCommentInput, setTypedCommentInput] = useState("");
  const [warnCommentInput, setWarnCommentInput] = useState("");
  const [isOpenMoreComments, isSetOpenMoreComments] = useState(false);
  const [currentComments, setCurrentComments] = useState([]);

  const openMoreComment = () => {
    isSetOpenMoreComments(true);
  };

  const closeMoreComment = () => {
    isSetOpenMoreComments(false);
  };

  const userId = useAppSelector(selectUserId);
  const userNickname = useAppSelector(selectUserNickname);
  const userImage = useAppSelector(selectUserImage);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const postComment = () => {
    setIsLoading(true);
    const commentId = uuidv4();
    if (!typedCommentInput) {
      setWarnCommentInput("아무것도 입력하지 않으셨습니다.");
    } else {
      setWarnCommentInput("");

      const commentRef = doc(db, "comment", post.postId);

      const newComment = {
        commentId: commentId,
        createdTime: new Date().toLocaleString(),
        userId: userId,
        userNickname: userNickname,
        userImage: userImage,
        commentContent: typedCommentInput,
      };

      updateDoc(commentRef, {
        comments: [...currentComments, newComment],
      })
        .then(() => {
          const updatedComment = getDoc(doc(db, "comment", post.postId));

          updatedComment
            .then((doc) => {
              if (doc.data()?.comments) {
                setCurrentComments(doc.data()?.comments);
              }
            })
            .catch((err) => {
              console.log(err, "업데이트가 완료된 댓글을 불러오지 못했습니다.");
            });
        })
        .catch((err) =>
          console.log(err, "새로운 댓글 업데이트를 실패했습니다.")
        );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const comment = getDoc(doc(db, "comment", post.postId));

    comment
      .then((doc) => {
        if (doc.data()?.comments) {
          setCurrentComments(doc.data()?.comments);
        }
      })
      .catch((err) => console.log(err, "댓글 데이터를 불러오지 못했습니다."));
    setIsLoading(false);
  }, [post.postId]);

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.commentBox}>
          <div className={styles.userImageWrapper}>
            <UserImage userImageData={userImage} />
          </div>
          {isLoading ? (
            <SkeletonUI width="100%">
              <div className={styles.skeletonInputWrapper}></div>
            </SkeletonUI>
          ) : (
            <>
              <div className={styles.commentInputWrapper}>
                <TextInput
                  width="100%"
                  placeholder="댓글을 입력해 주세요."
                  hideLabel
                  warn={warnCommentInput}
                  maxLength={500}
                  onChange={(data) => setTypedCommentInput(data.value)}
                />
              </div>
              <Button
                width="50px"
                padding="0"
                position="center"
                name="게시"
                onClick={postComment}
              />
            </>
          )}
        </div>
      ) : (
        <div className={styles.noSignInComment}>
          댓글을 남기려면
          <a href="/signin"> 로그인</a>
        </div>
      )}
      {isLoading ? (
        <SkeletonUI width="100%">
          <div className={styles.noComment} />
        </SkeletonUI>
      ) : currentComments?.length === 0 ? (
        <div className={styles.noComment}>댓글이 없습니다.</div>
      ) : currentComments?.length === 1 ? (
        <Comment comment={currentComments[0]} />
      ) : isOpenMoreComments ? (
        <>
          {currentComments.map((comment: CommentProperties) => (
            <Comment comment={comment} key={comment.commentId} />
          ))}
          <Button
            kind="tertiary"
            position="center"
            width="100%"
            padding="0"
            name="댓글 감추기"
            onClick={closeMoreComment}
          />
        </>
      ) : (
        <>
          <Comment comment={currentComments[0]} />
          <Button
            kind="tertiary"
            position="center"
            width="100%"
            padding="0"
            name={`댓글 ${currentComments.length - 1} 개 더보기`}
            onClick={openMoreComment}
          />
        </>
      )}
    </>
  );
};

export default CommentContainer;
