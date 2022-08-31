import React, { useState } from "react";
import styles from "./Main.module.scss";
// import { Loading } from "joseph-ui-kit";
import Post from "../../components/Post/Post";
import SortDropDown from "../../components/SortDropDown/SortDropDown";
import LoadingState from "../../components/LoadingState/LoadingState";
import { PostProperties } from "../../components/Post/Post";

const Main = () => {
  const [posts, setPosts] = useState<PostProperties[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SortDropDown setIsLoading={setIsLoading} setPosts={setPosts} />
      {isLoading ? (
        <LoadingState />
      ) : posts.length === 0 ? (
        <div className={styles.nullContainer}>등록된 데이터가 없습니다!</div>
      ) : (
        posts.map((post) => <Post post={post} key={post.createdTime} />)
      )}
    </>
  );
};

export default Main;
