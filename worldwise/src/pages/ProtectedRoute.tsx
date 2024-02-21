import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

type AuthProps = {
  isAuthenticated: boolean;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth() as AuthProps;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
