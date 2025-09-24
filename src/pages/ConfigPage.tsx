import { useContext } from "react";
import { UserDataContext } from "../UserDataContext";
import Dropdown from "../components/Dropdown";
import { Input } from "../components/Input";

export default function ConfigPage() {
  const { userData, setUserData } = useContext(UserDataContext)
  return (
    <main className="w-40 flex flex-col gap-y-4">
      <Dropdown
        label="Color"
        value={userData.cards[0].color}
        onChange={(e) => setUserData(
          {cards: [
            {title: userData.cards[0].title, color: e}
          ], characters: []}
        )}
        options={[
          {label: "Red", value: "red"}, 
          {label: "Green", value: "green"}, 
          {label: "Blue", value: "blue"},
          {label: "Purple", value: "purple"},
        ]}
      />
      <Input
        label="Card Title"
        value={userData.cards[0].title} 
        onChange={(e) => setUserData(
          {cards: [
            {title: e.target.value, color: userData.cards[0].color}
          ], characters: []}
        )}
        type="text"
      />
    </main>
  )
}
