import styles from "./CityList.module.css";
import CityItem from "../CityItem/CityItem";
import { useCities } from "../../contexts/CitiesContext";
import React from "react";
import LoadingScreen from "../loadingScreen/loadingScreen";
function CityList() {
  const { cities, isLoading, deleteCity } = useCities();

  const handleDelete = (id: number) => {
    deleteCity(id);
  };

  return (
    <LoadingScreen isLoading={isLoading} length={cities.length}>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem
            onDelete={handleDelete}
            id={city?.id || 0}
            cityName={city.cityName || ""}
            emoji={city.country || ""}
            date={city.date || null}
            notes={city.notes || ""}
            key={city.id}
            position={{
              lat: city?.position?.lat || 0,
              lng: city.position?.lng || 0,
            }}
          />
        ))}
      </ul>
    </LoadingScreen>
  );
}

export default CityList;
