import React from "react";
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

interface CityItemProps {
  id: number;
  cityName: string;
  emoji: string;
  date: string;
  notes: string;
}

const formattedDate = (date: string | undefined) =>
  date
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : "";

function CityItem({ id, cityName, emoji, date, notes }: CityItemProps) {
  const formattedDateString = formattedDate(date);

  return (
    <div className={styles.cityItem}>
      <div>
        <span className={styles.emoji}>{emoji}</span>
        <h3>{cityName}</h3>
      </div>
      <p>{formattedDateString}</p> {/* Folosește formattedDateString aici */}
      <p>{notes}</p>
      <Link to={`/cities/${id}`} className={styles.link}>
        View Details
      </Link>
    </div>
  );
}

export default CityItem;
