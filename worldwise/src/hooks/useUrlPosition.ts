import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");

  return [lat, lng];
};
