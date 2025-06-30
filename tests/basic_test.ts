import * as vscode from "../mod.ts";
import * as assert from "jsr:@std/assert";

Deno.test("@typed/vscode exports are available", () => {
  // Test that we can import the module without errors
  assert.assertEquals(typeof vscode, "object");
});

Deno.test("module has expected structure", () => {
  // Basic smoke test - the module should export some common VSCode types
  // This is a type-only package, so we're just testing import success
  assert.assertEquals(typeof vscode, "object");
});
