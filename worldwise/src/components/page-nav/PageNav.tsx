import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
import styles from "./PageNav.module.css";
import React from "react";

const PageNav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li className={styles.pricing}>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
