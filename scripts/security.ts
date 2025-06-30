#!/usr/bin/env -S deno run -A

/*
 * This script checks for exposed tokens in the source files.
 * It is run as a pre-commit hook.
 */

const decoder = new TextDecoder("utf-8");

const tokenPatterns = [
  /ghp_[a-zA-Z0-9]{36}/g,
  /github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59}/g,
  /ghs_[a-zA-Z0-9]{36}/g,
];

const filesToCheck = [
  "scripts",
  "tests",
];

console.log("🔍 Checking for exposed tokens...\n");

for (const path of filesToCheck) {
  for await (const entry of Deno.readDir(path)) {
    if (entry.isFile && entry.name.endsWith(".ts")) {
      const content = decoder.decode(
        await Deno.readFile(`${path}/${entry.name}`)
      );
      
      for (const pattern of tokenPatterns) {
        if (pattern.test(content)) {
          console.error(`❌ Potential token found in ${path}/${entry.name}`);
          Deno.exit(1);
        }
      }
    }
  }
}

console.log("✅ No tokens found in source files");