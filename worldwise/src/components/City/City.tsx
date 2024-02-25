import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import BackButton from "../backButton/BackButton";
import styles from "./City.module.css";
import Spinner from "../spinner/Spinner";
import FlagImage from "../flagImage/FlagImage";
import { formattedDate } from "../../utils/FormattedDate";

const City: React.FC = () => {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if (id) {
      getCity(id);
    }
  }, [id, getCity]);

  const { cityName, countryCode, notes } = currentCity;

  if (isLoading) return <Spinner />;

  if (!currentCity.id) {
    return <div>Error: City not found</div>;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <FlagImage countryCode={countryCode} /> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {formattedDate(currentCity.date || "")}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
