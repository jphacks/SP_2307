import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  isOpening: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpening }) => {
  return (
    <>
      {
        isOpening ? (
          <div className={styles.modal}>
            {children}
          </div>) : null
      }
    </>
  )
}