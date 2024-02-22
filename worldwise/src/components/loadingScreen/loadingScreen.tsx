import React, { ReactNode } from "react";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";

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
    return <Spinner />;
  }

  if (!length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }
  return <div>{children}</div>;
};

export default LoadingScreen;
