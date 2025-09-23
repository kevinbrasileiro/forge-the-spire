import { BrowserRouter, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import CardsPage from "./pages/CardsPage";
import ConfigPage from "./pages/ConfigPage";
import { UserDataProvider } from "./UserDataContext";

const APP_VERSION = "0.1.0"

function AppContent() {
  return (
    <div className="h-screen m-4 flex gap-x-4 overflow-hidden">
      <Sidebar appVersion={APP_VERSION}/>
      <Routes>
        <Route index element={<CardsPage />}/>
        <Route path="/config" element={<ConfigPage />}/>
      </Routes>
    </div>
  )
}

export function App() {
  return (
    <UserDataProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserDataProvider>
  )
}
