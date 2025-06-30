/*
 * VS Code extension API type definitions for Deno & JSR
 * 
 * This file re-exports all VS Code extension API types through the ESM-compatible version.
 * The original ambient module declaration is kept in vscode.d.ts for reference and updates.
 * 
 * @module
 */

/**
 * Re-export all VS Code types from the ESM-compatible declaration
 * 
 * @example
 * ```ts
 * // Import via mod.ts for better compatibility
 * import * as vscode from "jsr:@typed/vscode";
 * 
 * // Or import directly from types/index.d.ts
 * import * as vscode from "jsr:@typed/vscode/types/index.d.ts";
 * ```
 */
export * from "./vscode_mod.d.ts";
