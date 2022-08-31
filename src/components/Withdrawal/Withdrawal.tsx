import React, { useState } from "react";
import styles from "./Withdrawal.module.scss";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "joseph-ui-kit";
import { db } from "../../firebase";
import { getAuth, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import LoadingState from "../LoadingState/LoadingState";

const Withdrawal = () => {
  const auth = getAuth();

  const user = auth?.currentUser;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const withdrawFromApp = async () => {
    if (user !== null) {
      setIsLoading(true);
      deleteUser(user)
        .then(async () => {
          await deleteDoc(doc(db, "userNickname", user.uid));
          // 닉네임 컬렉션(닉네임 중복 여부 확인)에서도 삭제

          const storage = getStorage();
          const userImageRef = ref(storage, user.uid);

          if (user.photoURL) {
            deleteObject(userImageRef)
              .then(() => {
                // File deleted successfully
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error, "유저 이미지 삭제에 실패했습니다.");
              });
          }
          // storage에서 유저 이미지가 등록되어 있다면 삭제

          alert("회원탈퇴가 완료되었습니다.");
          setIsLoading(false);
          closeModal();
          goToMain();
        })
        .catch((err) => {
          if (err.code === "auth/requires-recent-login") {
            alert(
              "로그인을 한지 오랜시간이 경과되어 회원탈퇴가 불가능합니다. 재로그인이 필요합니다."
            );
          }
          console.log(err);
          alert("회원탈퇴에 실패했습니다.");
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Button
        kind="danger"
        name="회원탈퇴하기"
        width="100%"
        padding="0"
        position="center"
        onClick={openModal}
      />
      {isModalOpen ? (
        <Modal
          label="회원탈퇴"
          title="회원탈퇴를 하시겠습니까?"
          firstButtonText="회원탈퇴"
          firstButtonOnClick={withdrawFromApp}
          secondaryButtonText="취소"
          secondaryButtonOnClick={closeModal}
          closeModal={closeModal}
        >
          <p className={styles.paragraph}>
            <span>회원탈퇴시,</span>
            <br />
            <br />
            사용자가 게시했던 게시물과 댓글들을 제외한, 사용자의 프로필 이미지,
            닉네임은 삭제됩니다.
            <br />
            <br />
            <span>정말로 탈퇴하시겠습니까?</span>
          </p>
          {isLoading ? <LoadingState /> : <></>}
        </Modal>
      ) : null}
    </>
  );
};

export default Withdrawal;
