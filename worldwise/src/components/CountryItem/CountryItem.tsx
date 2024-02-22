import React from "react";
import styles from "./CountryItem.module.css";
import { getFlagImageUrl } from "../../utils/getFlagImageUrl";

interface CountryItemProps {
  countryName: string;
}

const CountryItem: React.FC<CountryItemProps> = ({ countryName }) => {
  const flagImageUrl = getFlagImageUrl(countryName);

  return (
    <div className={styles.countryItem}>
      <li key={countryName}>
        {countryName}
        <img
          src={flagImageUrl}
          srcSet={`${flagImageUrl} 2x, ${flagImageUrl} 3x`}
          width="16"
          height="12"
          alt={countryName}
        />
      </li>
    </div>
  );
};

export default CountryItem;
