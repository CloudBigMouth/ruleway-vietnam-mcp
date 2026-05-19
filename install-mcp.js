#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const PKG = require("./package.json");

const PROD_URL = "https://mcp.ruleway.ai/sse";
const DEV_URL  = "https://mcpdev.ruleway.ai/sse";

const MCP_SERVER_KEY = "vietnamese-legal";

// ── Config file paths per tool ────────────────────────────────────────────────

const isWin = process.platform === "win32";
const home  = os.homedir();
const appData = process.env.APPDATA || path.join(home, "AppData", "Roaming");

const CONFIG_PATHS = {
  cursor: path.join(home, ".cursor", "mcp.json"),
  claude: isWin
    ? path.join(appData, "Claude", "claude_desktop_config.json")
    : path.join(home, "Library", "Application Support", "Claude", "claude_desktop_config.json"),
  windsurf: path.join(home, ".codeium", "windsurf", "mcp_config.json"),
  codex: path.join(home, ".codex", "config.json"),
  antigravity: path.join(home, ".gemini", "antigravity", "mcp_config.json"),
  gemini: path.join(home, ".gemini", "settings.json"),
};

const TOOL_LABELS = ["Cursor", "Claude Desktop", "Windsurf", "Codex", "Antigravity", "Gemini CLI"];
const TOOL_KEYS   = ["cursor", "claude", "windsurf", "codex", "antigravity", "gemini"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function detectBaseUrl() {
  const args = process.argv.slice(2);
  if (args.includes("--dev")) return DEV_URL;
  const urlIdx = args.indexOf("--url");
  if (urlIdx !== -1 && args[urlIdx + 1]) return args[urlIdx + 1].replace(/\/$/, "");
  return PROD_URL;
}

function getArgValue(flag) {
  const args = process.argv.slice(2);
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}

function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  Created directory: ${dir}`);
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function buildServerBlock(apiKey, url) {
  return {
    url,
    headers: { "x-api-key": apiKey },
  };
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question + " ", resolve));
}

async function selectFromList(rl, prompt, items) {
  console.log("\n" + prompt);
  items.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
  while (true) {
    const answer = await ask(rl, `\n(1-${items.length}):`);
    const n = parseInt(answer, 10);
    if (n >= 1 && n <= items.length) return n - 1;
  }
}

async function promptApiKey(rl) {
  const keyArg = getArgValue("--key");
  if (keyArg) {
    if (!keyArg.startsWith("rwmcp_")) {
      console.log("Invalid API key. It must start with 'rwmcp_'.");
      process.exit(1);
    }
    return keyArg;
  }
  console.log("\n(starts with rwmcp_)");
  while (true) {
    const key = (await ask(rl, "Enter your API key (from https://ruleway.ai/mcp/dashboard):")).trim();
    if (!key) { console.log("API key is required."); continue; }
    if (!key.startsWith("rwmcp_")) { console.log("Invalid API key. It must start with 'rwmcp_'. Please try again."); continue; }
    return key;
  }
}

// ── Install / update logic ────────────────────────────────────────────────────

function installMcp(toolKey, apiKey, url) {
  const configPath = CONFIG_PATHS[toolKey];
  const config = readJson(configPath);

  if (!config.mcpServers) config.mcpServers = {};

  const existing = config.mcpServers[MCP_SERVER_KEY];
  const newBlock = buildServerBlock(apiKey, url);

  config.mcpServers[MCP_SERVER_KEY] = newBlock;
  writeJson(configPath, config);

  return { configPath, wasExisting: !!existing };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const baseUrl = detectBaseUrl();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log(`\nRuleway Vietnamese Legal MCP Installer v${PKG.version}`);
  if (baseUrl !== PROD_URL) console.log(`  ⚠ Dev mode: ${baseUrl}`);
  console.log("─".repeat(60));

  // Tool selection
  const toolArg = getArgValue("--tool");
  let toolIdx;
  if (toolArg && TOOL_KEYS.includes(toolArg.toLowerCase())) {
    toolIdx = TOOL_KEYS.indexOf(toolArg.toLowerCase());
  } else {
    toolIdx = await selectFromList(rl, "Which AI tool would you like to configure?", TOOL_LABELS);
  }
  const toolKey   = TOOL_KEYS[toolIdx];
  const toolLabel = TOOL_LABELS[toolIdx];

  // API key
  const apiKey = await promptApiKey(rl);
  rl.close();

  // Write config
  console.log("\nConfiguring...");
  const { configPath, wasExisting } = installMcp(toolKey, apiKey, baseUrl);

  if (wasExisting) {
    console.log(`\n✓ MCP server updated for ${toolLabel}`);
  } else {
    console.log(`\n✓ MCP server configured for ${toolLabel}`);
  }
  console.log(`  Config: ${configPath}`);
  console.log(`  Server: ${baseUrl}`);
  console.log(`\n  Restart ${toolLabel} to activate the MCP server.`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
