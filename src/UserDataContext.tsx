import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserData } from "./utils/userDataTypes";

interface UserDataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const USER_DATA_KEY = "forgethespire-user-data";

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<UserDataContextType>({
  userData: { cards: [], characters: [], modMeta: {modID: "forge-test", modName: "Forge Test"} },
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
            modMeta: {modID: "test", modName: "Test"},
            cards: [],
            characters: [],
          };
    } catch (err) {
      console.error("Failed to parse userData from localStorage", err);
      return {
        modMeta: {modID: "forge-test", modName: "Forge Test"},
        cards: [],
        characters: [],
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