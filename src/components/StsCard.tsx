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
  const shouldOrbAppear = card.type !== "curse" && card.type !== "status" && card.cost != -2

  return (
    <div className="relative w-[250px] h-[375px]" onClick={onClick}>
      <img
        src={backgroundSrc}
        alt={`${card.type} ${card.color} background`}
        className="absolute w-full h-full z-10 object-cover"
      />

      {card.art && (
        <img 
          src={card.art} 
          alt="Card Art"
          className={`absolute top-17 left-8 w-46 h-33 z-15 mask-[url(/assets/portrait-masks/${card.type}-mask.png)] mask-no-repeat mask-cover`}
        />
      )}

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

      {shouldOrbAppear && (
        <img
          src={energySrc}
          alt={`${card.color} orb`}
          className="absolute w-full h-full z-40 object-cover"
        />
      )}

      {shouldOrbAppear && (
        <p className="absolute top-7.25 w-14 text-center text-3xl text-black-light font-bold z-50">
          {card.cost >= 0 ? card.cost : "X"}
        </p>
      )}

      <p className="absolute bottom-40.75 w-full text-center text-black-light text-xs z-50">
        {getTypeByValue(card.type)?.label}
      </p>

      <p className="absolute top-11 w-full text-center text-lg text-white z-50 text-shadow-[2px_2px_0px_#000]">
        {card.title}
      </p>

      <p 
        className="absolute w-full px-10 text-center text-base/tight text-white z-50"
        style={{whiteSpace: 'pre', bottom: `${7 - 0.7 * card.description.split(/\n/).length}rem` }}
      >
        {card.description}
      </p>
    </div>
  )
}