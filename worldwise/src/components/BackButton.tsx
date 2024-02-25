import { useNavigate } from "react-router-dom";
import Button from "./button/Button";
import React from "react";

interface BackButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleBackClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button type="back" onClick={handleBackClick}>
      &larr; Back
    </Button>
  );
};

export default BackButton;
