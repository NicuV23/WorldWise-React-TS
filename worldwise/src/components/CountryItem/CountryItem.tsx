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
  const { country: countryName, emoji } = country;

  return (
    <div className={styles.countryItem}>
      <li key={key}>
        {countryName}
        {emoji && (
          <img
            src={`https://flagcdn.com/16x12/${emoji}.png`}
            srcSet={`https://flagcdn.com/32x24/${emoji}.png 2x,
    https://flagcdn.com/48x36/${emoji}.png 3x`}
            width="16"
            height="12"
            alt={emoji}
          />
        )}
      </li>
    </div>
  );
};

export default CountryItem;
