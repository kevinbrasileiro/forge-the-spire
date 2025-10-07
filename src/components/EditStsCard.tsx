import type { CardData, CardVariable, PropertyKeyword } from "../utils/userDataTypes";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import StsCard from "./StsCard";
import { Input } from "./Input";
import Dropdown from "./Dropdown";
import { colorsDropdownOptions, PROPERTY_OPTIONS, raritiesDropdownOptions, typesDropdownOptions, VANILLA_TARGETS} from "../utils/gameData";
import { DocumentTextIcon, PuzzlePieceIcon, PhotoIcon, QuestionMarkCircleIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import Tooltip from "./Tooltip";

interface EditStsCardProps {
  isOpen: boolean
  card: CardData
  onClose: () => void
  onSave: (card: CardData) => void
  onDelete: (cardId: string) => void
}

export default function EditStsCard({isOpen, card, onClose, onSave, onDelete}: EditStsCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "usage">("info");
  const [viewUpgraded, setViewUpgraded] = useState(false)
  const [formData, setFormData] = useState<CardData>(card)
  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onSave(formData)
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, onSave, formData]);

  const handleTextInputChange = (field: string, value: string, isUpgradeField = false) => {
    setViewUpgraded(isUpgradeField)

    setFormData({
      ...formData,
      [field]: value || ""
    })
  }

  const handleNumberInputChange = (field: string, value: string | number, isUpgradeField = false) => {
    setViewUpgraded(isUpgradeField)
    const parsedValue = typeof value === "string" ? parseFloat(value) : value

    setFormData({
      ...formData,
      [field]: parsedValue || 0
    })
  }

  const handleCardPropertyChange = (property: PropertyKeyword, value: string) => {
    setFormData({
      ...formData,
      cardProperties: {
        ...formData.cardProperties,
        [property]: value
      }
    })
  }

  const handleVanillaVariableChange = (variableName: "damage" | "block" | "magic", value: Partial<CardVariable>, isUpgradeField = false) => {
    setViewUpgraded(isUpgradeField)

    setFormData({
      ...formData,
      vanillaVariables: {
        ...formData.vanillaVariables,
        [variableName]: {
          ...formData.vanillaVariables?.[variableName],
          ...value
        }
      }
    })
  }

  // const handleCustomVariableChange = (variableName: string, value: Partial<CardVariable>, isUpgradeField = false) => {
  //   setViewUpgraded(isUpgradeField)

  //   setFormData({
  //     ...formData,
  //     customVariables: {
  //       ...formData.customVariables,
  //       [variableName]: {
  //         ...formData.customVariables?.[variableName] ,
  //         ...value
  //       } 
  //     } as Record<string, CardVariable>
  //   })
  // }

  const handleImageUpload = (file?: File) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const finalImgData = resizeImage(img, 250, 190)

          setFormData({
            ...formData,
            art: finalImgData
          })
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
        <div className="bg-black-dark border-black-light rounded-lg w-[100vh] h-[90vh] flex flex-col relative overflow-hidden">
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

          <div className="flex flex-col h-full justify-between p-4">
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
                  options={colorsDropdownOptions}
                />
                <Dropdown 
                  label="Type"
                  value={formData.type} 
                  onChange={(e) => handleTextInputChange("type", e)}
                  options={typesDropdownOptions}
                />
                <Dropdown 
                  label="Rarity"
                  value={formData.rarity} 
                  onChange={(e) => handleTextInputChange("rarity", e)}
                  options={raritiesDropdownOptions}
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
                    onClick={() => setFormData({...formData, art: ""})}
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

              <div className="flex">
                  <div className="flex flex-col w-1/2 items-center">
                    <p>Variables</p>
                    <div className="w-full flex flex-col justify-center gap-y-2">
                      <div className="flex justify-between gap-x-4 bg-black-light rounded-lg p-3">
                        <div className="w-full flex justify-between items-center">
                          <p>Damage:</p>
                          <div className="w-14">
                            <Input 
                              type="number"
                              value={formData.vanillaVariables?.damage?.baseValue}
                              onChange={(e) => handleVanillaVariableChange("damage", { baseValue: parseFloat(e.target.value) || 0 })}
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
                              value={formData.vanillaVariables?.damage?.upgradedValue}
                              onChange={(e) => handleVanillaVariableChange("damage", { upgradedValue: parseFloat(e.target.value) || 0 }, true)}
                              min={0}
                              className="h-8 text-center"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-x-4 bg-black-light rounded-lg p-3">
                        <div className="w-full flex justify-between items-center">
                          <p>Block:</p>
                          <div className="w-14">
                            <Input 
                              type="number"
                              value={formData.vanillaVariables?.block?.baseValue}
                              onChange={(e) => handleVanillaVariableChange("block", { baseValue: parseFloat(e.target.value) || 0 })}
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
                              value={formData.vanillaVariables?.block?.upgradedValue}
                              onChange={(e) => handleVanillaVariableChange("block", { upgradedValue: parseFloat(e.target.value) || 0 }, true)}
                              min={0}
                              className="h-8 text-center"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-x-4 bg-black-light rounded-lg p-3">
                        <div className="w-full flex justify-between items-center">
                          <p>Magic:</p>
                          <div className="w-14">
                            <Input 
                              type="number"
                              value={formData.vanillaVariables?.magic?.baseValue}
                              onChange={(e) => handleVanillaVariableChange("magic", { baseValue: parseFloat(e.target.value) || 0 })}
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
                              value={formData.vanillaVariables?.magic?.upgradedValue}
                              onChange={(e) => handleVanillaVariableChange("magic", { upgradedValue: parseFloat(e.target.value) || 0 }, true)}
                              min={0}
                              className="h-8 text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-full items-center">
                    Actions
                  </div>
              </div>
            </div>
          )}

            <footer className="flex gap-4">
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
            </footer>
          </div>
        </div>

        <div className="flex-shrink-0 pl-24 my-auto">
          <StsCard card={formData} viewUpgraded={viewUpgraded}/>
        </div>

      </div>
    </div>
  )
}