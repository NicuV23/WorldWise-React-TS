import React, { ReactNode } from "react";
import Message from "../message/Message";

interface LoadingScreenProps {
  isLoading: boolean;
  length: number;
  children: ReactNode;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  length,
  children,
}) => {
  if (isLoading) {
    return null;
  }

  if (!length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return <div>{children}</div>;
};

export default LoadingScreen;
