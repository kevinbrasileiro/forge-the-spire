export const VANILLA_COLORS = [
  {label: "Red", value: "red", src: "red"},
  {label: "Green", value: "green", src: "green"},
  {label: "Blue", value: "blue", src: "blue"},
  {label: "Purple", value: "purple", src: "purple"},
  {label: "Colorless", value: "colorless", src: "gray"},
  // {label: "Curse", value: "curse", src: "black"},
]

export const colorsDropdownOptions = VANILLA_COLORS.map(color => ({ label: color.label, value: color.value }));


export const getColorByValue = (value: string) => {
  return VANILLA_COLORS.find(color => color.value === value)
}

export const VANILLA_TYPES = [
  {label: "Attack", value: "attack", src: "attack"},
  {label: "Skill", value: "skill", src: "skill"},
  {label: "Power", value: "power", src: "power"},
  // {label: "Curse", value: "curse", src: "curse"},
  // {label: "Status", value: "status", src: "status"},
]

export const getTypeByValue = (value: string) => {
  return VANILLA_TYPES.find(type => type.value === value)
}

export const typesDropdownOptions = VANILLA_TYPES.map(type => ({ label: type.label, value: type.value }));

export const VANILLA_RARITIES = [
  {label: "Starter", value: "basic", src: "common"},
  {label: "Common", value: "common", src: "common"},
  {label: "Uncommon", value: "uncommon", src: "uncommon"},
  {label: "Rare", value: "rare", src: "rare"},
  // {label: "Special", value: "special", src: "special"},
  // {label: "Curse", value: "curse", src: "curse"},
]

export const getRarityByValue = (value: string) => {
  return VANILLA_RARITIES.find(rarity => rarity.value === value)
}

export const raritiesDropdownOptions = VANILLA_RARITIES.map(rarity => ({ label: rarity.label, value: rarity.value}))

export const VANILLA_TARGETS = [
  {label: "Enemy", value: "enemy"},
  {label: "ALL Enemies", value: "all"},
  {label: "Self", value: "self"},
  {label: "Everyone", value: "everyone"},
]

export const PROPERTY_OPTIONS = [
  {label: "No", value: "no"},
  {label: "Removed on Upgrade", value: "removed"},
  {label: "Obtained on Upgrade", value: "obtained"},
  {label: "Yes", value: "yes"},
]