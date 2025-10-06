export interface UserData {
  modMeta: ModMeta
  cards: CardData[]
  characters: CharacterData[]
}

export interface ModMeta {
  modName: string
  modID: string
}
export interface CardData {
  // INFO
  id: string
  title: string
  color: string
  type: "attack" | "skill" | "power" | "status" | "curse"
  rarity: "basic" | "common" | "uncommon" | "rare" | "special" | "curse"
  description: string
  upgradedDescription?: string
  art?: string
  
  //USAGE
  cost: number
  upgradedCost?: number
  target: "self" | "enemy" | "all" | "everyone"
  cardProperties: Record<PropertyKeyword, CardProperty>
  vanillaVariables: {
    damage: CardVariable,
    block: CardVariable,
    magic: CardVariable
  }
  customVariables?: Record<string, CardVariable>
  actions?: CardAction[]
}

export type PropertyKeyword = "exhaust" | "ethereal" | "innate" | "retain"
type CardProperty = "no" | "removed" | "obtained" | "yes"

export type CardVariable = {
  baseValue: number
  upgradedValue: number
};

type CardAction = {
  name: string
  variable: string
}

export interface CharacterData {
  name: string
  color: string
  // ...
}