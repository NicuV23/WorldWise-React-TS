import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
  Dispatch,
  FC,
} from "react";

const BASE_URL = "http://localhost:9000";

export interface Location {
  country?: string | undefined;
  id?: number;
  cityName?: string;
  countryCode?: string;
  date?: Date | null;
  notes?: string;
  position?:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
}

interface CitiesState {
  locations: Location[];
  isLoading: boolean;
  currentCity: Partial<Location>;
  error: string;
}

type CitiesAction =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: Location[] }
  | { type: "city/loaded"; payload: Location }
  | { type: "city/created"; payload: Location }
  | { type: "city/deleted"; payload: number }
  | { type: "rejected"; payload: string };

const initialState: CitiesState = {
  locations: [],
  isLoading: false,
  currentCity: {
    id: 0,
  },
  error: "",
};

const reducer: (state: CitiesState, action: CitiesAction) => CitiesState = (
  state,
  action
) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, locations: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        locations: [...state.locations, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        locations: state.locations.filter((city) => city.id !== action.payload),
        currentCity: {
          id: 0,
        },
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

interface CitiesContextProps {
  locations: Location[];
  isLoading: boolean;
  currentCity: Partial<Location>;
  error: string;
  getCity: (id: string) => Promise<void>;
  createLocation: (newCity: Location) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextProps | null>(null);
const CitiesDispatchContext = createContext<Dispatch<CitiesAction> | null>(
  null
);

interface CitiesProviderProps {
  children: ReactNode;
}

const CitiesProvider: FC<CitiesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (!id) {
        dispatch({
          type: "rejected",
          payload: "Invalid city ID",
        });
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        });
      }
    },
    [state.currentCity.id]
  );

  async function createLocation(newCity: Location) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id: number) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        locations: state.locations,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
        error: state.error,
        getCity,
        createLocation,
        deleteCity,
      }}
    >
      <CitiesDispatchContext.Provider value={dispatch}>
        {children}
      </CitiesDispatchContext.Provider>
    </CitiesContext.Provider>
  );
};

const useCities: () => CitiesContextProps = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("CitiesContext was used outside the CitiesProvider");
  }
  return context;
};

const useCitiesDispatch: () => Dispatch<CitiesAction> = () => {
  const dispatch = useContext(CitiesDispatchContext);
  if (!dispatch) {
    throw new Error(
      "CitiesDispatchContext was used outside the CitiesProvider"
    );
  }
  return dispatch;
};

export { CitiesProvider, useCities, useCitiesDispatch };
