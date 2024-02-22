import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";
import React from "react";

interface Country {
  country: string;
  emoji: string | undefined;
}

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries: Country[] = cities.reduce((arr, city) => {
    if (!arr.find((el) => el.country === city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, [] as Country[]);

  return (
    <div>
      <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
