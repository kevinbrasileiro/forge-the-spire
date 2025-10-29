import type { CardAction, CardData, CardVariable, PropertyKeyword } from "../utils/userDataTypes";
import { useRef, useState } from "react";
import Button from "./generic/Button";
import StsCard from "./StsCard";
import { Input } from "./generic/Input";
import Dropdown from "./generic/Dropdown";
import { COLORS_DROPDOWN, PROPERTY_OPTIONS, RARITIES_DROPDOWN, TYPES_DROPDOWN, VANILLA_TARGETS} from "../data/card";
import { DocumentTextIcon, PuzzlePieceIcon, PhotoIcon, QuestionMarkCircleIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Tooltip from "./generic/Tooltip";
import VanillaVariable from "./VanillaVariable";
import Search from "./generic/Search";
import Action from "./Action";
import EditAction from "./EditAction";
import { ACTIONS_TEMPLATES, getActionTemplateByName } from "../data/actions";

interface EditStsCardProps {
  card: CardData
  onSave: (card: CardData) => void
  onDelete: (cardId: string) => void
}

export default function EditStsCard({card, onSave, onDelete}: EditStsCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "usage">("info");
  const [formData, setFormData] = useState<CardData>(card)
  const [viewUpgraded, setViewUpgraded] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [actionSearch, setActionSearch] = useState("")
  const [editingAction, setEditingAction] = useState<CardAction | null>(null)

  const handleTextInputChange = (field: string, value: string, isUpgradeField = false) => {
    setEditingAction(null)
    setViewUpgraded(isUpgradeField)

    setFormData(prev => ({
      ...prev,
      [field]: value || ""
    }))
  }

  const handleNumberInputChange = (field: string, value: string | number, isUpgradeField = false) => {
    setViewUpgraded(isUpgradeField)
    setEditingAction(null)

    const parsedValue = typeof value === "string" ? parseFloat(value) : value

    setFormData(prev => ({
      ...prev,
      [field]: parsedValue || 0
    }))
  }

  const handleCardPropertyChange = (property: PropertyKeyword, value: string) => {
    setEditingAction(null)

    setFormData(prev => ({
      ...prev,
      cardProperties: {
        ...prev.cardProperties,
        [property]: value
      }
    }))
  }

  const handleVanillaVariableChange = (variableName: "damage" | "block" | "magic", value: Partial<CardVariable>, isUpgradeField = false) => {
    setViewUpgraded(isUpgradeField)
    setEditingAction(null)

    setFormData(prev => ({
      ...prev,
      vanillaVariables: {
        ...prev.vanillaVariables,
        [variableName]: {
          ...prev.vanillaVariables?.[variableName],
          ...value
        }
      }
    }))
  }

  const handleAddAction = (name: string) => {
    const template = getActionTemplateByName(name)
    const newAction: CardAction = {
      ...template,
      id: crypto.randomUUID(),
      params: {}
    }

    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions || [], newAction]
    }))
  }

  const handleDeleteAction = (actionId: string) => {
    const actionToDelete = formData.actions?.find((action) => action.id === actionId)
    if (editingAction === actionToDelete) {
      setEditingAction(null)
    }
    setFormData(prev => ({
      ...prev,
      actions: prev.actions?.filter((action) => action.id !== actionId)
    }))
  }

  const handleMoveAction = (actionId: string, direction: "up" | "down") => {
    const index = formData.actions?.findIndex((action) => action.id === actionId)

    if (index === undefined || !formData.actions) {
      return
    }

    const swappedActions = [...formData.actions]

    if (direction === "up" && index > 0) {
      [swappedActions[index], swappedActions[index - 1]] = [swappedActions[index - 1], swappedActions[index]]
    } else if (direction === "down" && index < swappedActions.length - 1) {
      [swappedActions[index], swappedActions[index + 1]] = [swappedActions[index + 1], swappedActions[index]]
    }

    setFormData(prev => ({
      ...prev,
      actions: swappedActions,
    }));
  }

  const handleChangeAction = (actionId: string, parameter: string, value: string | number) => {
    setFormData(prev => {
      const updatedActions = prev.actions?.map((action) => {
        return action.id === actionId
        ? {...action, params: {...action.params, [parameter]: value} }
        : action
      })
      const updatedAction = updatedActions?.find((action) => action.id === actionId)
      setEditingAction(updatedAction || null)
      return {...prev, actions: updatedActions}
    })
  }

  const handleImageUpload = (file?: File) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const finalImgData = resizeImage(img, 250, 190)

          setFormData(prev => ({
            ...prev,
            art: finalImgData
          }))
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    };
  }

  const resizeImage = (
    img: HTMLImageElement,
    width = 250,
    height = 190
  ): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, width, height);
    }
    return canvas.toDataURL("image/png");
  };

  const tabs = [
    { id: "info", label: "Card Info", icon: DocumentTextIcon },
    { id: "usage", label: "Usage", icon: PuzzlePieceIcon },
  ];

  return (
    <div className="fixed inset-0 flex bg-black-light/80 backdrop-blur-sm items-center justify-center z-50">
      <div ref={modalRef} className="flex items-start gap-8 max-h-[90vh]">
        <div className="bg-black-dark border-black-light rounded-lg w-[100vh] h-[90vh] flex flex-col relative">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as "info" | "usage" )
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm bg-black-dark transition-all relative border-b-2 ${
                    isActive
                      ? "bg-black-light border-gold"
                      : "hover:text-gold hover:bg-black-light border-b-2 border-black-light"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col h-full justify-between p-4 overflow-y-auto">
            {activeTab === "info" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-x-4">
                <Input
                  label="Name"
                  value={formData.title} 
                  onChange={(e) => handleTextInputChange("title", e.target.value)}
                />
              </div>
              <div className="flex gap-x-4">
                <Dropdown 
                  label="Color"
                  value={formData.color} 
                  onChange={(e) => handleTextInputChange("color", e)}
                  options={COLORS_DROPDOWN}
                />
                <Dropdown 
                  label="Type"
                  value={formData.type} 
                  onChange={(e) => handleTextInputChange("type", e)}
                  options={TYPES_DROPDOWN}
                />
                <Dropdown 
                  label="Rarity"
                  value={formData.rarity} 
                  onChange={(e) => handleTextInputChange("rarity", e)}
                  options={RARITIES_DROPDOWN}
                />
              </div>
              <div className="flex gap-x-4">
                <Input
                  label="Description"
                  multiline
                  height="140px"
                  value={formData.description} 
                  onChange={(e) => handleTextInputChange("description", e.target.value)}
                />
                <div className="flex flex-col items-center gap-y-2 my-auto">
                  <Button 
                    variant="secondary"
                    icon={<ChevronDoubleRightIcon className="w-4 h-4"/>}
                    onClick={() => handleTextInputChange("upgradedDescription", formData.description)}
                  />
                </div>
                <Input
                  label="Description+"
                  multiline
                  height="140px"
                  value={formData.upgradedDescription} 
                  onChange={(e) => handleTextInputChange("upgradedDescription", e.target.value, true)}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                className="hidden"
                ref={fileInputRef}
              />
              <div className="flex flex-col w-full">
                <div className="mx-auto flex gap-x-1 items-center">
                  <p>Card Art</p>
                  <Tooltip content="The game renders card images as-is, so if they aren't cropped they'll stick out of frame">
                    <QuestionMarkCircleIcon className="w-4 h-4"/>
                  </Tooltip>
                </div>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    handleImageUpload(e.dataTransfer.files?.[0])
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className="h-36 mb-2 border-2 border-dashed border-black-light rounded-lg flex items-center justify-center gap-x-1 text-gold/40 cursor-pointer hover:bg-black-light transition-colors"
                >
                  <PhotoIcon className="w-4 h-4"/> 
                  {formData.art ? "Change Card Art" : "Upload Card Art"}
                </div>
                {formData.art && (
                  <Button
                    onClick={() => setFormData(prev => ({...prev, art: ""}))}
                    variant="danger"
                    className="w-full"
                    size="sm"
                  >
                    Remove Card Art
                  </Button>
                )}
              </div>
            </div>
          )}
          {activeTab === "usage" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-x-4 items-center">
                <div className="flex gap-x-2 w-40">
                  <div>
                    <Input
                      label="Cost"
                      type="number"
                      value={formData.cost} 
                      onChange={(e) => handleNumberInputChange("cost", e.target.value)}
                      className="text-center"
                      min={-2}
                      step={1}
                    />
                  </div>
                  <div>
                    <Input
                      label="Cost+"
                      type="number"
                      value={formData.upgradedCost} 
                      onChange={(e) => handleNumberInputChange("upgradedCost", e.target.value, true)}
                      className="text-center"
                      min={-2}
                      step={1}
                    />
                  </div>
                </div>
                <Dropdown 
                  label="Target"
                  value={formData.target} 
                  onChange={(e) => handleTextInputChange("target", e)}
                  options={VANILLA_TARGETS}
                />
              </div>
              <div className="flex gap-x-2">
                <Dropdown 
                  label="Ethereal?"
                  value={formData.cardProperties?.ethereal}
                  onChange={(e) => handleCardPropertyChange("ethereal", e)}
                  options={PROPERTY_OPTIONS}
                />
                <Dropdown 
                  label="Exhaust?"
                  value={formData.cardProperties?.exhaust}
                  onChange={(e) => handleCardPropertyChange("exhaust", e)}
                  options={PROPERTY_OPTIONS}
                />
                <Dropdown 
                  label="Innate?"
                  value={formData.cardProperties?.innate}
                  onChange={(e) => handleCardPropertyChange("innate", e)}
                  options={PROPERTY_OPTIONS}
                />
                <Dropdown 
                  label="Retain?"
                  value={formData.cardProperties?.retain}
                  onChange={(e) => handleCardPropertyChange("retain", e)}
                  options={PROPERTY_OPTIONS}
                />
              </div>

              <div className="flex gap-x-4">
                  <div className="flex flex-col w-1/2 items-center">
                    <p>Variables</p>
                    <div className="flex flex-col w-full justify-center gap-y-2">
                      <VanillaVariable
                        value={formData.vanillaVariables.damage}
                        variableName="damage"
                        onChange={handleVanillaVariableChange}
                      />
                      <VanillaVariable
                        value={formData.vanillaVariables.block}
                        variableName="block"
                        onChange={handleVanillaVariableChange}
                      />
                      <VanillaVariable
                        value={formData.vanillaVariables.magic}
                        variableName="magic"
                        onChange={handleVanillaVariableChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full items-center">
                    <p>Actions</p>
                    <Search 
                      onChange={(e) => setActionSearch(e.target.value)}
                      value={actionSearch}
                      placeholder="Search for an action"
                      options={ACTIONS_TEMPLATES.filter((action) => {
                        return action.label.toLowerCase().includes(actionSearch.toLowerCase())
                      })}
                      onClickOption={(name) => handleAddAction(name)}
                    />
                    <div className="flex flex-col w-full justify-center gap-y-2 mt-2">
                      {formData.actions?.map((action) => (
                        <Action 
                          key={action.id}
                          action={action}
                          onEdit={(action) => setEditingAction(action)}
                          onDelete={handleDeleteAction}
                          onMove={handleMoveAction}
                        />
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          )}

            <div className="flex gap-4 mt-4">
              <Button
               variant="danger" 
               onClick={() => {if (window.confirm(`Are you sure you want to delete ${formData.title}?`)) onDelete(card.id)} }
               className="px-8"
              >
                Delete
              </Button>
              <Button
                variant="primary"
                onClick={() => onSave(formData)}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <aside className="flex-shrink-0 my-auto">
          {editingAction ? (
            <EditAction action={editingAction} card={formData} onChange={handleChangeAction}/>
          ) : (
            <StsCard card={formData} viewUpgraded={viewUpgraded}/>
          )}
        </aside>

      </div>
    </div>
  )
}