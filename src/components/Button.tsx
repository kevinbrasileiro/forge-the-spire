import React, { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
  height?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled = false,
  icon,
  ...props
}) => {
  const baseStyles =
    "relative tracking-widest focus:outline-none transition-colors duration-200 font-lexend rounded-lg";

  const isIconOnly = icon && !children;

  const sizeStyles = {
    sm: isIconOnly ? "p-1 text-sm border-2" : "px-3 py-1 text-sm border-2",
    md: isIconOnly ? "p-2 text-base border-3" : "px-4 py-2 text-base border-3",
    lg: isIconOnly ? "p-3 text-lg border-3" : "px-6 py-3 text-lg border-3",
  }[size];

  const variantStyles = {
    primary:
      "bg-black-dark border-primary text-primary hover:bg-black-light transition-colors",
    secondary:
      "bg-black-dark border-black-lighter hover:bg-black-light",
    danger:
      "bg-black-dark text-danger border-danger hover:bg-danger hover:border-danger hover:text-gold",
  }[variant];

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-primary"
    : "cursor-pointer";

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${disabledStyles} ${widthStyle} ${className} flex items-center justify-center`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className={isIconOnly ? "" : "mr-2"}>{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;