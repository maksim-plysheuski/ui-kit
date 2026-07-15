import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/shared/ui/button/button";
import { ButtonForm } from "@/shared/ui/button/button-form";
import { Form } from "@/shared/ui/form/form";
import { InputForm } from "@/shared/ui/input/input-form";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
      description: "Variant of the button",
      table: {
        type: { summary: "primary | secondary" },
        defaultValue: { summary: "primary" },
      },
    },
    error: {
      control: "boolean",
      description: "error state",
    },
    disabled: {
      control: "boolean",
      description: "disable the button",
    },
    children: {
      control: "text",
      description: "text of the button",
    },
    asChild: {
      table: { disable: true },
      control: false,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const Error: Story = {
  args: {
    error: true,
    children: "Error",
  },
};

export const States: Story = {
  args: { children: "Button" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args}> default</Button>
      <Button {...args} className="brightness-[0.7]">
        hover
      </Button>
      <Button {...args} className="ring-[0.1875rem] ring-ring/50">
        focus
      </Button>
      <Button {...args} error>
        error
      </Button>
      <Button {...args} disabled>
        disabled
      </Button>
    </div>
  ),
};

const inputWithFormSchema = z.object({
  email: z.string().email("enter a valid email"),
});

type DemoValues = z.infer<typeof inputWithFormSchema>;

function InputWithForm({ label }: { label: ReactNode }) {
  const form = useForm<DemoValues>({
    resolver: zodResolver(inputWithFormSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex w-72 flex-col gap-4"
      >
        <InputForm
          control={form.control}
          name="email"
          label="Email"
          placeholder="please enter your email"
        />
        <ButtonForm>{label}</ButtonForm>
      </form>
    </Form>
  );
}

export const WithForm: Story = {
  args: { children: "Send" },
  parameters: {
    layout: "padded",
  },
  render: (args) => <InputWithForm label={args.children} />,
};
