#!/usr/bin/env -S deno run --allow-read --allow-env --allow-net --allow-write

/*
 * Syncs the local declaration files and jsr.json version with the upstream
 * `@types/vscode` package on npm. Designed to be safe to run in CI and locally.
 */

import { parseArgs } from "jsr:@std/cli/parse-args";
import { ensureDir } from "jsr:@std/fs/ensure-dir";

const { local } = parseArgs(Deno.args, {
  boolean: ["local"],
  default: { local: false },
}) as { local: boolean };

/**
 * Return the latest version of `@types/vscode` available on npm.
 * In `--local` mode we skip the network call to npm for faster iterations.
 */
async function getUpstreamVersion(): Promise<string> {
  if (local) return "0.0.0-dev";
  const { stdout } = await new Deno.Command("npm", {
    args: ["view", "@types/vscode", "version"],
    stdout: "piped",
  }).output();
  return new TextDecoder().decode(stdout).trim();
}

const upstreamVersion = await getUpstreamVersion();

const jsrPath = "jsr.json";
const jsrRaw = await Deno.readTextFile(jsrPath);
const jsr = JSON.parse(jsrRaw) as Record<string, unknown>;
const currentVersion = jsr.version as string;

if (upstreamVersion === currentVersion && !local) {
  console.log(`Already up-to-date: ${currentVersion}`);
  Deno.exit(0);
}

// Fetch latest declaration file
const DTS_URL =
  "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/HEAD/types/vscode/index.d.ts";
const res = await fetch(DTS_URL);
if (!res.ok) {
  throw new Error(`Failed to fetch declarations: HTTP ${res.status}`);
}

await ensureDir("types");

// Get the declaration file content
const declContent = await res.text();

// Write the original ambient module declaration
await Deno.writeTextFile("types/vscode.d.ts", declContent);

// Create ESM-compatible wrapper
const esmWrapper = `// ESM-compatible wrapper for vscode types
// This module re-exports all types from the original ambient declaration
// in a way that's compatible with ES modules and JSR

export * from "./vscode.d.ts";

// Re-export the global vscode namespace as a named export
import type * as VSCodeTypes from "./vscode.d.ts";
export type { VSCodeTypes as vscode };
`;

await Deno.writeTextFile("types/vscode_mod.d.ts", esmWrapper);

// Create index.d.ts that exports everything
const indexContent = `// Main type exports for @typed/vscode
export * from "./vscode_mod.d.ts";
`;

await Deno.writeTextFile("types/index.d.ts", indexContent);

// Update jsr.json version
jsr.version = upstreamVersion;
await Deno.writeTextFile(jsrPath, JSON.stringify(jsr, null, 2) + "\n");

console.log(`Updated to ${upstreamVersion}`);
