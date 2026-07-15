import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/shared/ui/input/input";
import { InputForm } from "@/shared/ui/input/input-form";
import { ButtonForm } from "@/shared/ui/button/button-form";
import { Form } from "@/shared/ui/form/form";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
      description: "Visual variant of the input",
      table: {
        type: { summary: "primary | secondary" },
        defaultValue: { summary: "primary" },
      },
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
  },
  args: {
    placeholder: "email@maksim.com",
    variant: "primary",
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Disabled",
  },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: "invalid-email",
  },
};

export const States: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Input {...args} placeholder="default" />
      <Input
        {...args}
        placeholder="hovered"
        className={
          args.variant === "secondary" ? "border-secondary" : "border-primary"
        }
      />
      <Input
        {...args}
        placeholder="focused"
        className={
          args.variant === "secondary"
            ? "border-secondary ring-[0.1875rem] ring-secondary/40"
            : "border-primary ring-[0.1875rem] ring-primary/40"
        }
      />
      <Input {...args} error defaultValue="invalid" />
      <Input {...args} disabled defaultValue="disabled" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      <Input
        {...args}
        variant="primary"
        placeholder="primary"
        className="border-primary ring-[0.1875rem] ring-primary/40"
      />
      <Input
        {...args}
        variant="secondary"
        placeholder="secondary"
        className="border-secondary ring-[0.1875rem] ring-secondary/40"
      />
    </div>
  ),
};

const demoSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type DemoValues = z.infer<typeof demoSchema>;

function FormDemo() {
  const form = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
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
          placeholder="maksim@email.com"
        />
        <ButtonForm>Send</ButtonForm>
      </form>
    </Form>
  );
}

export const WithForm: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <FormDemo />,
};
