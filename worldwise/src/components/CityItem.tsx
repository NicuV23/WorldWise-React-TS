import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";

interface CityItemProps {
  id: number;
  cityName: string;
  emoji: string;
  date: string;
  notes: string;
  onDelete: (id: number) => void;
}

const formattedDate = (date: string | undefined) =>
  date
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date))
    : "";

function CityItem({
  id,
  cityName,
  emoji,
  date,
  notes,
  onDelete,
}: CityItemProps) {
  const formattedDateString = formattedDate(date);
  const navigate = useNavigate();

  return (
    <div className={styles.cityItem}>
      <div className={styles.group} onClick={() => navigate(`${id}`)}>
        <div>
          <span className={styles.emoji}>{emoji}</span>
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
