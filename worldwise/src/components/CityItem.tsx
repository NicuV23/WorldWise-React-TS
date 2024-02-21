import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  console.log(id);

  return (
    <div className={styles.cityItem}>
      <div onClick={() => navigate(`${id}`)} className={styles.listItem}>
        <div>
          <span className={styles.emoji}>{emoji}</span>
          <h3>{cityName}</h3>
        </div>
        <p>{formattedDateString}</p> {/* Folosește formattedDateString aici */}
        <p>{notes}</p>
        <Link to={`/cities/${id}`} className={styles.link}></Link>
      </div>
      <button>delete</button>
    </div>
  );
}

export default CityItem;
