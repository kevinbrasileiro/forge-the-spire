import { getRarityByValue, getTypeByValue } from "../utils/gameData";
import type { CardData } from "../utils/userDataTypes";

interface StsCardProps {
  card: CardData
  onClick?: () => void
}

export default function StsCard({card, onClick}: StsCardProps) {
  const raritySrc = getRarityByValue(card.rarity)?.src

  const backgroundSrc = `assets/backgrounds/bg_${card.type}_${card.color}.png`
  const bannerSrc = `assets/banners/banner_${raritySrc}.png`
  const frameSrc = `assets/frames/frame_${card.type}_${raritySrc}.png`

  const energySrc = `assets/energy/card_${card.color}_orb.png`
  const isCurseOrStatus = card.type === "curse" || card.type === "status"

  return (
    <div className="relative w-[250px] h-[375px]" onClick={onClick}>
      <img
        src={backgroundSrc}
        alt={`${card.type} ${card.color} background`}
        className="absolute w-full h-full z-10 object-cover"
      />

      <img
        src={bannerSrc}
        alt={`${card.rarity} banner`}
        className="absolute w-full h-full z-30 object-cover"
      />

      <img
        src={frameSrc}
        alt={`${card.type} ${card.rarity} frame`}
        className="absolute w-full h-full z-20 object-cover"
      />

      {!isCurseOrStatus && (
        <img
          src={energySrc}
          alt={`${card.color} orb`}
          className="absolute w-full h-full z-40 object-cover"
        />
      )}

      {!isCurseOrStatus && (
        <p className="absolute top-7.5 w-13 text-center text-3xl text-black-light font-bold z-50">
          {card.cost}
        </p>
      )}

      <p className="absolute bottom-40.75 w-full text-center text-black-light text-xs z-50">
        {getTypeByValue(card.type)?.label}
      </p>

      <p className="absolute top-11 w-full text-center text-lg text-white z-50 text-shadow-[2px_2px_0px_#000]">
        {card.title}
      </p>

      <p className="absolute bottom-25 w-full px-10 text-center text-white text-sm z-50">
        {card.description}
      </p>
    </div>
  )
}