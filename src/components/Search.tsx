import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import type { DropdownOption } from "./Dropdown";

interface SearchProps {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  options: DropdownOption[]
  onClickOption: (action: string, label: string) => void
}

export default function Search({placeholder, value, onChange, options, onClickOption}: SearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const optionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex-col w-full justify-center gap-y-2">
      <Input
        icon={<MagnifyingGlassIcon className="w-4 h-4"/>}
        value={value}
        onChange={onChange}
        onClick={() => setIsOpen(true)}
        placeholder={placeholder || "Search for an action"}
        ref={searchRef}
      />
      {isOpen && (
        <div className="bg-black-dark border-2 border-black-light rounded-lg shadow-lg max-h-66 overflow-y-auto z-100 mt-1" ref={optionRef}>
          {options.map((option) => (
            <div 
              key={option.label}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                onClickOption(option.value, option.label)
              }}
              className="px-3 py-2 cursor-pointer hover:bg-black-light"
            >
              {option.label}
              </div>
          ))}
        </div>
      )}
    </div>
  )
}