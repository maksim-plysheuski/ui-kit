import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/ui/shadcn/lib/utils";
import { Button as ButtonPrimitive } from "@/shared/ui/shadcn/ui/button/button";

const buttonVariants = cva("cursor-pointer hover:brightness-[0.7]", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary",
    },
    error: {
      true: "border border-destructive ring-[0.1875rem] ring-destructive/40",
    },
  },
  defaultVariants: {
    variant: "primary",
    error: false,
  },
});

export interface ButtonProps
  extends
    Omit<React.ComponentProps<typeof ButtonPrimitive>, "variant">,
    VariantProps<typeof buttonVariants> {}

function Button({
  className,
  variant = "primary",
  error = false,
  asChild,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      {...props}
      variant="default"
      asChild={asChild}
      data-variant={variant}
      data-error={error || undefined}
      aria-invalid={error || undefined}
      className={cn(buttonVariants({ variant, error }), className)}
    />
  );
}

export { Button };
