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
  id?: string
  title: string
  color: string
  description?: string

  type?: "Attack" | "Skill" | "Power" | "Status" | "Curse"
  rarity?: "Basic" | "Common" | "Uncommon" | "Rare" | "Special" | "Curse"
  target?: "Self" | "Enemy" | "All Enemies"
  cost?: number

  // ...
}

export interface CharacterData {
  name: string
  color: string
  // ...
}