import { getRarityByValue, getTypeByValue } from "../utils/gameData";
import type { CardData } from "../utils/userDataTypes";

interface StsCardProps {
  card: CardData
  viewUpgraded?: boolean
  onClick?: () => void
}

export default function StsCard({card, onClick, viewUpgraded = false}: StsCardProps) {
  const raritySrc = getRarityByValue(card.rarity)?.src

  const backgroundSrc = `assets/backgrounds/bg_${card.type}_${card.color}.png`
  const bannerSrc = `assets/banners/banner_${raritySrc}.png`
  const frameSrc = `assets/frames/frame_${card.type}_${raritySrc}.png`

  const energySrc = `assets/energy/card_${card.color}_orb.png`
  const shouldOrbAppear = card.type !== "curse" && card.type !== "status" && card.cost != -2

  const formatDescription = (description: string) => {
    const damageValue = viewUpgraded ? card.vanillaVariables?.damage?.upgradedValue : card.vanillaVariables?.damage?.baseValue
    const blockValue = viewUpgraded ? card.vanillaVariables?.block?.upgradedValue : card.vanillaVariables?.block?.baseValue
    const magicValue = viewUpgraded ? card.vanillaVariables?.magic?.upgradedValue : card.vanillaVariables?.magic?.baseValue
    
    return description
    .replaceAll("!D!", String(damageValue || 0))
    .replaceAll("!B!", String(blockValue || 0))
    .replaceAll("!M!", String(magicValue || 0))
  }

  const formatCost = (cost: number) => {
    return cost >= 0 ? cost : "X"
  }

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
          className="absolute top-17.5 left-8 w-46 h-34 z-15" 
          style={{
            maskImage: `url(/assets/portrait-masks/${card.type}-mask.png)`,
            maskRepeat: "no-repeat",
            maskSize: "cover",
          }}
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
        <p className={`absolute top-6.5 w-13.75 text-center text-[28px] font-bold z-50 text-shadow-cost ${viewUpgraded ? "text-upgraded" : "text-white"}`}>
          {viewUpgraded ? formatCost(card.upgradedCost ?? card.cost) : formatCost(card.cost)}
        </p>
      )}

      <p className="absolute bottom-40.75 w-full text-center text-black-light text-xs z-50">
        {getTypeByValue(card.type)?.label}
      </p>

      <p className={`absolute top-11 w-full text-center text-lg z-50 text-shadow-title tracking-wider ${viewUpgraded ? "text-upgraded" : "text-white"}`}>
        {card.title + (viewUpgraded ? "+" : "")}
      </p>

      <p 
        className="absolute w-full px-10 text-center font-light text-base/tight text-goldwhite z-50 text-shadow-[2px_1px_0px_#2F3026]"
        style={{whiteSpace: 'pre', bottom: `${7 - 0.65 * card.description.split(/\n/).length}rem` }}
      >
        {viewUpgraded ? formatDescription(card.upgradedDescription ?? card.description) : formatDescription(card.description)}
      </p>
    </div>
  )
}