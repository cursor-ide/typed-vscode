/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License.
 *  See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Type Definition for Visual Studio Code 1.101 Extension API
 * See https://code.visualstudio.com/api for more information
 * 
 * This is a proper ESM module version of the vscode types (not an ambient module).
 * The types are automatically synchronized with the official @types/vscode package.
 * 
 * @module
 */

/**
 * The version of the editor.
 * 
 * @example
 * ```ts
 * import { version } from "jsr:@typed/vscode";
 * console.log(`VS Code version: ${version}`);
 * ```
 */
export const version: string;

/**
 * Represents a reference to a command. Provides a title which
 * will be used to represent a command in the UI and, optionally,
 * an array of arguments which will be passed to the command handler
 * function when invoked.
 */
export interface Command {
	/**
	 * Title of the command, like `save`.
	 */
	title: string;

	/**
	 * The identifier of the actual command handler.
	 * @see {@link commands.registerCommand}
	 */
	command: string;

	/**
	 * A tooltip for the command, when represented in the UI.
	 */
	tooltip?: string;

	/**
	 * Arguments that the command handler should be
	 * invoked with.
	 */
	arguments?: any[];
}
