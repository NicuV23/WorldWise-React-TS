import React, {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
} from "react";

interface Location {
  country?: string | undefined;
  id?: number;
  cityName?: string;
  countryCode?: string;
  date?: Date | null;
  notes?: string;
  position?: { lat: number; lng: number } | undefined;
}

interface CitiesState {
  locations: Location[];
  currentCity: Partial<Location>;
  error: string;
}

interface CitiesContextProps extends CitiesState {
  getCity: (id: string) => void;
  createLocation: (newCity: Location) => void;
  deleteCity: (id: number) => void;
}

interface CitiesProviderProps {
  children: ReactNode;
}

const CitiesContext = createContext<CitiesContextProps | null>(null);

const [state, setState] = useState<CitiesState>({
  locations: [],
  currentCity: {
    id: 0,
  },
  error: "",
});

const CitiesProvider: FC<CitiesProviderProps> = ({ children }) => {
  const getCity = (id: string) => {
    setState((prev) => {
      if (prev.currentCity.id === Number(id)) {
        return prev;
      }

      const cityById: Location | undefined = prev.locations.find(
        (city) => city.id === Number(id)
      );

      return {
        ...prev,
        currentCity: cityById || prev.currentCity,
      };
    });
  };

  const createLocation = (newCity: Location) => {
    setState((prev) => {
      const createdCity: Location = {
        ...newCity,
        id: prev.locations.length + 1,
      };

      return {
        ...prev,
        locations: [...prev.locations, createdCity],
        currentCity: createdCity,
      };
    });
  };

  const deleteCity = (id: number) => {
    setState((prev) => {
      const updatedLocations = prev.locations.filter((city) => city.id !== id);
      return {
        ...prev,
        locations: updatedLocations,
        currentCity: { id: 0 },
      };
    });
  };

  return (
    <CitiesContext.Provider
      value={{
        ...state,
        getCity,
        createLocation,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider };
export type { Location };

export const useCities = (): CitiesContextProps => useContext(CitiesContext)!;
