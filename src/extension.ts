// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const API_KEY = "mPoeLaRLOWLieoTAQu3A4yixa5tyBrHy";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(
        'Congratulations, your extension "vs-code-cat-time" is now active!'
    );

    let panel: vscode.WebviewPanel | null = null;
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "cat-time.get-random-cat",
        () => {
            fetch(
                `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=cat&rating=pg-13`
            )
                .then((res) => res.json())
                .then((json: any) => {
                    if (!panel) {
                        panel = vscode.window.createWebviewPanel(
                            "CatTime",
                            "Cat Time",
                            vscode.ViewColumn.One,
                            {}
                        );
                    }
                    panel.reveal();
                    panel.webview.html = getWebviewContent(
                        json["data"]["images"]["original"]["url"],
                        json["data"]["source"]
                    );
                });
            if (vscode.debug.activeDebugSession) {
                console.log("VS Code is currently debugging");
            } else {
                console.log("VS Code is not currently debugging");
            }
        }
    );

    context.subscriptions.push(disposable);
}

function getWebviewContent(url: string, source_url?: string) {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
	</head>
	<body>
	<h1>It's Cat Time!</h1>
		<img style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 90%);" src="${url}" />
        <p>Image from <a href="https://giphy.com/">Giphy</a></p>
        <p>Source: <a href="${source_url}">${source_url}</a></p>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
