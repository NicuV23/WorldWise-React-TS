import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import PageNav from "../../components/page-nav/PageNav";
import { useAuth } from "../../contexts/FakeAuthContext";
import styles from "./Login.module.css";

type AuthProps = {
  login: (email: string, password: string) => void;
  isAuthenticated: boolean;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth() as AuthProps;
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      login(email, password);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={handleEmailChange}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={() => handleSubmit}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
