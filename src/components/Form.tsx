import React, { useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

const Form = () => {
  console.log(db);

  const setData = async () => {
    console.log("set");
    return await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };

  const addData = async () => {
    console.log("add");
    return await addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: "Japan",
    });
  };
  const docRef = doc(db, "cities", "LA");

  const getData = async () => {
    const data = await getDoc(docRef);
    if (data.exists()) {
      console.log("Document data:", data.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <button onClick={setData}>setData</button>
      <button onClick={addData}>addData</button>
    </div>
  );
};

export default Form;
