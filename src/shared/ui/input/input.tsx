import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/ui/shadcn/lib/utils";
import { Input as InputPrimitive } from "@/shared/ui/shadcn/ui/input/input";

const inputVariants = cva(
  "disabled:cursor-not-allowed disabled:border-input disabled:bg-muted/30 disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "hover:border-primary focus-visible:border-primary focus-visible:ring-[0.1875rem] focus-visible:ring-primary/40",
        secondary:
          "hover:border-secondary focus-visible:border-secondary focus-visible:ring-[0.1875rem] focus-visible:ring-secondary/40",
      },
      error: {
        true: "border-destructive ring-[0.1875rem] ring-destructive/40 hover:border-destructive hover:ring-destructive/40 focus-visible:border-destructive focus-visible:ring-[0.1875rem] focus-visible:ring-destructive/40 disabled:border-destructive/40 disabled:ring-destructive/20",
      },
    },
    defaultVariants: {
      variant: "primary",
      error: false,
    },
  },
);

export interface InputProps
  extends
    React.ComponentProps<typeof InputPrimitive>,
    VariantProps<typeof inputVariants> {}

function Input({
  className,
  variant = "primary",
  error = false,
  ...props
}: InputProps) {
  return (
    <InputPrimitive
      {...props}
      data-variant={variant}
      data-error={error || undefined}
      aria-invalid={error || undefined}
      className={cn(inputVariants({ variant, error }), className)}
    />
  );
}

export { Input };
