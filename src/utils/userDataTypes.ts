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
  id: string
  title: string
  color: string
  description: string

  type: "attack" | "skill" | "power" | "status" | "curse"
  rarity: "basic" | "common" | "uncommon" | "rare" | "special" | "curse"
  target: "self" | "enemy" | "all Enemies"
  cost: number

  // ...
}

export interface CharacterData {
  name: string
  color: string
  // ...
}