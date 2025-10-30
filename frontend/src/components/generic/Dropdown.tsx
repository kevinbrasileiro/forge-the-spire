import { ChevronDownIcon } from "@heroicons/react/24/outline"
import ReactDOM from "react-dom"
import { useEffect, useRef, useState } from "react"

export interface DropdownOption {
  name: string
  label: string
}

interface DropdownProps {
  label?: string 
  error?: string
  className?: string
  placeholder?: string
  sorted?: boolean
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
}

export default function Dropdown({
  label,
  error,
  className = "",
  placeholder = "Select an option",
  sorted = false,
  value,
  onChange,
  options,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const spaceBelow = viewportHeight - buttonRect.bottom
      const spaceAbove = buttonRect.top

      let topPosition = buttonRect.bottom + 4

      if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        topPosition = buttonRect.top - dropdownRect.height - 4
      }
      setDropdownPosition({
        top: topPosition,
        left: buttonRect.left,
        width: buttonRect.width,
      })
    } 
  }, [isOpen])

  const selectedOption = options.find((option) => option.name === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="flex flex-col w-full select-none">
      {label && (
        <div className="flex justify-center">
          <div className="px-4 relative">
            <span className="text-base">
              {label}
            </span>
          </div>
        </div>
      )}

      <div className="relative">
        <div
          ref={buttonRef}
          className={`
            relative flex items-center bg-black-dark text-white-light px-3 py-2 tracking-wide font-light text-base
            focus:outline-none rounded-lg cursor-pointer
            border-2 ${
              error
                ? "border-danger"
                : isOpen
                ? "border-primary"
                : "border-black-light"
            } 
            hover:border-primary transition-colors w-full
            ${className}
          `}
          onClick={() => {
            setIsOpen(!isOpen)
            setIsFocused(!isFocused)
          }}
        >
          <div
            className="absolute left-3 flex items-center justify-center z-10"
          >
            <ChevronDownIcon
              className={`text-primary w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>

          <div
            className="w-full truncate pl-10"
          >
            {displayText}
          </div>
        </div>

        {isOpen &&
          ReactDOM.createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                zIndex: 9999,
              }}
              className="bg-black-dark border-2 border-black-light rounded-lg shadow-lg max-h-64 overflow-y-auto custom-scrollbar"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              {(sorted ? options.sort((a, b) => a.label.localeCompare(b.label)) : options)
              .map((option) => (
                <div
                  key={option.name}
                  className={`px-3 py-2 cursor-pointer text-base}
                  ${
                    value === option.name
                      ? "bg-primary"
                      : "hover:bg-black-light"
                  }
                  ${value === option.name ? "font-medium" : "font-light"}
                `}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(option.name)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>,
            document.body
          )}
      </div>

      {error && <p className="text-danger text-xs mt-1">{error}</p>}
    </div>
  )
}