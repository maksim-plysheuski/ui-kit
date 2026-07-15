import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "@/shared/ui/input/input";

describe("Input UI", () => {
  it("render placeholder", () => {
    render(<Input placeholder="placeholder example" />);

    expect(
      screen.getByPlaceholderText("placeholder example"),
    ).toBeInTheDocument();
  });

  it("Primary variant", () => {
    render(<Input placeholder="p" />);

    expect(screen.getByPlaceholderText("p")).toHaveAttribute(
      "data-variant",
      "primary",
    );
  });

  it("Secondary variant", () => {
    render(<Input variant="secondary" placeholder="s" />);

    expect(screen.getByPlaceholderText("s")).toHaveAttribute(
      "data-variant",
      "secondary",
    );
  });

  it("if error=true - aria-invalid and destructive border", () => {
    render(<Input error placeholder="e" />);

    const input = screen.getByPlaceholderText("e");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("data-error", "true");
    expect(input).toHaveClass("border-destructive");
  });

  it("disabled state", () => {
    render(<Input disabled placeholder="d" />);

    expect(screen.getByPlaceholderText("d")).toBeDisabled();
  });

  it("call onChange", async () => {
    const onChange = vi.fn();
    render(<Input placeholder="type" onChange={onChange} />);

    const input = screen.getByPlaceholderText<HTMLInputElement>("type");
    await userEvent.type(input, "abc");

    expect(input.value).toBe("abc");
    expect(onChange).toHaveBeenCalled();
  });
});
