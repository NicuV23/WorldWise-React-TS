import styles from "./CityList.module.css";
import CityItem from "../cityItem/CityItem";
import { useCities } from "../../contexts/CitiesContext";
import React, { useMemo, useCallback } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";

const CityList: React.FC = () => {
  const { cities, isLoading, deleteCity } = useCities();

  const handleDelete = useCallback(
    (id: number) => {
      deleteCity(id);
    },
    [deleteCity]
  );

  const memoizedCityList = useMemo(() => {
    return (
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem
            onDelete={handleDelete}
            id={city?.id || 0}
            cityName={city.cityName || ""}
            countryCode={city.countryCode || ""}
            date={city.date || null}
            notes={city.notes || ""}
            key={city.id}
          />
        ))}
      </ul>
    );
  }, [cities, handleDelete]);

  return (
    <LoadingScreen isLoading={isLoading} length={cities.length}>
      {memoizedCityList}
    </LoadingScreen>
  );
};

export default CityList;
