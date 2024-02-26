import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import React from "react";

const AppNav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.cities}>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li className={styles.countries}>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
