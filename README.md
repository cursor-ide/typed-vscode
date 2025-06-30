<div align="center">

## jsr:@typed/vscode

[![JSR Scope](https://jsr.io/badges/@typed)](https://jsr.io/@typed)
[![JSR](https://jsr.io/badges/@typed/vscode)](https://jsr.io/@typed/vscode)
[![JSR Score](https://jsr.io/badges/@typed/vscode/score)](https://jsr.io/@typed/vscode/score)
[![GitHub CI](https://img.shields.io/github/actions/workflow/status/cursor-ide/typed-vscode/update.yml?branch=main&label=sync)](https://github.com/cursor-ide/typed-vscode/actions/workflows/update.yml)
[![Last Updated](https://img.shields.io/github/last-commit/cursor-ide/typed-vscode?label=last%20synced)](https://github.com/cursor-ide/typed-vscode/commits/main)
[![License](https://img.shields.io/github/license/cursor-ide/typed-vscode)](https://github.com/cursor-ide/typed-vscode/blob/main/LICENSE)

### Native Deno & JSR Support for the vscode Extension API

#### Automatically synced with the official [@types/vscode](https://www.npmjs.com/package/@types/vscode) package

</div>

Use [Deno](https://docs.deno.com/) and enjoy development without the need for
`node_modules` or package managers! This repository ports the official
[@types/vscode](https://www.npmjs.com/package/@types/vscode) declarations as a
[JSR](https://jsr.io/) module so they can be consumed natively by
[Deno](https://docs.deno.com/) (and any other runtimes that adopt JSR).

```ts
import type * as vscode from "jsr:@typed/vscode";
```

---

## Usage

### In Deno Projects

1. Ensure you have **Deno ≥ 1.39**, which has built-in JSR support
2. Import directly in your code:

   ```typescript
   import type * as vscode from "jsr:@typed/vscode";
   
   export function activate(context: vscode.ExtensionContext) {
     // Your VS Code extension code...
   }
   ```

3. Or add to your `deno.json` configuration:

   ```json
   {
     "compilerOptions": {
       "types": ["jsr:@typed/vscode"]
     }
   }
   ```

No `npm:` specifiers, no compatibility layer needed!

---

## Repository Structure

| Path                            | Purpose                                             |
|---------------------------------|-----------------------------------------------------|
| `types/vscode.d.ts`             | Upstream declaration file from DefinitelyTyped      |
| `types/vscode_mod.d.ts`         | ESM-compatible version for JSR compatibility        |
| `mod.ts`                        | Type exports for the JSR package                    |
| `jsr.json`                      | Package metadata for the JSR registry               |
| `scripts/update.ts`             | Sync script – fetches latest types & bumps version  |
| `.github/workflows/update.yml`  | CI workflow that runs the sync script daily         |
| `deno.json`                     | Local development settings & `prepare` task         |

---

## Automation Details

### Daily Synchronization

This package automatically stays in sync with the official [@types/vscode](https://www.npmjs.com/package/@types/vscode) package:

* **Daily checks** – GitHub Actions runs `scripts/update.ts` every day at 03:00 UTC
* **Version detection** – The script checks for new versions of `@types/vscode` on npm
* **Auto-update process** – When a new version is found:
  1. Downloads the latest declaration file from DefinitelyTyped
  2. Writes it to `types/vscode.d.ts`
  3. Generates the ESM-compatible version in `types/vscode_mod.d.ts`
  4. Updates `jsr.json` with the matching version number
  5. Commits changes to the repository
  6. Publishes the updated package to JSR

### CI/CD Configuration

* The GitHub workflow requires a `JSR_TOKEN` secret for publishing
* Updates can be manually triggered via the Actions tab in GitHub
* All changes are automatically committed back to the main branch

---

## Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/cursor-ide/typed-vscode
cd typed-vscode

# Install dependencies & fetch latest types
deno task prepare

# Run tests
deno test -A

# Test publishing (dry run)
jsr publish --dry-run
```

### Creating Your Own Fork

If you want to customize or extend this package:

1. Fork the repository on GitHub
2. Set up the `JSR_TOKEN` secret in your repository settings
3. Update the necessary configuration files to match your JSR scope
4. Make your desired changes
5. Publish manually once to establish the package

```bash
jsr publish
```

The CI automation will take over for future updates.

---

## Version History

This package's version number **exactly matches** the underlying `@types/vscode` version. For example, `@typed/vscode@1.101.0` contains the types from `@types/vscode@1.101.0`.

## Why This Package?

* **Native JSR support** - Proper ES module structure for Deno
* **Automatic updates** - Always in sync with the official types
* **No Node.js dependencies** - Clean integration with Deno projects
* **Zero runtime footprint** - Types only, no runtime code

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests if you find any problems or have suggestions for improvements.

## License

MIT © [cursor-ide](https://github.com/cursor-ide)

The VS Code type definitions are originally © Microsoft and contributors under the MIT license.
