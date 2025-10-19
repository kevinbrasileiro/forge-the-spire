import type { DropdownOption } from "../components/Dropdown"

export type ActionTemplate = {
  name: string
  label: string
  params?: Array<{
    id: string
    type: string
    label: string
    default: string
    options?: DropdownOption[]
    showWhen?: {
      parameter: string
      values: string[]
    }
  }>
}

export const ACTIONS: ActionTemplate[] = [
  {
    name: "damage",
    label: "Deal Damage",
    params: [
      {
        id: "variable-type",
        type: "dropdown",
        label: "Variable Type",
        options: [
          {name: "variable", label: "Variable"},
          {name: "fixed", label: "Fixed"},
          {name: "cost", label: "Cost"},
        ],
        default: "variable",
      },
      {
        id: "variable",
        type: "text",
        label: "Variable Name",
        default: "variable",
        showWhen: {
          parameter: "variable-type",
          values: ["variable"],
        }
      },
      {
        id: "random",
        type: "checkbox",
        label: "Random Target?",
        default: "false",
      },
    ]
  },
  {name: "block", label: "Gain Block"},
  {name: "heal", label: "Heal"},
  {name: "apply", label: "Apply Buff/Debuff"},
  {name: "draw", label: "Draw Cards"},
  {name: "discard", label: "Discard Cards"},
  {name: "exhaust", label: "Exahust Cards"},
  {name: "energy", label: "Gain Energy"},
  {name: "losehp", label: "Lose HP"},
  {name: "endturn", label: "End Turn"},
]

export const getActionByName = (name: string): ActionTemplate => {
  return ACTIONS.find(action => action.name === name) ?? ACTIONS[0]
}

export const ACTIONS_DROPDOWN: DropdownOption[] = ACTIONS.map(action => ({name: action.name, label: action.label}))