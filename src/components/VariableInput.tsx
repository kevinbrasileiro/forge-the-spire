import { useState } from "react"
import Button from "./generic/Button"
import { CalculatorIcon, CubeIcon, VariableIcon } from "@heroicons/react/24/solid"
import { Input } from "./generic/Input"
import Dropdown from "./generic/Dropdown"
import type { ActionTemplate } from "../data/actions"

interface VariableInputProps {
  paramTemplate: ActionTemplate['params'][0]
  value?: string | number
  onChange: (parameter: string, value: string | number) => void
}

function getModeFromValue(value?: string | number): "fixed" | "variable" | "cost" | "game" {
  const str = String(value ?? "")
  if (str.startsWith("!")) return "variable"
  if (str.startsWith("GAME.")) return "game"
  if (str.startsWith("X")) return "cost"
  return "fixed"
}

function stripPrefix(value?: string | number): string {
  return String(value ?? "").replace(/^!|^GAME\.|^X/, "")
}

export default function VariableInput({ paramTemplate, value, onChange }: VariableInputProps) {
  const [mode, setMode] = useState<"fixed" | "variable" | "cost" | "game">(getModeFromValue(value))

  const handleModeChange = (changeTo: "variable" | "cost" | "game") => {
    if (changeTo === mode) {
      setMode("fixed")
      onChange(paramTemplate.name, 0)
      return
    }
    setMode(changeTo)
    switch (changeTo) {
      case "variable":
        onChange(paramTemplate.name, `!damage`)
        break
      case "game":
        onChange(paramTemplate.name, `GAME.attacks_played_this_turn`)
        break
      case "cost":
        onChange(paramTemplate.name, "X")
        break
    }
  }

  // TODO: FIX TOOLTIPS AND ADD IT HERE
  return (
    <div className="flex flex-col justify-center gap-y-2 bg-black-light rounded-lg p-3">
      <div className="flex items-center gap-x-1">
        <p className="mr-2">{paramTemplate.label}</p>
        <Button 
          icon={<VariableIcon className="w-4 h-4"/>}
          variant="secondary"
          className={mode === "variable" ? "bg-primary hover:bg-primary" : ""}
          onClick={() => handleModeChange("variable")}
          title="Card Variable"
        />
        <Button 
          icon={<CubeIcon className="w-4 h-4"/>}
          variant="secondary"
          className={mode === "game" ? "bg-primary hover:bg-primary" : ""}
          onClick={() => handleModeChange("game")}
          title="Game Variable"
        />
        <Button 
          icon={<CalculatorIcon className="w-4 h-4"/>}
          variant="secondary"
          className={mode === "cost" ? "bg-primary hover:bg-primary" : ""}
          onClick={() => handleModeChange("cost")}
          title="Cost (X)"
        />
      </div>
      {(() => {
        switch (mode) {
          case "fixed":
          case "cost":
            return (
              <Input
                type="text"
                value={value ?? ""}
                onChange={(e) => onChange(paramTemplate.name, e.target.value)}
                placeholder={mode === "cost" ? "X or X+1" : "0"}
              />
            )
          case "variable":
          case "game":
            return (
              <Dropdown 
                onChange={(e) => onChange(
                  paramTemplate.name, 
                  mode === "variable" ? `!${e}` : `GAME.${e}`
                )}
                value={stripPrefix(value)}
                options={[ // TODO: Get list of all created variables
                  {label: "Damage", name: "damage"},
                  {label: "Block", name: "block"},
                  {label: "Magic", name: "magic"},
                ]}
                placeholder="Choose Variable"
              />
            )
        }
      })()}
    </div>
  )
}