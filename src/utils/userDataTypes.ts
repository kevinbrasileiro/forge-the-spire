export interface UserData {
  cards: CardData[]
  characters: CharacterData[]
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