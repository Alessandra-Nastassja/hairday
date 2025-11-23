import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva ("font-sans text-gray-400", {
  variants: {
    intent: {
      "default": "rounded-lg text-base text-md text-center p-2 w-20",
    },
    variant: {
      "default": "text-gray-100 bg-gray-600",
      "hover": "text-gray-100 bg-gray-600",
      "selected": "text-yellow bg-gray-600 border border-b-yellow",
      disabled: "text-gray-500 bg-gray-700 border border-gray-600 cursor-not-allowed",
    }
  },
  defaultVariants: {
    variant: "default", 
    intent: "default"
  }
})

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode; 
  value?: string;
  disabled?: boolean;
  isSelected?: boolean;
  style?: React.CSSProperties;
}

export default function ButtonTime({
  as = 'button', 
  variant = 'default',
  className, 
  children, 
  value,
  isSelected = false,
  disabled = false,
  ...props}: ButtonProps) {

    const finalVariant = isSelected ? "selected" : disabled ? "disabled" : "default";

  return React.createElement(
    as, 
    {
      className: buttonVariants({ variant: finalVariant, className }),
      ...props
    },
    children,
  )
}