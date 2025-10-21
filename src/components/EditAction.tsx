import { getActionTemplateByName } from "../data/actions"
import type { CardAction, CardData } from "../utils/userDataTypes"
import Dropdown from "./Dropdown"
import { Input } from "./Input"
import VariableInput from "./VariableInput"

interface EditActionProps {
  action: CardAction
  card: CardData
  onChange: (actionId: string, parameter: string, value: string | number) => void
}

export default function EditAction({ action, onChange }: EditActionProps) { 
  const actionTemplate = getActionTemplateByName(action.name)
  const params = action.params

  const handleParameterChange = (parameter: string, value: string | number) => {
    onChange(action.id, parameter, value)
  }

  return (
    <div className="w-[400px] h-[90vh] flex flex-col gap-4 bg-black-dark rounded-lg p-4">
      <div className="self-center text-lg">
        {action.label} Action
      </div>
      <div className="flex flex-col gap-4">
        {actionTemplate.params?.map((paramTemplate) => {
          return (
            <div key={paramTemplate.name}>
              {(() => {
                switch (paramTemplate.type) {
                  case "text":
                    return (
                      <Input
                        label={paramTemplate.label} 
                        value={params?.[paramTemplate.name]}
                        onChange={(e) => handleParameterChange(paramTemplate.name, e.target.value)}
                      />
                    )
                  case "number":
                    return (
                      <Input
                        label={paramTemplate.label}
                        value={params?.[paramTemplate.name]}
                        onChange={(e) => handleParameterChange(paramTemplate.name, e.target.value)}
                        className="text-center"
                      />
                    )
                  case "dropdown":
                    return (
                      <Dropdown 
                        label={paramTemplate.label}
                        value={params?.[paramTemplate.name] as string}
                        onChange={(e) => handleParameterChange(paramTemplate.name, e)}
                        options={paramTemplate.options ?? []}
                      />
                    )
                  case "variable": 
                    return (
                      <VariableInput 
                        paramTemplate={paramTemplate}
                        params={params}
                        value={params?.[paramTemplate.name]}
                        onChange={handleParameterChange}
                      />
                    )
                }
              })()}
            </div>
          )
        })}
      </div>
    </div>
  )
}