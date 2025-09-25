import type { CardData } from "../utils/userDataTypes";

interface StsCardProps {
  card: CardData
  onClick: () => void
}

export default function StsCard({card, onClick}: StsCardProps) {
  return (
    <div 
      className="bg-primary text-center w-48 h-64"
      onClick={onClick}
    >
      {card.title}
    </div>
  )
}