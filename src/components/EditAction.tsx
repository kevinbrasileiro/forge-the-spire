import type { CardAction } from "../utils/userDataTypes"

interface EditActionProps {
  action: CardAction
}

export default function EditAction({ action }: EditActionProps) {
  return (
    <div className="w-[500px] h-[90vh] bg-black-dark rounded-lg p-4">
      {action.label} Action
    </div>
  )
}