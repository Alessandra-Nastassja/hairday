import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva ("font-sans text-gray-400", {
  variants: {
    intent: {
      "default": "rounded-lg text-gray-900 text-md text-center p-3",
    },
    variant: {
      "default": "bg-yellow",
      "hover": "bg-yellow/80 hover:bg-yellow-light transition-colors",
      "disabled": "bg-yellow-dark cursor-not-allowed",
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
}

export default function ButtonDefault({
  as = 'button', 
  variant,
  className, 
  children, 
  value,
  ...props}: ButtonProps) {
  return React.createElement(
    as, 
    {
      className: buttonVariants({ variant, className }),
      ...props
    },
    children,
  )
}