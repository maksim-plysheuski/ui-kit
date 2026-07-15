import { useFormContext } from "react-hook-form";

import { Button, type ButtonProps } from "@/shared/ui/button/button";

export type ButtonFormProps = Omit<ButtonProps, "type">;

function ButtonForm(props: ButtonFormProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const isDisabled = props.disabled || isSubmitting || !isValid;

  return <Button {...props} type="submit" disabled={isDisabled} />;
}

export { ButtonForm };
