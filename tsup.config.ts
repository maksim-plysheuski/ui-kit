import { defineConfig } from "tsup";
import path from "node:path";
import { rm } from "node:fs/promises";

async function removeEmptyDirs(dir: string) {
  const { readdir, stat } = await import("node:fs/promises");

  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry);
      const info = await stat(fullPath);
      if (info.isDirectory()) {
        await removeEmptyDirs(fullPath);
      }
    }),
  );

  entries = await readdir(dir);
  if (entries.length === 0 && dir !== path.resolve("dist")) {
    await rm(dir, { recursive: true, force: true });
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "button/index": "src/shared/ui/button/button.tsx",
    "input/index": "src/shared/ui/input/input.tsx",
  },
  format: ["esm"],
  dts: true,
  clean: true,
  treeshake: true,
  splitting: true,
  minify: true,
  sourcemap: false,
  tsconfig: "tsconfig.app.json",
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-hook-form",
    "radix-ui",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ],
  esbuildOptions(options) {
    options.alias = {
      "@": path.resolve(process.cwd(), "src"),
    };
  },
  async onSuccess() {
    await removeEmptyDirs(path.resolve("dist"));
  },
});
