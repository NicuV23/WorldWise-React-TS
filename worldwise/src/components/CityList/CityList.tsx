import styles from "./CityList.module.css";
import CityItem from "../cityItem/CityItem";
import { useCities } from "../../contexts/CitiesContext";
import React, { useMemo } from "react";
import LoadingScreen from "../loadingScreen/LoadingScreen";

function CityList() {
  const { cities, isLoading, deleteCity } = useCities();

  const handleDelete = (id: number) => {
    deleteCity(id);
  };

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
            country={undefined}
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
}

export default CityList;
