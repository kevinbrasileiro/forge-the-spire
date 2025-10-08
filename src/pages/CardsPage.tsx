import { useContext, useState } from "react"
import { UserDataContext } from "../UserDataContext"
import type { CardData } from "../utils/userDataTypes"
import { PlusIcon } from "@heroicons/react/24/solid"
import Button from "../components/Button"
import StsCard from "../components/StsCard"
import EditStsCard from "../components/EditStsCard"

export default function CardsPage() {
  const { userData, setUserData } = useContext(UserDataContext)
  const [ editingCard, setEditingCard ] = useState<CardData | null>(null)

  const handleNewCard = () => {
    const newCard: CardData = {
      id: crypto.randomUUID(),
      title: "Strike",
      color: "red",
      type: "attack",
      rarity: "common",
      description: "Deal !D! damage.",
      upgradedDescription: "Deal !D! damage.",
      art: "",

      cost: 1,
      upgradedCost: 1,
      target: 'enemy',
      cardProperties: {
        ethereal: "no",
        exhaust: "no",
        innate: "no",
        retain: "no",
      },
      vanillaVariables: {
        damage: {baseValue: 6, upgradedValue: 9},
        block: {baseValue: 0, upgradedValue: 0},
        magic: {baseValue: 0, upgradedValue: 0},
      }
    }

    setUserData((prev) => ({
      ...prev,
      cards: [...prev.cards, newCard],
    }))
    setEditingCard(newCard)
  }

  const handleSaveCard = (updatedCard: CardData) => {
    setUserData((prev) => ({
      ...prev,
      cards: prev.cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    }))
    setEditingCard(null)
  }

  const handleDeleteCard = (cardId: string) => {
    setUserData((prev) => ({
      ...prev,
      cards: prev.cards.filter((prevCard) => prevCard.id !== cardId)
    }))
    setEditingCard(null)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl tracking-widest text-center">
          Forge the Spire
        </h1>
        <h1 className="text-xl text-gold/75 font-light tracking-widest mb-6 text-center">
          Cards
        </h1>
        <div className="flex justify-center mb-12">
          <Button 
            className="flex text-center" 
            icon={ <PlusIcon className="w-5 h-5"/> } 
            variant="primary"
            onClick={handleNewCard}
          >  
            Add Card
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8">
        {userData.cards.map((card) => (
          <StsCard card={card} key={card.id} onClick={() => setEditingCard(card)}/>
        ))}
      </div>
      {editingCard && (
        <EditStsCard 
          card={editingCard}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
        />
      )}
    </div>
  )
}
