import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formattedDate } from "../../utils/FormattedDate";
import FlagImage from "../FlagImage";

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

const CityItem: React.FC<CityItemProps> = ({
  id,
  cityName,
  date,
  notes,
  countryCode,
  onDelete,
}: CityItemProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.cityItem}>
      <div
        className={styles.group}
        onClick={() => {
          navigate(`${id}`);
        }}
      >
        <div>
          <FlagImage countryCode={countryCode || ""} />
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
};

export default CityItem;
