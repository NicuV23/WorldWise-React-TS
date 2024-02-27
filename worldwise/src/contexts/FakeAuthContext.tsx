import React, {
  createContext,
  useContext,
  useReducer,
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
}

type AuthAction =
  | { type: "login"; payload: AuthState["user"] }
  | { type: "logout" };

const AuthContext = createContext<
  | {
      user: AuthState["user"];
      isAuthenticated: AuthState["isAuthenticated"];
      login: (email: string, password: string) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const reducer: (state: AuthState, action: AuthAction) => AuthState = (
  state,
  action
) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email: string, password: string): void => {
    const authenticatedUser: User = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword",
      avatar: "https://i.pravatar.cc/100?u=zz",
    };

    if (
      email === authenticatedUser.email &&
      password === authenticatedUser.password
    ) {
      dispatch({ type: "login", payload: authenticatedUser });
    }
  };

  const logout = (): void => {
    dispatch({ type: "logout" });
  };

  const contextValue = { user, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = (): {
  user: AuthState["user"];
  isAuthenticated: AuthState["isAuthenticated"];
  login: (email: string, password: string) => void;
  logout: () => void;
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext was used outside AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
