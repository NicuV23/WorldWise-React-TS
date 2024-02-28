import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../button/Button";
import BackButton from "../back-button/BackButton";
import styles from "./Form.module.css";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../message/Message";
import { Location, useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import FlagImage from "../flag-image/FlagImage";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const Form: React.FC = () => {
  const [lat, lng] = useUrlPosition();
  const { createLocation } = useCities();
  const navigate = useNavigate();

  const [location, setLocation] = useState<Location | null>(null);
  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setGeocodingError("");

        if (!lat || !lng) {
          throw new Error("Start by clicking somewhere on the map");
        }

        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        const newLocation = {
          country: data.countryName,
          cityName: data.city || data.locality,
          countryCode: data.countryCode,
          date: new Date(),
          notes: "",
          position: { lat, lng },
        };

        setLocation(newLocation);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setGeocodingError(err.message);
        }
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!location?.cityName || !location.date) {
      return;
    }

    createLocation(location);
    navigate("/app/cities");
  };

  if (!lat && !lng) {
    return <Message message="Start by clicking somewhere on the map" />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            setLocation({ ...location, [e.target.name]: e.target.value })
          }
          value={location?.cityName || ""}
        />
        <span className={styles.flag}>
          <FlagImage countryCode={location?.countryCode || ""} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {location?.cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setLocation({ ...location, date })}
          selected={location?.date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to {location?.cityName}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setLocation({ ...location, notes: e.target.value })}
          value={location?.notes || ""}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;
