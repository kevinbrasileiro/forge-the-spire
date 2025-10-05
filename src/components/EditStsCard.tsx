import type { CardData, PropertyKeyword } from "../utils/userDataTypes";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import StsCard from "./StsCard";
import { Input } from "./Input";
import Dropdown from "./Dropdown";
import { colorsDropdownOptions, raritiesDropdownOptions, typesDropdownOptions, VANILLA_TARGETS} from "../utils/gameData";
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

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })

    if (field === "upgradedDescription" || field === "upgradedCost") {
      setViewUpgraded(true)
    } else {
      setViewUpgraded(false)
    }
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

  const handleKeyDown = (field: string, e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const textArea = e.target as HTMLTextAreaElement
      const newValue = textArea.value.trim() + " NL "

      handleInputChange(field, newValue)
    }
  }

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
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="flex gap-x-4">
                <Dropdown 
                  label="Color"
                  value={formData.color} 
                  onChange={(e) => handleInputChange("color", e)}
                  options={colorsDropdownOptions}
                />
                <Dropdown 
                  label="Type"
                  value={formData.type} 
                  onChange={(e) => handleInputChange("type", e)}
                  options={typesDropdownOptions}
                />
                <Dropdown 
                  label="Rarity"
                  value={formData.rarity} 
                  onChange={(e) => handleInputChange("rarity", e)}
                  options={raritiesDropdownOptions}
                />
              </div>
              <div className="flex gap-x-4">
                <Input
                  label="Description"
                  multiline
                  height="140px"
                  value={formData.description} 
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  onKeyDown={(e) => handleKeyDown("description", e)}
                />
                <div className="flex my-auto">
                  <Button 
                    icon={<ChevronDoubleRightIcon className="w-4 h-4"/>}
                    onClick={() => handleInputChange("upgradedDescription", formData.description)}
                  />
                </div>
                <Input
                  label="Description+"
                  multiline
                  height="140px"
                  value={formData.upgradedDescription} 
                  onChange={(e) => handleInputChange("upgradedDescription", e.target.value)}
                  onKeyDown={(e) => handleKeyDown("upgradedDescription", e)}
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
                      onChange={(e) => handleInputChange("cost", e.target.value)}
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
                      onChange={(e) => handleInputChange("upgradedCost", e.target.value)}
                      className="text-center"
                      min={-2}
                      step={1}
                    />
                  </div>
                </div>
                <Dropdown 
                  label="Target"
                  value={formData.target} 
                  onChange={(e) => handleInputChange("target", e)}
                  options={VANILLA_TARGETS}
                />
              </div>
              <div className="flex gap-x-2">
                <Dropdown 
                  label="Ethereal?"
                  value={formData.cardProperties?.ethereal}
                  onChange={(e) => handleCardPropertyChange("ethereal", e)}
                  options={[
                    {label: "No", value: "no"},
                    {label: "Removed on Upgrade", value: "removed"},
                    {label: "Obtained on Upgrade", value: "obtained"},
                    {label: "Yes", value: "yes"},
                  ]}
                />
                <Dropdown 
                  label="Exhaust?"
                  value={formData.cardProperties?.exhaust}
                  onChange={(e) => handleCardPropertyChange("exhaust", e)}
                  options={[
                    {label: "No", value: "no"},
                    {label: "Removed on Upgrade", value: "removed"},
                    {label: "Obtained on Upgrade", value: "obtained"},
                    {label: "Yes", value: "yes"},
                  ]}
                />
                <Dropdown 
                  label="Innate?"
                  value={formData.cardProperties?.innate}
                  onChange={(e) => handleCardPropertyChange("innate", e)}
                                    options={[
                    {label: "No", value: "no"},
                    {label: "Removed on Upgrade", value: "removed"},
                    {label: "Obtained on Upgrade", value: "obtained"},
                    {label: "Yes", value: "yes"},
                  ]}
                />
                <Dropdown 
                  label="Retain?"
                  value={formData.cardProperties?.retain}
                  onChange={(e) => handleCardPropertyChange("retain", e)}
                                    options={[
                    {label: "No", value: "no"},
                    {label: "Removed on Upgrade", value: "removed"},
                    {label: "Obtained on Upgrade", value: "obtained"},
                    {label: "Yes", value: "yes"},
                  ]}
                />
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