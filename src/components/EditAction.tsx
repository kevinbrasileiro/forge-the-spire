import { getActionByName } from "../data/actions"
import type { CardAction } from "../utils/userDataTypes"
import Dropdown from "./Dropdown"
import { Input } from "./Input"

interface EditActionProps {
  action: CardAction
  onChange: (actionId: string, parameter: string, value: string) => void
}

export default function EditAction({ action, onChange }: EditActionProps) { 
  const actionTemplate = getActionByName(action.name)

  const handleParameterChange = (parameter: string, value: string) => {
    console.log(parameter, value)
    onChange(action.id, parameter, value)
  }

  const params = action.params

  console.log(params)

  return (
    <div className="w-[400px] h-[90vh] flex flex-col gap-4 bg-black-dark rounded-lg p-4">
      <div className="self-center text-lg">
        {action.label} Action
      </div>
      <div className="flex flex-col gap-4">
        {actionTemplate.params?.map((template) => {
          return (
            <div key={template.id}>
              {(() => {
                switch (template.type) {
                  case "text":
                    return (
                      <Input
                        label={template.label} 
                        value={params?.[template.id] as string}
                        onChange={(e) => handleParameterChange(template.id, e.target.value)}
                      />
                    )
                  case "number":
                    return (
                      <Input
                        label={template.label}
                        value={params?.[template.id] as string}
                        onChange={(e) => handleParameterChange(template.id, e.target.value)}
                        className="text-center"
                      />
                    )
                  case "dropdown":
                    return (
                      <Dropdown 
                        label={template.label}
                        value={params?.[template.id] as string}
                        onChange={(e) => handleParameterChange(template.id, e)}
                        options={template.options ?? []}
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