import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/shared/ui/button/button";

describe("Button UI", () => {
  it("render children", () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
  });

  it("Primary variant", () => {
    render(<Button>Primary</Button>);

    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "primary",
    );
  });

  it("Secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "secondary",
    );
  });

  it("if error=true - aria-invalid и destructive", () => {
    render(<Button error>Error</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-invalid", "true");
    expect(button).toHaveAttribute("data-error", "true");
    expect(button).toHaveClass("border-destructive");
  });

  it("disabled state", () => {
    render(<Button disabled>Disabled</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("no onClick if disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });
});
