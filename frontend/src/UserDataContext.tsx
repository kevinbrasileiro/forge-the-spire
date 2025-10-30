import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { UserData } from "./utils/userDataTypes"

interface UserDataContextType {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const USER_DATA_KEY = "forgethespire-user-data"

const fallBackUserData: UserData = {
  modMeta: {
    id: "fts-test",
    name: "Forge the Spire Mod",
    author: "fts",
    description: "Mod made using the website Forge The Spire",
    version: "1.0.0"
  },
  cards: [],
  characters: [],
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext<UserDataContextType>({
  userData: fallBackUserData,
  setUserData: () => {},
})

type ContextProviderProps = {
  children: ReactNode
}

export const UserDataProvider = ({ children }: ContextProviderProps) => {
  const loadUserData = useCallback((): UserData => {
    try {
      const stored = localStorage.getItem(USER_DATA_KEY)
      return stored
        ? JSON.parse(stored)
        : fallBackUserData
    } catch (err) {
      console.error("Failed to parse userData from localStorage", err)
      return fallBackUserData
    }
  }, [])

  const [userData, setUserData] = useState<UserData>(() =>
    loadUserData()
  )

  useEffect(() => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
  }, [userData])

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}