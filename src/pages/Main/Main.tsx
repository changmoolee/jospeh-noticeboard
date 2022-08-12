import React, { useState, useEffect } from "react";
import Post from "../../components/Post/Post";
import { db } from "../../firebase";
import { collection, doc, getDocs, orderBy } from "firebase/firestore";
import { query } from "firebase/firestore";

const Main = () => {
  const [data, setData] = useState<any>([]);
  const freeboard = getDocs(collection(db, "freeboard"));

  useEffect(() => {
    freeboard
      .then((res) => {
        res.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          setData((data: any) => data.push({ id: doc.id, value: doc.data() }));
        });
      })
      .then(() => console.log("wow"));
  }, []);

  return <div></div>;
};

export default Main;
