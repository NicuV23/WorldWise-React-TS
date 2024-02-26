import React, { useState } from "react";
import Map from "../../components/map/Map";
import Sidebar from "../../components/side-bar/Sidebar";
import User from "../../components/user/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [currentCountry, setCurrentCountry] = useState("Romania");

  const handleCountryChange = (newCountry: string) => {
    setCurrentCountry(newCountry);
  };

  return (
    <div className={styles.app}>
      <Sidebar onCountryChange={handleCountryChange} />
      <Map countryCode={currentCountry} />
      <User />
    </div>
  );
}

export default AppLayout;
