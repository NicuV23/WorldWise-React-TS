import React from "react";
import styles from "./CountryItem.module.css";
import { getFlagImageUrl } from "../../utils/getFlagImageUrl";

interface CountryItemProps {
  countryName: string;
  countryCode: string;
}

const CountryItem: React.FC<CountryItemProps> = ({
  countryName,
  countryCode,
}) => {
  const flagImageUrl = getFlagImageUrl(countryCode);

  return (
    <li className={styles.countryItem}>
      {countryName}
      <img
        key={countryName}
        className={styles.flagImg}
        src={flagImageUrl}
        srcSet={`${flagImageUrl} 2x, ${flagImageUrl} 3x`}
        width="30"
        height="19"
        alt={countryName}
      />
    </li>
  );
};

export default CountryItem;
