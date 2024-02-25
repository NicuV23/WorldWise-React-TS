import React from "react";
import styles from "./CountryItem.module.css";
import FlagImage from "../flagImage/FlagImage";
interface CountryItemProps {
  countryName: string;
  countryCode: string;
}

const CountryItem: React.FC<CountryItemProps> = ({
  countryName,
  countryCode,
}) => {
  return (
    <li className={styles.countryItem}>
      {countryName}

      <FlagImage countryCode={countryCode} />
    </li>
  );
};

export default CountryItem;
