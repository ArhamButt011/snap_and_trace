import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const button = cva(
  [
    "py-2",
    "rounded-[38px]",
    "font-medium",
    "text-[20.21px]",
    "leading-[36px]",
    "font-raleway",
  ],
  // bg-gradient-to-r from-[#154454] to-black
  {
    variants: {
      variant: {
        primary: [
          "text-black  w-full text-[20.21px] flex justify-center items-center rounded-[38px]   bg-accent",
        ],
      },
      size: {
        small: ["", ""],
        medium: [""],
      },
    },
    compoundVariants: [{ variant: "primary", size: "medium" }],
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof button> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  isLoading,
  children,
  size,

  ...props
}) => (
  <button
    disabled={isLoading}
    className={cn(button({ variant, size, className }))}
    {...props}
  >
    {isLoading ? "Loading" : children}
  </button>
);

export default Button;
