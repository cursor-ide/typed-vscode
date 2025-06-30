/**
 * VS Code Extension API TypeScript definitions for Deno
 * 
 * This package contains **types only** for the VS Code Extension API.
 * There is no runtime export. Importing this module gives you the
 * declaration files to power IntelliSense and type-checking in Deno.
 *
 * @module
 */

/**
 * Re-exports all VS Code extension API types from the ESM-compatible type declaration.
 * Use these types to develop VS Code extensions with Deno.
 * 
 * @example
 * ```ts
 * import type * as vscode from "jsr:@typed/vscode";
 * 
 * export function activate(context: vscode.ExtensionContext) {
 *   // Your extension code here
 * }
 * ```
 */
export * from "./types/vscode_mod.d.ts";

// No runtime export, type-only package
export {};
