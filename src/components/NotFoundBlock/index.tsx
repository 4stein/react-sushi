import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock: React.FC = () => (
  <div className={styles.root}>
    <h1>
      <span>
        <img className={styles.smileimg} src="badSmile.png" alt="bad smile" />
      </span>
      <br />
      Nothing found
    </h1>
    <p className={styles.description}>
      Sorry, this page is not available in our online store
    </p>
  </div>
);
