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
  art?: string
  description: string
  
  color: string
  cost: number
  type: "attack" | "skill" | "power" | "status" | "curse"
  rarity: "basic" | "common" | "uncommon" | "rare" | "special" | "curse"

  target: "self" | "enemy" | "all enemies" | "everyone"

  // ...
}

export interface CharacterData {
  name: string
  color: string
  // ...
}