import type { DropdownOption } from "../components/generic/Dropdown";

export const VANILLA_COLORS = [
  {label: "Red", name: "red", src: "red"},
  {label: "Green", name: "green", src: "green"},
  {label: "Blue", name: "blue", src: "blue"},
  {label: "Purple", name: "purple", src: "purple"},
  {label: "Colorless", name: "colorless", src: "gray"},
  // {label: "Curse", name: "curse", src: "black"},
]

export const COLORS_DROPDOWN: DropdownOption[] = VANILLA_COLORS.map(color => ({ label: color.label, name: color.name }));

export const getColorByName = (name: string) => {
  return VANILLA_COLORS.find(color => color.name === name)
}

export const VANILLA_TYPES = [
  {label: "Attack", name: "attack", src: "attack"},
  {label: "Skill", name: "skill", src: "skill"},
  {label: "Power", name: "power", src: "power"},
  // {label: "Curse", name: "curse", src: "curse"},
  // {label: "Status", name: "status", src: "status"},
]

export const getTypeByName = (name: string) => {
  return VANILLA_TYPES.find(type => type.name === name)
}

export const TYPES_DROPDOWN: DropdownOption[] = VANILLA_TYPES.map(type => ({ label: type.label, name: type.name }));

export const VANILLA_RARITIES = [
  {label: "Starter", name: "basic", src: "common"},
  {label: "Common", name: "common", src: "common"},
  {label: "Uncommon", name: "uncommon", src: "uncommon"},
  {label: "Rare", name: "rare", src: "rare"},
  // {label: "Special", name: "special", src: "special"},
  // {label: "Curse", name: "curse", src: "curse"},
]

export const getRarityByName = (name: string) => {
  return VANILLA_RARITIES.find(rarity => rarity.name === name)
}

export const RARITIES_DROPDOWN: DropdownOption[] = VANILLA_RARITIES.map(rarity => ({ label: rarity.label, name: rarity.name}))

export const VANILLA_TARGETS = [
  {label: "Enemy", name: "enemy"},
  {label: "Random Enemy", name: "random"},
  {label: "ALL Enemies", name: "all"},
  {label: "Self", name: "self"},
  {label: "Everyone", name: "everyone"},
]

export const PROPERTY_OPTIONS = [
  {label: "No", name: "no"},
  {label: "Removed on Upgrade", name: "removed"},
  {label: "Obtained on Upgrade", name: "obtained"},
  {label: "Yes", name: "yes"},
]

export const VANILLA_POWERS: DropdownOption[] = [
  {label: "Weak", name: "weak"},
  {label: "Vulnerable", name: "vulnerable"},
  // ...
]