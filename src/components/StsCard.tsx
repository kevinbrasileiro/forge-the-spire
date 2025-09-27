import type { CardData } from "../utils/userDataTypes";

interface StsCardProps {
  card: CardData
  onClick: () => void
}

export default function StsCard({card}: StsCardProps) {
  console.log(card)
  const backgroundSrc = `assets/backgrounds/bg_${card.type}_${card.color}.png`
  const bannerSrc = `assets/banners/banner_${card.rarity}.png`
  const frameSrc = `assets/frames/frame_${card.type}_${card.rarity}.png`
  return (
    <div className="relative w-[300px] h-[420px] font-sans select-none">
      <img
        src={backgroundSrc}
        alt={`${card.type} ${card.color}`}
        className="absolute top-0 left-0 w-full h-auto z-10"
      />

      <img
        src={bannerSrc}
        alt={`${card.rarity}`}
        className="absolute top-0 left-0 w-full h-auto z-20"
      />

      <img
        src={frameSrc}
        alt={`${card.type} ${card.rarity}`}
        className="absolute inset-0 w-full h-full z-30 object-cover"
      />

      <div className="absolute top-4 left-4 right-4 text-white text-xl font-bold z-40 drop-shadow-md">
        {card.title}
      </div>

      <div className="absolute bottom-6 left-4 right-4 text-white text-base z-40 drop-shadow-md">
        {card.description}
      </div>
    </div>
  )
}