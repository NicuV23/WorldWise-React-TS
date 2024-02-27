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

interface CitiesContextProps extends CitiesState {
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
    const mockCitiesData: Location[] = [];

    dispatch({ type: "cities/loaded", payload: mockCitiesData });
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

      const city = state.locations.find((city) => city.id === Number(id));

      if (city) {
        dispatch({ type: "city/loaded", payload: city });
      } else {
        dispatch({
          type: "rejected",
          payload: "City not found",
        });
      }
    },
    [state.locations]
  );

  async function createLocation(newCity: Location) {
    const createdCity: Location = {
      ...newCity,
      id: state.locations.length + 1,
    };

    dispatch({ type: "city/created", payload: createdCity });
  }

  async function deleteCity(id: number) {
    dispatch({ type: "city/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        ...state,
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
