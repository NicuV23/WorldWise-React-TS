import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { getFlagImageUrl } from "../../utils/getFlagImageUrl";
import { formattedDate } from "../../utils/formattedDate";

interface CityItemProps {
  country: string | undefined;
  id: number;
  cityName: string;
  countryCode: string;
  date: Date | null;
  notes: string;
  position?: {
    lat: number;
    lng: number;
  };
  onDelete: (id: number) => void;
}

function CityItem({
  id,
  cityName,
  countryCode,
  date,
  notes,
  onDelete,
}: CityItemProps) {
  // const formattedDateString = formattedDate(date);
  const navigate = useNavigate();

  const flagImageUrl = getFlagImageUrl(countryCode);

  return (
    <div className={styles.cityItem}>
      <div
        className={styles.group}
        onClick={() => {
          navigate(`${id}`);
        }}
      >
        <div>
          <img
            src={flagImageUrl}
            srcSet={`${flagImageUrl} 2x, ${flagImageUrl} 3x`}
            width="23"
            height="16"
            alt={countryCode}
          />
          <h2 className={styles.name}>{cityName}</h2>
        </div>
        <p className={styles.date}>({formattedDate(date)})</p>
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
