import styles from "./CountryList.module.css";
import CountryItem from "../country-item/CountryItem";
import { useCities } from "../../contexts/CitiesContext";
import React, { useMemo } from "react";
import LoadingScreen from "../loading-screen/LoadingScreen";

const CountryList: React.FC = () => {
  const { locations } = useCities();

  const memoizedCountryList = useMemo(() => {
    return (
      <ul className={styles.countryList}>
        {locations.map((country) => (
          <CountryItem
            key={country.cityName}
            countryName={country.country || ""}
            countryCode={country.countryCode || ""}
          />
        ))}
      </ul>
    );
  }, [locations]);

  return (
    <LoadingScreen isLoading={false} length={locations.length}>
      {memoizedCountryList}
    </LoadingScreen>
  );
};

export default CountryList;
