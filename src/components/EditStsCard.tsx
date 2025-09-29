import { DocumentTextIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import type { CardData } from "../utils/userDataTypes";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import StsCard from "./StsCard";
import { Input } from "./Input";
import Dropdown from "./Dropdown";
import { colorsDropdownOptions, raritiesDropdownOptions, typesDropdownOptions} from "../utils/gameData";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface EditStsCardProps {
  isOpen: boolean
  card: CardData
  onClose: () => void
  onSave: (card: CardData) => void
  onDelete: (cardId: string) => void
}

export default function EditStsCard({isOpen, card, onClose, onSave, onDelete}: EditStsCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "usage">("info");
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
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
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
            {activeTab === "info" && (<div className="flex flex-col gap-4">
              <div className="flex gap-x-4">
                <div className="w-16">
                  <Input
                    label="Cost"
                    type="number"
                    value={formData.cost} 
                    onChange={(e) => handleInputChange("cost", e.target.value)}
                    className="w-8 text-center"
                    min={-2}
                    step={1}
                  />
                </div>
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
              <Input
                label="Description"
                multiline
                height="140px"
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)}
              />              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                size="sm"
                icon={<PhotoIcon className="h-4 w-4" />}
              >
                {formData.art
                  ? "Change Card Art"
                  : "Upload Card Art"}
              </Button>
            </div>)}

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
          <StsCard card={formData}/>
        </div>

      </div>
    </div>
  )
}