import { useContext } from "react"
import { UserDataContext } from "../UserDataContext"
import type { CardData } from "../utils/userDataTypes"

export default function CardsPage() {
  const { userData, setUserData } = useContext(UserDataContext)
  return (
    <main>
      {userData.cards.map((card) => {
        return (
          <p>{card.title}</p>
        )
      })}
      <button
        onClick={() => {
          const newCard: CardData = {
            color: 'red',
            title: 'strike'
          }

          setUserData({...userData, cards: [...userData.cards, newCard]})
        }
        }>
        Add Card
      </button>
    </main>
  )
}
