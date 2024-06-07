import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-icon-active focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-secondary disabled:text-disabled",
  {
    variants: {
      variant: {
        default:
          " bg-brand text-primary-inverse hover:bg-brand-hover active:bg-brand",
        destructive:
          "bg-error text-primary-inverse hover:bg-error-hover active:bg-error",
        outline:
          "border border-secondary shadow-sm bg-primary hover:bg-hover hover:border-secondary-hover active:bg-primary disabled:bg-primary disabled:border-secondary-disabled disabled:text-disabled disabled:shadow-none ",
        secondary:
          "bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary",
        ghost: "hover:bg-hover active:bg-primary",
        link: "text-primary underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
        linkDestructive:
          "text-error underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
      },
      size: {
        sm: "text-subtitle-xs h-9 px-3",
        md: "text-subtitle-xs h-10 px-4",
        lg: "text-subtitle-sm h-11 px-8",
        xl: "text-subtitle-sm h-12 px-10",
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
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
