import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/24/solid"
import type { CardAction } from "../utils/userDataTypes"
import Button from "./Button"

interface ActionProps {
  action: CardAction
  onEdit: (action: CardAction) => void
  onDelete: (actionId: string) => void
  onMove: (actionId: string, direction: "up" | "down") => void
}

export default function Action({ action, onEdit, onDelete, onMove }: ActionProps) {
  return (
    <div className="flex justify-between gap-x-4 bg-black-light rounded-lg p-3">
      <div 
        className="w-full flex justify-between items-center"
        onClick={() => onEdit(action)}
      >
        <div className="flex items-center justify-between w-full">
          <p>{action.label}</p>
          <div className="flex gap-x-2">
            <Button 
              variant="secondary" 
              icon={<ArrowUpIcon className="w-4 h-4"/>}
              onClick={(e) => {
                e.stopPropagation();
                onMove(action.id, "up");
              }}
            />
            <Button 
              variant="secondary" 
              icon={<ArrowDownIcon className="w-4 h-4"/>}
              onClick={(e) => {
                e.stopPropagation();
                onMove(action.id, "down");
              }}
            />
            <Button 
              variant="danger" 
              icon={<TrashIcon className="w-4 h-4"/>}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(action.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}