import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";

interface CountryCodes {
  [key: string]: string;
}

import countryCodes from "../../../data/countryCodes.json";

interface CityItemProps {
  id: number;
  cityName: string;
  emoji: string;
  date: string;
  notes: string;
  onDelete: (id: number) => void;
  countryCode: string;
}

const formattedDate = (date: string | undefined) =>
  date
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : "";

const getFlagImageUrl = (countryCode: string) => {
  const countryName = (countryCodes as CountryCodes)[countryCode.toLowerCase()];

  return `https://flagcdn.com/16x12/${countryName}.png`;
};

function CityItem({
  id,
  cityName,
  emoji,
  date,
  notes,
  onDelete,
  countryCode,
}: CityItemProps) {
  const formattedDateString = formattedDate(date);
  const navigate = useNavigate();

  const flagImageUrl = getFlagImageUrl(countryCode);

  return (
    <div className={styles.cityItem}>
      <div className={styles.group} onClick={() => navigate(`${id}`)}>
        <div>
          <img
            src={flagImageUrl}
            srcSet={`${flagImageUrl} 2x, ${flagImageUrl} 3x`}
            width="16"
            height="12"
            alt={emoji}
          />
          <h2 className={styles.name}>{cityName}</h2>
        </div>
        <p className={styles.date}>({formattedDateString})</p>{" "}
        <p className={styles.notes}>{notes}</p>
        <Link to={`/cities/${id}`} className={styles.link}></Link>
      </div>
      <button onClick={() => onDelete(id)} className={styles.deleteBtn}>
        &times;
      </button>
    </div>
  );
}

export default CityItem;
