import React from "react";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: {
    country: string;
    emoji?: string | undefined;
  };
  key: string;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, key }) => {
  return (
    <div className={styles.countryItem}>
      <li key={key}>
        {country.country}{" "}
        {country.emoji && <span className={styles.emoji}>{country.emoji}</span>}
      </li>
    </div>
  );
};

export default CountryItem;
