import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import PageNav from "../../components/pageNav/PageNav";
import { useAuth } from "../../contexts/FakeAuthContext";
import styles from "./Login.module.css";

// Adăugați acest tip dacă useAuth returnează ceva cu login și isAuthenticated
type AuthProps = {
  login: (email: string, password: string) => void;
  isAuthenticated: boolean;
};

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  // Folosiți AuthProps pentru a specifica tipurile pentru login și isAuthenticated
  const { login, isAuthenticated } = useAuth() as AuthProps;
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          {/* Asigurați-vă că Button primește o funcție onClick în propria definiție */}
          <Button type="primary" onClick={() => handleSubmit}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
