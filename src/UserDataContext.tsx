import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserData {
  cards: string[]
}

interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const USER_DATA_KEY = "forgethespire-user-data";

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<UserDataContextType>({
  userData: { cards: ["carta1, carta2, carta3"] },
  setUserData: () => {},
});

type ContextProviderProps = {
  children: ReactNode;
};

export const UserDataProvider = ({ children }: ContextProviderProps) => {
  const loadUserData = useCallback((): UserData => {
    try {
      const stored = localStorage.getItem(USER_DATA_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            cards: ["carta1", "carta2", "carta3"]
          };
    } catch (err) {
      console.error("Failed to parse userData from localStorage", err);
      return {
        cards: ["carta1", "carta2", "carta3"]
      };
    }
  }, []);

  const [userData, setUserData] = useState<UserData>(() =>
    loadUserData()
  );

  useEffect(() => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }, [userData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};