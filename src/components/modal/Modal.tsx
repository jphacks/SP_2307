import React, { ReactNode } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  isOpening: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpening, onClose, onComplete }) => {
  return (
    <>
      {
        isOpening ? (
          <div className={styles.modal}>
            <div className={styles.padding}>
              <div className={styles.stack}>
                <div className={styles.header}>
                  <button className="btn btn-circle" onClick={() => onClose()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <button className="btn btn-primary" onClick={() => onComplete()}>
                    追加
                  </button>
                </div>
                <div className={styles.content}>
                  {children}
                </div>
              </div>
            </div>
          </div>) : null
      }
    </>
  )
}