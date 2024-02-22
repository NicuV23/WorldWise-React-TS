import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import BackButton from "../BackButton";
import styles from "./Form.module.css";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import { City, useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [city, setCity] = useState<City>();
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    if (!lat && !lng) {
      return;
    }

    const fetchCityData = async () => {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        console.log(lat, lng);

        const newCity = {
          country: data.countryName,
          cityName: data.city || data.locality,
          emoji: data.countryCode,
          date: new Date(),
          notes: "",
          position: { lat, lng },
        };

        setCity(newCity);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setGeocodingError(err.message);
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!city?.cityName || !city.date) {
      return;
    }

    await createCity(city);
    navigate("/app/cities");
  };

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            setCity({ ...city, [e.target.name]: e.target.value })
          }
          value={city?.cityName}
        />
        <span className={styles.flag}>{city?.emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {city?.cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setCity({ ...city, date })}
          selected={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {city?.cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setCity({ ...city, notes: e.target.value })}
          value={city?.notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
