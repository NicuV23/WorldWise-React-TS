import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const login: AuthState["login"] = (email, password) => {
    const isCredentialsValid =
      email === FAKE_USER.email && password === FAKE_USER.password;

    if (isCredentialsValid) {
      setUser(FAKE_USER);
    }
  };

  const logout: AuthState["logout"] = () => {
    setUser(null);
  };

  const contextValue: AuthState = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth = (): AuthState => useContext(AuthContext)!;
