#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const PKG = require("./package.json");

const PROD_URL = "https://mcp.ruleway.ai";
const DEV_URL  = "https://mcpdev.ruleway.ai";

const SKILL_NAME = "vietnamese-legal";

const SKILL_DIRS = {
  cursor:      path.join(os.homedir(), ".cursor", "skills", SKILL_NAME),
  claude:      path.join(os.homedir(), ".claude", "skills", SKILL_NAME),
  codex:       path.join(os.homedir(), ".agents", "skills", SKILL_NAME),
  antigravity: path.join(os.homedir(), ".gemini", "antigravity", "skills", SKILL_NAME),
};

const PROJECT_SKILL_DIRS = {
  cursor:      path.join(".cursor", "skills", SKILL_NAME),
  claude:      path.join(".claude", "skills", SKILL_NAME),
  codex:       path.join(".codex", "skills", SKILL_NAME),
  antigravity: path.join(".gemini", "skills", SKILL_NAME),
};

function detectBaseUrl() {
  const args = process.argv.slice(2);
  if (args.includes("--dev")) return DEV_URL;
  const urlIdx = args.indexOf("--url");
  if (urlIdx !== -1 && args[urlIdx + 1]) return args[urlIdx + 1].replace(/\/$/, "");
  return PROD_URL;
}

function parseEnvFile(content) {
  const result = {};
  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [k, ...rest] = trimmed.split("=");
      result[k.trim()] = rest.join("=").trim();
    }
  }
  return result;
}

function writeEnvFile(envPath, values) {
  const lines = Object.entries(values).map(([k, v]) => `${k}=${v}`);
  fs.writeFileSync(envPath, Buffer.from(lines.join("\n") + "\n", "utf-8"));
}

function extractApiKeyFromEnv(envPath) {
  if (!fs.existsSync(envPath)) return null;
  const parsed = parseEnvFile(fs.readFileSync(envPath, "utf-8"));
  return parsed["RULEWAY_API_KEY"] || null;
}

function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) result[key.trim()] = rest.join(":").trim();
  }
  return result;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`  Created directory: ${dir}`);
  }
}

function copyFile(src, dest) {
  try {
    let buf = fs.readFileSync(src);
    if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
      buf = buf.slice(3);
    }
    fs.writeFileSync(dest, buf);
  } catch (e) {
    console.error(`\n✗ Failed to write file: ${e.message}`);
    process.exit(1);
  }
}

function installSkillFiles(skillDir, apiKey, baseUrl) {
  ensureDir(skillDir);
  ensureDir(path.join(skillDir, "scripts"));

  writeEnvFile(path.join(skillDir, ".env"), {
    RULEWAY_API_KEY: apiKey,
    RULEWAY_BASE_URL: baseUrl,
  });

  copyFile(path.join(__dirname, "SKILL.md"), path.join(skillDir, "SKILL.md"));
  copyFile(path.join(__dirname, "reference.md"), path.join(skillDir, "reference.md"));
  copyFile(
    path.join(__dirname, "scripts", "query.py"),
    path.join(skillDir, "scripts", "query.py")
  );
}

