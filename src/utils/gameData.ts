export const VANILLA_COLORS = [
  {label: "Red", id: "red", src: "red"},
  {label: "Green", id: "green", src: "green"},
  {label: "Blue", id: "blue", src: "blue"},
  {label: "Purple", id: "purple", src: "purple"},
  {label: "Colorless", id: "colorless", src: "gray"},
  // {label: "Curse", id: "curse", src: "black"},
]

export const colorsDropdownOptions = VANILLA_COLORS.map(color => ({ label: color.label, id: color.id }));


export const getColorByValue = (id: string) => {
  return VANILLA_COLORS.find(color => color.id === id)
}

export const VANILLA_TYPES = [
  {label: "Attack", id: "attack", src: "attack"},
  {label: "Skill", id: "skill", src: "skill"},
  {label: "Power", id: "power", src: "power"},
  // {label: "Curse", id: "curse", src: "curse"},
  // {label: "Status", id: "status", src: "status"},
]

export const getTypeByValue = (id: string) => {
  return VANILLA_TYPES.find(type => type.id === id)
}

export const typesDropdownOptions = VANILLA_TYPES.map(type => ({ label: type.label, id: type.id }));

export const VANILLA_RARITIES = [
  {label: "Starter", id: "basic", src: "common"},
  {label: "Common", id: "common", src: "common"},
  {label: "Uncommon", id: "uncommon", src: "uncommon"},
  {label: "Rare", id: "rare", src: "rare"},
  // {label: "Special", id: "special", src: "special"},
  // {label: "Curse", id: "curse", src: "curse"},
]

export const getRarityByValue = (id: string) => {
  return VANILLA_RARITIES.find(rarity => rarity.id === id)
}

export const raritiesDropdownOptions = VANILLA_RARITIES.map(rarity => ({ label: rarity.label, id: rarity.id}))

export const VANILLA_TARGETS = [
  {label: "Enemy", id: "enemy"},
  {label: "ALL Enemies", id: "all"},
  {label: "Self", id: "self"},
  {label: "Everyone", id: "everyone"},
]

export const PROPERTY_OPTIONS = [
  {label: "No", id: "no"},
  {label: "Removed on Upgrade", id: "removed"},
  {label: "Obtained on Upgrade", id: "obtained"},
  {label: "Yes", id: "yes"},
]

export const ACTIONS = [
  {id: "damage",label: "Deal Damage"},
  {id: "block", label: "Block"},
  {id: "heal", label: "Heal"},
  {id: "apply", label: "Apply Buff/Debuff"},
  {id: "draw", label: "Draw Cards"},
  {id: "discard", label: "Discard Cards"},
  {id: "exhaust", label: "Exahust Cards"},
  {id: "energy", label: "Gain Energy"},
  {id: "losehp", label: "Lose HP"},
  {id: "endturn", label: "End Turn"},
]