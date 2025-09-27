import { forwardRef, type InputHTMLAttributes, type KeyboardEvent } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string 
  error?: string
  className?: string
  multiline?: boolean
  height?: string
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const Input = forwardRef<
HTMLInputElement | HTMLTextAreaElement, InputProps
>(
  (
    {
      label,
      error,
      className = "",
      multiline = false,
      height = "auto",
      value,
      onChange,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputClasses = `border-black-light hover:border-primary bg-black-dark px-3 py-2 font-light text-base focus:outline-none rounded-lg border-2 focus:border-primary transition-colors w-full
    ${error ? "border-danger" : ""}
    ${
      props.type === "number"
        ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        : ""
    }
    ${className}
  `;

    return (
      <div className="w-full">
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
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={inputClasses}
              style={{ height, resize: "none" }}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              className={inputClasses}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && <p className="text-danger text-xs mt-1">{error}</p>}
      </div>
    );
  }
)