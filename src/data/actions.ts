import type { DropdownOption } from "../components/Dropdown"
import { VANILLA_POWERS } from "./card"

export type ActionTemplate = {
  name: string
  label: string
  params: Array<{
    name: string
    type: string
    label: string
    default?: string
    options?: DropdownOption[]
    showWhen?: {
      parameter: string
      values: string[]
    }
  }>
}

export const ACTIONS_TEMPLATES: ActionTemplate[] = [
  {
    name: "damage",
    label: "Deal Damage",
    params: [
      {
        name: "amount",
        type: "variable",
        label: "Amount",
      },
    ]
  },
  {
    name: "block",
    label: "Gain Block",
    params: [
      {
        name: "amount",
        type: "variable",
        label: "Amount",
      },
    ]
  },
  {
    name: "apply",
    label: "Apply Buff/Debuff",
    params: [
      {
        name: "power",
        type: "dropdown",
        label: "Buff/Debuff",
        options: VANILLA_POWERS
      },
      {
        name: "amount",
        type: "variable",
        label: "Amount",
      },
    ]
  },
  // {name: "heal", label: "Heal"},
  {
    name: "draw",
    label: "Draw Cards",
    params: [
      {
        name: "amount",
        type: "variable",
        label: "Amount",
      },
    ]
  },
  // {name: "discard", label: "Discard Cards"},
  // {name: "exhaust", label: "Exahust Cards"},
  // {name: "energy", label: "Gain Energy"},
  // {name: "losehp", label: "Lose HP"},
  // {name: "endturn", label: "End Turn"},
]

export const getActionTemplateByName = (name: string): ActionTemplate => {
  return ACTIONS_TEMPLATES.find(action => action.name === name) ?? ACTIONS_TEMPLATES[0]
}

export const ACTIONS_DROPDOWN: DropdownOption[] = ACTIONS_TEMPLATES.map(action => ({name: action.name, label: action.label}))