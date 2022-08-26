import React from "react";
import styles from "./LoadingState.module.scss";
import { Loading } from "joseph-ui-kit";

const LoadingState = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loading />
      <div className={styles.dim} />
    </div>
  );
};

export default LoadingState;
