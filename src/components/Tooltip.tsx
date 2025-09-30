import React, { type ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface TooltipProps {
  children: ReactNode
  content: string
  position?: "top" | "bottom" | "left" | "right"
  className?: string
  contentClassName?: string
  delay?: number
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  className = "",
  contentClassName = "",
  delay = 500,
}) => {
  const [show, setShow] = useState(false)
  const childRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const hoverTimeout = useRef<number>(0)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (show && childRef.current && tooltipRef.current) {
      const childRect = childRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const gap = 8

      let top = 0
      let left = 0

      switch (position) {
        case "top":
          top = childRect.top - tooltipRect.height - gap
          left = childRect.left + childRect.width / 2 - tooltipRect.width / 2
          break
        case "bottom":
          top = childRect.bottom + gap
          left = childRect.left + childRect.width / 2 - tooltipRect.width / 2
          break
        case "left":
          top = childRect.top + childRect.height / 2 - tooltipRect.height / 2
          left = childRect.left - tooltipRect.width - gap
          break
        case "right":
          top = childRect.top + childRect.height / 2 - tooltipRect.height / 2
          left = childRect.right + gap
          break
      }

      const padding = 16
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (left < padding) left = padding
      if (left + tooltipRect.width > viewportWidth - padding) {
        left = viewportWidth - tooltipRect.width - padding
      }
      if (top < padding) top = padding
      if (top + tooltipRect.height > viewportHeight - padding) {
        top = viewportHeight - tooltipRect.height - padding
      }

      setTooltipPosition({ top, left })
    }
  }, [show, position])

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current)
    hoverTimeout.current = window.setTimeout(() => {
      setShow(true)
    }, delay)
  }

  const handleMouseLeave = () => {
      clearTimeout(hoverTimeout.current)
      setShow(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    }
  }, [])

  return (
    <>
      <div
        ref={childRef}
        className={`relative ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {createPortal(
        <div
          ref={tooltipRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            fixed px-3 py-2 bg-black-dark border border-black-light
            rounded-lg text-sm whitespace-nowrap z-[9999] shadow-lg
            pointer-events-auto transition-opacity duration-150 transform
            ${show ? "opacity-100" : "opacity-0"}
            ${contentClassName}
          `}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  )
}

export default Tooltip
