import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";
import React from "react";
function CityList() {
  const { cities, isLoading, deleteCity } = useCities();

  const handleDelete = (id: number) => {
    deleteCity(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          onDelete={handleDelete}
          id={city.id}
          cityName={city.cityName || ""}
          emoji={city.emoji || ""}
          date={city.date || ""}
          notes={city.notes || ""}
          key={city.id}
        />
      ))}
    </ul>
  );
}

export default CityList;
