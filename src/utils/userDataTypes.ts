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
  art?: string
  
  //USAGE
  cost: number
  upgradedCost?: number
  target: "self" | "enemy" | "all" | "everyone"
  CardProperties: Record<PropertyKeyword, CardProperty>
  variables: {
    damage: [number, number],
    block: [number, number],
    magic: [number, number],
  }
  customVariables?: CustomVariable[]
  actions?: CardAction[]
}

type PropertyKeyword = "exhaust" | "ethereal" | "innate" | "retain"
type CardProperty = "no" | "removed" | "obtained" | "both"

type CustomVariable = {
  name: string
  value: [number, number] // Base value, upgrade modifier
}

type CardAction = {
  name: string
  variable: number
}

export interface CharacterData {
  name: string
  color: string
  // ...
}