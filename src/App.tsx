import { BrowserRouter, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import CardsPage from "./pages/CardsPage";
import ConfigPage from "./pages/ConfigPage";
import { UserDataProvider } from "./UserDataContext";
import NotFoundPage from "./pages/NotFoundPage";

const APP_VERSION = "0.1.0"

function AppContent() {
  return (
    <div className="h-screen flex gap-x-4 overflow-hidden">
      <Sidebar appVersion={APP_VERSION}/>
        <main className="flex-1 flex flex-col overflow-y-auto p-4">
          <Routes>
            <Route index element={<CardsPage />}/>
            <Route path="/config" element={<ConfigPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </main>
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
