import type { CardVariable } from "../utils/userDataTypes"
import { Input } from "./generic/Input"

interface VanillaVariableProps {
  variableName: "damage" | "block" | "magic"
  value: CardVariable
  onChange: (variableName: "damage" | "block" | "magic", value: Partial<CardVariable>, isUpgradeField?: boolean) => void
}

export default function VanillaVariable({ variableName, value, onChange }: VanillaVariableProps) {
  return (
    <div className="flex justify-between gap-x-4 bg-black-light rounded-lg p-3">
      <div className="w-full flex justify-between items-center">
        <p>{variableName.charAt(0).toUpperCase() + variableName.slice(1)}:</p>
        <div className="w-14">
          <Input
            type="number"
            value={value.baseValue}
            onChange={(e) => onChange(variableName, { baseValue: parseFloat(e.target.value) || 0})}
            min={0}
            className="h-8 text-center"
          />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <p>Upgrade:</p>
        <div className="w-14">
          <Input 
            type="number"
            value={value.upgradedValue}
            onChange={(e) => onChange(variableName, { upgradedValue: parseFloat(e.target.value) || 0}, true)}
            min={0}
            className="h-8 text-center"
          />
        </div>
      </div>
    </div>
  )
}