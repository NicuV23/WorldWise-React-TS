import React from "react";
import styles from "./Message.module.css";

interface MessageProps {
  message: string; // sau orice alt tip corespunzător
}

function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