function ensureGitignoreEntry(projectRoot) {
  const gitignorePath = path.join(projectRoot, ".gitignore");
  const entry = ".cursor/skills/vietnamese-legal/.env";
  if (fs.existsSync(gitignorePath)) {
    const content = fs.readFileSync(gitignorePath, "utf-8");
    if (!content.includes(entry)) {
      fs.appendFileSync(gitignorePath, `\n# Ruleway skill API key\n${entry}\n`, "utf-8");
      console.log(`  Added .env to ${gitignorePath}`);
    }
  }
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

function getArgValue(flag) {
  const args = process.argv.slice(2);
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
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

async function main() {
  const baseUrl = detectBaseUrl();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log(`\nRuleway Vietnamese Legal Skill Installer v${PKG.version}`);
  if (baseUrl !== PROD_URL) console.log(`  ⚠ Dev mode: ${baseUrl}`);
  console.log("─".repeat(60));

  const TOOLS      = ["Cursor", "Claude", "Codex", "Antigravity", "Other (print SKILL.md to terminal)"];
  const toolKeys   = ["cursor", "claude", "codex", "antigravity", "other"];

  const toolArg = getArgValue("--tool");
  let toolIdx;
  if (toolArg && toolKeys.includes(toolArg.toLowerCase())) {
    toolIdx = toolKeys.indexOf(toolArg.toLowerCase());
  } else {
    toolIdx = await selectFromList(rl, "Which AI tool would you like to install to?", TOOLS);
  }
  const toolKey = toolKeys[toolIdx];

  if (toolKey === "other") {
    await promptApiKey(rl);
    rl.close();
    console.log("\n── SKILL.md content ─────────────────────────────────────────────────────────\n");
    console.log(fs.readFileSync(path.join(__dirname, "SKILL.md"), "utf-8"));
    console.log("\n─────────────────────────────────────────────────────────────────────────────\n  Copy the above content into your AI tool's custom instructions / system prompt.");
    return;
  }

  const dirArg = getArgValue("--dir");
  const isGlobal = process.argv.includes("-g") || process.argv.includes("--global");
  const skillDir = dirArg
    ? path.resolve(dirArg)
    : isGlobal
      ? SKILL_DIRS[toolKey]
      : path.resolve(process.cwd(), PROJECT_SKILL_DIRS[toolKey] || path.join(".cursor", "skills", SKILL_NAME));
  const toolDisplayName = TOOLS[toolIdx];
  const envPath = path.join(skillDir, ".env");
  const skillMdPath = path.join(skillDir, "SKILL.md");

  if (fs.existsSync(skillMdPath)) {
    const existingMeta  = parseFrontmatter(fs.readFileSync(skillMdPath, "utf-8"));
    const existingVersion = existingMeta.version || "unknown";
    const latestMeta    = parseFrontmatter(fs.readFileSync(path.join(__dirname, "SKILL.md"), "utf-8"));
    const latestVersion = latestMeta.version || PKG.version;

    console.log(`\nAlready installed for ${toolDisplayName} (v${existingVersion}).`);

    const autoYes = process.argv.includes("--yes") || process.argv.includes("-y");
    let doUpdate = false;
    if (existingVersion !== latestVersion) {
      console.log(`\nUpdate available: v${existingVersion} → v${latestVersion}`);
      if (autoYes) {
        doUpdate = true;
      } else {
        const answer = await ask(rl, "Update skill files? (your API key will be preserved) [Y/n]:");
        doUpdate = answer.trim().toLowerCase() !== "n";
      }
    }

    const existingKey = extractApiKeyFromEnv(envPath) || "";
    const keyArg = getArgValue("--key");
    let newKey;
    if (keyArg) {
      newKey = keyArg;
    } else {
      const input = await ask(rl, "Enter new API key (press Enter to keep current):");
      newKey = input.trim() || existingKey;
    }

    if (newKey && newKey !== "{{API_KEY}}" && !newKey.startsWith("rwmcp_")) {
      console.log("Invalid API key. It must start with 'rwmcp_'.");
      rl.close();
      process.exit(1);
    }

    rl.close();

    if (doUpdate) {
      installSkillFiles(skillDir, newKey || existingKey, baseUrl);
      console.log(`\n✓ Updated to v${latestVersion}\n  Path: ${skillDir}`);
    } else if (newKey && newKey !== existingKey) {
      const existing = fs.existsSync(envPath)
        ? parseEnvFile(fs.readFileSync(envPath, "utf-8"))
        : {};
      existing["RULEWAY_API_KEY"] = newKey;
      writeEnvFile(envPath, existing);
      console.log("\n✓ API key updated.");
    } else {
      console.log("\nNo changes made.");
    }

    return;
  }

  const apiKey = await promptApiKey(rl);
  rl.close();

  console.log("\nInstalling...");
  installSkillFiles(skillDir, apiKey, baseUrl);
  ensureGitignoreEntry(process.cwd());

  const meta = parseFrontmatter(fs.readFileSync(path.join(__dirname, "SKILL.md"), "utf-8"));
  const version = meta.version || PKG.version;
  console.log(`\n✓ Skill installed successfully! (v${version})\n  Path: ${skillDir}\n  Restart your AI tool to activate the skill.`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
