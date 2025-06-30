# @typed/vscode

> TypeScript definitions for the VSCode API - optimized for Deno and JSR

[![JSR Scope](https://jsr.io/badges/@typed)](https://jsr.io/@typed)
[![JSR](https://jsr.io/badges/@typed/vscode)](https://jsr.io/@typed/vscode)
[![JSR Score](https://jsr.io/badges/@typed/vscode/score)](https://jsr.io/@typed/vscode/score)
[![GitHub CI](https://img.shields.io/github/actions/workflow/status/cursor-ide/typed-vscode/update.yml?branch=main&label=sync)](https://github.com/cursor-ide/typed-vscode/actions/workflows/update.yml)
[![Last Updated](https://img.shields.io/github/last-commit/cursor-ide/typed-vscode?label=last%20synced)](https://github.com/cursor-ide/typed-vscode/commits/main)
[![License](https://img.shields.io/github/license/cursor-ide/typed-vscode)](https://github.com/cursor-ide/typed-vscode/blob/main/LICENSE)

This package provides comprehensive TypeScript type definitions for the Visual Studio Code Extension API, specifically adapted for use with **Deno** and the **JSR** package registry. It enables you to develop VSCode extensions using modern Deno tooling while maintaining full type safety and IntelliSense support.

## Features

✅ **Complete VSCode API Coverage** - All VSCode extension APIs and types  
✅ **Deno-Native** - No Node.js dependencies, works directly with Deno  
✅ **JSR-Optimized** - Built for the JSR package registry  
✅ **ESM Compatible** - Modern ES module structure  
✅ **Type-Safe** - Full TypeScript strict mode compliance  
✅ **Up-to-Date** - Automatically synced with upstream [`@types/vscode`](https://www.npmjs.com/package/@types/vscode)

## Installation

### Using JSR (Recommended)

```bash
# Add to your Deno project
deno add @typed/vscode

# Or install globally for CLI usage
deno install --global @typed/vscode
```

### Import Map (Manual)

```json
{
  "imports": {
    "vscode": "jsr:@typed/vscode"
  }
}
```

## Usage

### Basic Extension Development

```typescript
import * as vscode from "@typed/vscode";

export function activate(context: vscode.ExtensionContext): void {
  console.log('Extension activated!');
  
  // Register a command
  const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from Deno!');
  });
  
  context.subscriptions.push(disposable);
}

export function deactivate(): void {
  console.log('Extension deactivated');
}
```

### Working with VSCode APIs

```typescript
import * as vscode from "@typed/vscode";

// Window management
vscode.window.showInformationMessage("Hello from Deno!");
vscode.window.showErrorMessage("Error occurred", "Retry", "Cancel");

// Workspace operations
const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
const config = vscode.workspace.getConfiguration('myExtension');

// Document and editor operations
const activeEditor = vscode.window.activeTextEditor;
if (activeEditor) {
  const document = activeEditor.document;
  const selection = activeEditor.selection;
  // Type-safe operations on document and selection
}

// Language features
vscode.languages.registerCompletionItemProvider('typescript', {
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
    const completions: vscode.CompletionItem[] = [];
    // Add your completion logic
    return completions;
  }
});
```

### Type-Safe Event Handling

```typescript
import * as vscode from "@typed/vscode";

// File system events
vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
  console.log(`Document changed: ${event.document.fileName}`);
});

// Window events
vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
  if (editor) {
    console.log(`Active editor: ${editor.document.fileName}`);
  }
});
```

### Web Extension Support

#### Why Web Extensions?

This package is optimized for the **VSCode Web Extensions** runtime as our **pragmatic path to bringing VSCode extension development to Deno**. While our ideal would be full parity with the Node.js extension development environment, the web extension runtime represents the best available approach given current VSCode architecture limitations.

**The Reality:**

- 🎯 **Goal**: Enable Deno-native VSCode extension development
- ⚠️ **Challenge**: VSCode's extension host is deeply integrated with Node.js
- ✅ **Solution**: Leverage the web extension runtime for Deno compatibility
- 🪄 **Future**: Working toward fuller Node.js runtime parity as the ecosystem evolves

#### Universal Compatibility

The web extension runtime enables you to create extensions that run **everywhere** - both desktop VSCode and web-based environments (vscode.dev, github.dev, GitHub Codespaces):

```typescript
import * as vscode from "@typed/vscode";

// Web extensions run on BOTH desktop and web VSCode
export function activate(context: vscode.ExtensionContext): void {
  // Full VSCode API support: TreeView, Commands, Language Features, etc.
  const provider = new MyTreeDataProvider();
  vscode.window.createTreeView('myView', { treeDataProvider: provider });
  
  // Limitation: Node.js APIs are not available (browser sandbox restrictions)
  // But the extension works identically on desktop and web!
}
```

**Key Benefits:**

- ✅ **Universal compatibility** - One extension runs on desktop AND web VSCode
- ✅ **Full VSCode API access** - Commands, UI, language features, etc.
- ✅ **Modern deployment** - Works in vscode.dev, github.dev, Codespaces
- ⚠️ **Browser limitations** - No Node.js/filesystem APIs (applies to web runtime only)

## 🚧 Deno VSCode Extension Ecosystem (WIP) 🚧

`@typed/vscode` is part of a complete ecosystem for Deno-based VSCode extension development. Explore these complementary packages:

### 🛠️ Development Tools

**[@vsce/cli](https://jsr.io/@vsce/cli)** - Command-line tools for Deno VSCode extensions

```bash
deno add @vsce/cli
```

- Project scaffolding and templates
- Development server with hot reload  
- Build and packaging utilities
- Extension testing and validation

**[@vsce/create](https://jsr.io/@vsce/create)** - Project generator for new extensions

```bash
deno add @vsce/create
```

- Interactive project setup
- Multiple template options (basic, language server, tree view, etc.)
- Deno-optimized project structure
- Best practices and conventions built-in

### 🔧 Build and Bundle

**[@vsce/bundler](https://jsr.io/@vsce/bundler)** - Web extension bundler for Deno

```bash
deno add @vsce/bundler
```

- Bundle Deno code for VSCode web extensions
- Tree shaking and optimization
- Source map support
- Multi-target builds (desktop + web)

### 🧪 Testing Framework

**[@vsce/testing](https://jsr.io/@vsce/testing)** - Testing utilities for VSCode extensions

```bash
deno add @vsce/testing
```

- Mock VSCode APIs for unit testing
- Extension host simulation
- Language server testing utilities
- TreeView and UI component testing

### 📚 Complete Example

```typescript
// extension.ts - Built with the full @vsce ecosystem
import * as vscode from "@typed/vscode";
import { createLanguageServer } from "@vsce/cli";
import { MockExtensionContext } from "@vsce/testing";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  // Full ecosystem integration example
  const server = await createLanguageServer({
    name: 'my-language-server',
    languages: ['typescript', 'javascript']
  });
  
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(['typescript'], server),
    vscode.languages.registerCompletionItemProvider(['typescript'], server)
  );
}
```

## Runtime Compatibility

| Environment | Support | Notes |
|-------------|---------|-------|
| **VSCode Desktop** | ✅ Full | All APIs available |
| **VSCode Web** | ✅ Most APIs | No Node.js/filesystem APIs |
| **Deno Runtime** | ✅ Type-checking | For development and testing |
| **GitHub Codespaces** | ✅ Full | Web + server APIs |
| **vscode.dev** | ✅ Web APIs | Browser-based development |

## API Coverage

This package includes types for all major VSCode API areas:

- **Core APIs**: Commands, Configuration, Extensions
- **Editor APIs**: TextEditor, TextDocument, Selection
- **Language APIs**: Completion, Hover, Diagnostics, LSP
- **UI APIs**: TreeView, WebView, StatusBar, QuickPick
- **Workspace APIs**: Files, Folders, Settings, Tasks
- **Debug APIs**: Debug Sessions, Breakpoints, Variables
- **Terminal APIs**: Integrated Terminal, Task Running
- **SCM APIs**: Source Control Management
- **Authentication APIs**: Auth Providers, Secrets

This package is automatically generated and maintained. For issues:

- **Type definitions**: Report at [typed-vscode repository](https://github.com/typed-deno/typed-vscode)
- **Ecosystem packages**: Each `@vsce/*` package has its own repository
- **Upstream VSCode types**: Report at [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/vscode)

## Version Compatibility

| @typed/vscode | VSCode API | Status |
|---------------|------------|--------|
| 1.96.x | VSCode 1.96+ | ✅ Current |
| 1.95.x | VSCode 1.95+ | 🟡 Maintenance |
| < 1.95 | Older versions | ❌ Deprecated |

The package version follows the VSCode API version for compatibility.

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Happy coding with Deno + VSCode! 🦕⚡**

*Part of the [@vsce ecosystem](https://jsr.io/@vsce) for Deno-based VSCode extension development.*
