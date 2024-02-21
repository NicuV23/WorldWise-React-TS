import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

interface City {
  id: string;
  cityName: string;
  emoji: string;
  date: string;
  country: string;
}

interface CountryListProps {
  cities: City[];
  isLoading: boolean;
}

const CountryList: React.FC<CountryListProps> = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );

  const countries = cities.reduce(
    (arr: { country: string; emoji: string }[], city) => {
      if (!arr.map((el) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      } else {
        return arr;
      }
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
