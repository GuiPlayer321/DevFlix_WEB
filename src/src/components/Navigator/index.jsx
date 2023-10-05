import React from "react";
import styles from "./index.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Navigator({ page, setPage }) {
  const verificaPage = () => {
    if (page === 1) {
      setPage(1);
    } else {
      setPage(page - 1);
    }
  };
  return (
    <div className={styles.nav}>
      {page === 1 ? (
        <p className={styles.none}></p>
      ) : (
        <p className={styles.next} onClick={() => verificaPage()}>
          <FaArrowLeft size={20} />
        </p>
      )}
      <div className={styles.at}>
        <p className={styles.atual}>{page}</p>
      </div>
      <p className={styles.next} onClick={() => setPage(page + 1)}>
        <FaArrowRight size={20} />
      </p>
    </div>
  );
}
