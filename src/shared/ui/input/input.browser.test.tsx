import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";

import { Input } from "@/shared/ui/input/input";

describe("Input browser mode", () => {
  it("enter value", async () => {
    const screen = await render(<Input placeholder="email" />);

    const input = screen.getByPlaceholder("email");
    await input.fill("maksim@email.com");

    await expect.element(input).toHaveValue("maksim@email.com");
  });

  it("disabled is not editable", async () => {
    const screen = await render(<Input disabled placeholder="disabled" />);

    await expect.element(screen.getByPlaceholder("disabled")).toBeDisabled();
  });
});
