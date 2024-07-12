import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const buttonVariants = cva(
  "py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-icon-active focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled",
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
        ghost: "hover:bg-hover",
        link: "text-primary underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
        linkDestructive:
          "text-error underline-offset-4 hover:underline disabled:bg-transparent disabled:text-disabled disabled:underline-none",
      },
      size: {
        xs: "text-subtitle-2xs h-9 px-4",
        sm: "text-subtitle-xs h-9 px-4",
        md: "text-subtitle-xs h-10 px-4",
        lg: "text-subtitle-sm h-11 px-4",
        xl: "text-subtitle-sm h-12 px-4",
        iconMd: "h-10 w-10 flex items-center justify-center",
        iconSm: "h-8 w-8",
        icon: "h-10 w-10",
        iconXs: "h-6 w-6",
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
