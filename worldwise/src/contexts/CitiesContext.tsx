import React, {
  createContext,
  useContext,
  useEffect,
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
  isLoading: boolean;
  currentCity: Partial<Location>;
  error: string;
}

interface CitiesContextProps extends CitiesState {
  getCity: (id: string) => Promise<void>;
  createLocation: (newCity: Location) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextProps | null>(null);

interface CitiesProviderProps {
  children: ReactNode;
}

const CitiesProvider: FC<CitiesProviderProps> = ({ children }) => {
  const [state, setState] = useState<CitiesState>({
    locations: [],
    isLoading: false,
    currentCity: {
      id: 0,
    },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const initialData: Location[] = [];

        setState((prev) => ({
          ...prev,
          locations: initialData,
          isLoading: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Error loading initial data",
        }));
      }
    };

    fetchData();
  }, []);

  const getCity = async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const cityById: Location | undefined = state.locations.find(
        (city) => city.id === Number(id)
      );

      if (cityById) {
        setState((prev) => ({
          ...prev,
          currentCity: cityById,
          isLoading: false,
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error getting city by ID",
      }));
    }
  };

  const createLocation = async (newCity: Location) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const createdCity: Location = {
        ...newCity,
        id: state.locations.length + 1,
      };

      setState((prev) => ({
        ...prev,
        locations: [...prev.locations, createdCity],
        currentCity: createdCity,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error creating city",
      }));
    }
  };

  const deleteCity = async (id: number) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const updatedLocations = state.locations.filter((city) => city.id !== id);

      setState((prev) => ({
        ...prev,
        locations: updatedLocations,
        currentCity: { id: 0 },
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Error deleting city",
      }));
    }
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

const useCities = (): CitiesContextProps => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
};

export { CitiesProvider, useCities };
export type { Location };
