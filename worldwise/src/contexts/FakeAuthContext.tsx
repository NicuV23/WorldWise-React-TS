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

interface AuthProviderProps {
  children: ReactNode;
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
  }
};

const FAKE_USER: User = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login: (email: string, password: string) => void = (
    email,
    password
  ) => {
    const isCredentialsValid =
      email === FAKE_USER.email && password === FAKE_USER.password;

    if (isCredentialsValid) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout: () => void = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthState;

export { AuthProvider };
