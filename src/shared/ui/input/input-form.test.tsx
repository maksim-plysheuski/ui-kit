import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/shared/ui/form/form";
import { InputForm } from "@/shared/ui/input/input-form";
import { ButtonForm } from "@/shared/ui/button/button-form";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValuesType = z.infer<typeof schema>;

function TestForm() {
  const form = useForm<FormValuesType>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <InputForm
          control={form.control}
          name="email"
          label="Email"
          placeholder="email"
        />
        <ButtonForm>Submit</ButtonForm>
      </form>
    </Form>
  );
}

describe("InputForm", () => {
  it("shows zod validation error on invalid email", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByPlaceholderText("email");
    await user.type(input, "not-an-email");

    await waitFor(() => {
      expect(input).toHaveAttribute("data-error", "true");
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });
  });

  it("disabled button if form is invalid", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const submit = screen.getByRole("button", { name: "Submit" });
    expect(submit).toBeDisabled();

    await user.type(screen.getByPlaceholderText("email"), "maksim@email.com");

    await waitFor(() => {
      expect(submit).not.toBeDisabled();
    });
  });

  it("clears error after valid email is entered", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByPlaceholderText("email");
    await user.type(input, "bad");

    await waitFor(() => {
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });

    await user.clear(input);
    await user.type(input, "maksim@email.com");

    await waitFor(() => {
      expect(input).not.toHaveAttribute("data-error");
      expect(screen.queryByText("Enter a valid email")).not.toBeInTheDocument();
    });
  });
});
