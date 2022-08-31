import React, { useState, useEffect } from "react";
import styles from "./SortDropDown.module.scss";
import { DropDown } from "joseph-ui-kit";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { PostProperties } from "../../components/Post/Post";

const items = [
  { id: "desc", value: "최신순" },
  { id: "asc", value: "오래된순" },
];

interface SortDropDownProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<PostProperties[]>>;
}

type dataType = {
  selectedItem: {
    id: string | number;
    value: string | number;
  };
};

const SortDropDown = ({ setIsLoading, setPosts }: SortDropDownProps) => {
  const [sortMode, setSortMode] = useState<"asc" | "desc">("desc");

  const freeboardRef = collection(db, "freeboard");

  const first = query(freeboardRef, orderBy("createdTime", sortMode));

  useEffect(() => {
    setPosts([]);
    setIsLoading(true);
    getDocs(first)
      .then((res) => {
        res.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          setPosts((prev) => [...prev, doc.data()]);
        });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) =>
        console.log(err, "게시물 데이터를 불러오는데 실패했습니다.")
      );
  }, [sortMode]);

  return (
    <div className={styles.dropdownContainer}>
      <DropDown
        width="150px"
        label="정렬"
        hideWarn
        items={items}
        onChange={(data: dataType) => {
          if (data.selectedItem.id === "asc" || data.selectedItem.id === "desc")
            setSortMode(data.selectedItem.id);
        }}
      />
    </div>
  );
};

export default SortDropDown;
