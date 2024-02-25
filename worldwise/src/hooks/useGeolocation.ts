import { useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

const useGeolocation = (defaultPosition: Position) => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(
    defaultPosition || null
  );
  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, position, error, getPosition };
};

export default useGeolocation;
