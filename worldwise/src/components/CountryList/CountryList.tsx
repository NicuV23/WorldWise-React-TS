import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";
import React from "react";
import LoadingScreen from "../loadingScreen/loadingScreen";

const CountryList: React.FC = () => {
  const { cities, isLoading } = useCities();

  return (
    <LoadingScreen isLoading={isLoading} length={cities.length}>
      <ul className={styles.countryList}>
        {cities.map((country) => (
          <CountryItem countryName={country.country || ""} />
        ))}
      </ul>
    </LoadingScreen>
  );
};

export default CountryList;
