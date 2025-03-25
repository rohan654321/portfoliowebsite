import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for class merging

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean; // ✅ Add support for `asChild`
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // ✅ Dynamically set the element type

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100",
          variant === "ghost" && "hover:bg-gray-100",
          size === "sm" && "px-2 py-1 text-sm",
          size === "lg" && "px-6 py-3 text-lg",
          size === "icon" && "p-2",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
