import React, { useState } from "react";
import Map from "../../components/Map/Map";
import Sidebar from "../../components/Sidebar/Sidebar";
import User from "../../components/User/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const [currentCountry, setCurrentCountry] = useState("Romania");

  const handleCountryChange = (newCountry: string) => {
    setCurrentCountry(newCountry);
  };

  return (
    <div className={styles.app}>
      <Sidebar onCountryChange={handleCountryChange} />
      <Map countryName={currentCountry} />
      <User />
    </div>
  );
}

export default AppLayout;
