// Message.tsx
import styles from "./Message.module.css";

interface MessageProps {
  message: string;
}

function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img" aria-label="Wave">
        👋
      </span>{" "}
      {message}
    </p>
  );
}

export default Message;
