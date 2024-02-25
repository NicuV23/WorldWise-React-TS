import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
  type?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
}: ButtonProps) => {
  const buttonClass = type ? styles[type] : "";
  return (
    <button
      onClick={
        onClick as React.MouseEventHandler<HTMLButtonElement> | undefined
      }
      className={`${styles.btn} ${buttonClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
