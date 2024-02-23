import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { getFlagImageUrl } from "../../utils/getFlagImageUrl";

interface CityItemProps {
  id: number;
  cityName: string;
  emoji: string;
  date: Date | null;
  notes: string;
  position?: {
    lat: number;
    lng: number;
  };
  onDelete: (id: number) => void;
}
const formattedDate = (date: string | Date | null): string => {
  if (!date) {
    return "";
  }

  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = new Date(date);
  } else if (date instanceof Date) {
    parsedDate = date;
  } else {
    throw new Error(
      "Invalid date input. Please provide a valid Date object or a string in ISO 8601 format."
    );
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

function CityItem({
  id,
  cityName,
  emoji,
  date,
  notes,
  onDelete,
}: CityItemProps) {
  // const formattedDateString = formattedDate(date);
  const navigate = useNavigate();

  const flagImageUrl = getFlagImageUrl(emoji);

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
            alt={emoji}
          />
          <h2 className={styles.name}>{cityName}</h2>
        </div>
        <p className={styles.date}>({formattedDate(date)})</p>{" "}
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
