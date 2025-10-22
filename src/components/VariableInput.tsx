import { useState } from "react"
import Button from "./generic/Button"
import { CalculatorIcon, CubeIcon, VariableIcon } from "@heroicons/react/24/solid"
import { Input } from "./generic/Input"
import Dropdown from "./generic/Dropdown"
import type { ActionTemplate } from "../data/actions"

interface VariableInputProps {
  paramTemplate: ActionTemplate['params'][0]
  params: Record<string, string| number>
  value?: string | number
  onChange: (parameter: string, value: string) => void
}

export default function VariableInput({ paramTemplate, params, value, onChange }: VariableInputProps) {
  const typeParamKey = `${paramTemplate.name}-type`;
  const initialMode = (params?.[typeParamKey] as "fixed" | "variable" | "cost" | "game") ?? "variable";

  const [mode, setMode] = useState<"fixed" | "variable" | "cost" | "game">(initialMode)

  const handleModeChange = (changeTo: "variable" | "cost" | "game") => {
    if (changeTo === mode) {
      setMode("fixed")
      onChange(`${paramTemplate.name}-type`, "fixed")
    } else {
      setMode(changeTo)
      onChange(`${paramTemplate.name}-type`, changeTo)
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
            return (
              <Input
                type="number"
                value={value}
                onChange={(e) => onChange(paramTemplate.name, e.target.value)}
                placeholder="0"
              />
            )
          case "variable":
            return (
              <Dropdown 
                onChange={(e) => onChange(paramTemplate.name, e)}
                value={value as string}
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