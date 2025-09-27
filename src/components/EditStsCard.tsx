import { DocumentTextIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import type { CardData } from "../utils/userDataTypes";
import { useEffect, useRef, useState } from "react";

interface EditStsCardProps {
  isOpen: boolean
  card: CardData
  onClose: () => void
}

export default function EditStsCard({isOpen, card, onClose}: EditStsCardProps) {
  const [activeTab, setActiveTab] = useState<"info" | "usage">("info");
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

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
          
            <div>{card.title}</div>
            <div>{card.description}</div>
            <div>{card.color}</div>
            <div>{card.type}</div>
            <div>{card.rarity}</div>
            <div>{card.cost}</div>
            <div>{card.target}</div>
        </div> 
      </div>
    </div>
  )
}