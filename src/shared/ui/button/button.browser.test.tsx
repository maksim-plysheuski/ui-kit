import { describe, it, expect, vi } from "vitest";
import { render } from "vitest-browser-react";

import { Button } from "./button";

describe("Button browser mode", () => {
  it("onclick event", async () => {
    const onClick = vi.fn();
    const screen = await render(<Button onClick={onClick}>Click</Button>);

    await screen.getByRole("button", { name: "Click" }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled button", async () => {
    const screen = await render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: "Disabled" });
    await expect.element(button).toBeVisible();
    await expect.element(button).toBeDisabled();
  });
});
