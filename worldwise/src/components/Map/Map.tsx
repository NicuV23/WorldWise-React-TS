import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { Location, useCities } from "../../contexts/CitiesContext";
import Button from "../button/Button";
import React, { useEffect, useMemo, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import FlagImage from "../flag-image/FlagImage";

interface MapProps {
  countryCode: string;
}

const Map: React.FC<MapProps> = () => {
  const navigate = useNavigate();

  const { cities } = useCities();
  const defaultPosition = { lat: 40, lng: 0 };
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(defaultPosition);

  const [mapPosition, setMapPosition] = useState<[number, number]>([
    defaultPosition.lat,
    defaultPosition.lng,
  ]);
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  const markers = useMemo(() => {
    return cities.map((city: Location) => (
      <Marker
        position={
          city?.position ? [city.position.lat, city.position.lng] : [0, 0]
        }
        key={city.id}
      >
        <Popup>
          <FlagImage countryCode={city.countryCode} />
          <span>{city.cityName}</span>
        </Popup>
      </Marker>
    ));
  }, [cities]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {markers}

        <ChangeCenter position={mapPosition} />
        <DetectClick navigate={navigate} />
      </MapContainer>
    </div>
  );
};

interface ChangeCenterProps {
  position: [number, number];
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);
  return null;
}

interface DetectClickProps {
  navigate: (url: string) => void;
}

function DetectClick({ navigate }: DetectClickProps) {
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;
