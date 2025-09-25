import { Cog6ToothIcon, DocumentTextIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import type { CardData } from "../utils/userDataTypes";
import { useState } from "react";

interface EditStsCardProps {
  card: CardData
}

export default function EditStsCard({card}: EditStsCardProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "description" | "advanced">("visual");

  const tabs = [
    { id: "visual", label: "Card Info", icon: DocumentTextIcon },
    { id: "description", label: "Usage", icon: PuzzlePieceIcon },
    { id: "advanced", label: "Advanced", icon: Cog6ToothIcon },
  ];

  return (
    <div className="fixed inset-0 flex bg-black-light/80 backdrop-blur-sm items-center justify-center z-50">
      <div className="flex items-start gap-8 max-h-[90vh]">
        <div className="bg-black-dark border-black-light rounded-lg w-[100vh] h-[90vh] flex flex-col relative overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id as "visual" | "description")
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
        </div> 
      </div>
    </div>
  )
}