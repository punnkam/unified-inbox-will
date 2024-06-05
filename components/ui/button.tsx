import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-subtitle-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-icon-active focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-secondary disabled:text-disabled",
  {
    variants: {
      variant: {
        default: "bg-brand text-primary-inverse hover:bg-brand-hover",
        destructive:
          "bg-error text-primary-inverse hover:bg-error-hover active:bg-error",
        outline:
          "border stroke-secondary shadow-sm bg-primary hover:bg-hover hover:stroke-secondary-hover active:bg-primary disabled:bg-primary disabled:stroke-disabled disabled:text-disabled disabled:shadow-none ",
        secondary:
          "bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary",
        ghost: "hover:bg-hover active:bg-primary",
        link: "text-primary underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
        linkDestructive:
          "text-error underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
      },
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 rounded-md px-4",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
