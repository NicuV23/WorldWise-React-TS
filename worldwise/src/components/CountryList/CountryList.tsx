import styles from "./CountryList.module.css";
import CountryItem from "../countryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";
import React, { useMemo } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const CountryList: React.FC = () => {
  const { cities, isLoading } = useCities();

  const memoizedCountries = useMemo(() => {
    return cities.map((country) => ({
      key: country.cityName,
      countryName: country.country || "",
      countryCode: country.countryCode || "",
    }));
  }, [cities]);

  return (
    <LoadingScreen isLoading={isLoading} length={cities.length}>
      <ul className={styles.countryList}>
        {memoizedCountries.map((country) => (
          <CountryItem
            key={country.key}
            countryName={country.countryName}
            countryCode={country.countryCode}
          />
        ))}
      </ul>
    </LoadingScreen>
  );
};

export default CountryList;
