import type { CardData } from "../utils/userDataTypes";

interface StsCardProps {
  card: CardData
  onClick: () => void
}

export default function StsCard({card, onClick}: StsCardProps) {
  const backgroundSrc = `assets/backgrounds/bg_${card.type}_${card.color}.png`
  const bannerSrc = `assets/banners/banner_${card.rarity}.png`
  const frameSrc = `assets/frames/frame_${card.type}_${card.rarity}.png`
  const energySrc = `assets/energy/card_${card.color}_orb.png`

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

      <img
        src={energySrc}
        alt={`${card.color} orb`}
        className="absolute w-full h-full z-40 object-cover"
      />

      <p className="absolute top-7.5 w-13 text-center text-3xl text-white z-50 text-shadow-[1px_1px_0px_#000]">
        {card.cost}
      </p>

      <p className="absolute bottom-40.75 w-full text-center text-black-light text-xs z-50 drop-shadow-md">
        {card.type}
      </p>

      <p className="absolute top-11 w-full text-center text-lg text-white z-50 text-shadow-[1px_1px_0px_#000]">
        {card.title}
      </p>

      <p className="absolute bottom-24 w-full text-center text-white text-sm z-50 drop-shadow-md">
        Deal 8 damage.
        <br />
        Apply 2 vulnerbale
      </p>
    </div>
  )
}