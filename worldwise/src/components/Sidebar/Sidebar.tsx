import { Outlet } from "react-router-dom";
import AppNav from "../appNav/AppNav";
import Logo from "../logo/Logo";
import styles from "./Sidebar.module.css";
import React from "react";

interface SidebarProps {
  onCountryChange: (newCountry: string) => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
