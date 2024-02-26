import styles from "./CityList.module.css";
import CityItem from "../city-item/CityItem";
import { useCities } from "../../contexts/CitiesContext";
import React, { useMemo, useCallback } from "react";
import LoadingScreen from "../loading-screen/LoadingScreen";

const CityList: React.FC = () => {
  const { locations, isLoading, deleteCity } = useCities();

  const handleDelete = useCallback(
    (id: number) => {
      deleteCity(id);
    },
    [deleteCity]
  );

  const memoizedCityList = useMemo(() => {
    return (
      <ul className={styles.cityList}>
        {locations.map((city) => (
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
  }, [locations, handleDelete]);

  return (
    <LoadingScreen isLoading={isLoading} length={locations.length}>
      {memoizedCityList}
    </LoadingScreen>
  );
};

export default CityList;
