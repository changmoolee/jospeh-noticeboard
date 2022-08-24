import React, { useState, useEffect } from "react";
import styles from "./Main.module.scss";
import { Loading } from "joseph-ui-kit";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Post from "../../components/Post/Post";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    const freeboard = getDocs(collection(db, "freeboard"));

    freeboard
      .then((res) => {
        res.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          setPosts((prev: any) => [doc.data(), ...prev]);
        });
      })
      .then(() => setIsLoading(false))
      .catch((err) =>
        console.log(err, "게시물 데이터를 불러오는데 실패했습니다.")
      );
  }, []);

  return isLoading ? (
    <div className={styles.loadingContainer}>
      <Loading />
    </div>
  ) : posts.length === 0 ? (
    <div className={styles.nullContainer}>등록된 데이터가 없습니다!</div>
  ) : (
    posts.map((post: any) => <Post post={post} key={post.createdTime} />)
  );
};

export default Main;
