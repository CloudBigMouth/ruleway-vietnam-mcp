# 🇻🇳 RuleWay — Vietnamese Law MCP Server

**Language:** [한국어](README.md) | English | [日本語](README.ja.md) | [Tiếng Việt](README.vi.md)

---

> An MCP server that gives your AI assistant direct access to the Vietnamese legal database.  
> Connect Claude, Cursor, Gemini CLI, ChatGPT Desktop and ask questions about Vietnamese law in natural language.

![RuleWay MCP Hero](https://raw.githubusercontent.com/CloudBigMouth/ruleway-vietnam-mcp/main/hero-en.png)

🌐 **Service:** [ruleway.ai/en/mcp](https://ruleway.ai/en/mcp)  
🔑 **Get API Key:** [Dashboard →](https://ruleway.ai/en/mcp/dashboard)  
🏠 **Homepage:** [ruleway.ai](https://ruleway.ai)

**65,000+ Vietnam Laws · Real-time Updates · Ask in Any Language**

---

## Why MCP / Skill?

ChatGPT, Gemini, and Claude are powerful AI tools — but for Vietnamese legal work, one critical piece is missing: a direct connection to a real law database.

| | Generic AI | With RuleWay MCP / Skill |
|---|---|---|
| **Hallucination** | Frequently invents law numbers and confidently states wrong provisions | Only delivers laws and text retrieved from the real database — zero hallucination |
| **Latest amendments** | Newly enacted or amended laws are invisible until the model is retrained | Queries the live law database directly — latest amendments reflected instantly |
| **Source verification** | No way to verify whether cited sources actually exist | Every cited law is immediately verifiable in the source document |
| **Vietnam coverage** | Sparse Vietnam-specific legal data leads to frequent guesswork | 65,000+ dedicated Vietnam law database for accurate, grounded answers |

---

## Who Is This For?

- **Anyone working with Vietnam** — contract review, visa regulations, tax queries, etc. Ask your AI in everyday language, no legal expertise needed.
- **Companies planning to enter Vietnam** — quickly identify investment, labor, and taxation regulations before expansion.
- **Legal & compliance teams** at foreign companies operating in Vietnam — instantly check the latest regulatory changes and amendment histories.
- **Researchers at law firms and accounting firms** — reduce work time by quickly finding law numbers and provision grounds.
- **HR, tax, and contract specialists** — check labor laws, tax laws, and contract regulations directly within your task's context.

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Semantic AI Legal Search** | Ask in natural language — no regulation code needed. Finds the most relevant articles using vector similarity. Unlike simple keyword matching, far more efficient and economical. |
| **Instant Regulation Lookup** | Retrieve full text, effective date, and validity status by regulation code |
| **Amendment & Replacement Tracking** | Automatically trace how a regulation has changed over time and which regulation replaced it |
| **Filter by Period / Authority** | Filter regulation lists by date range, ministry, or status (Current / Repealed / Scheduled) |
| **Multilingual Queries** | Ask in Korean, English, Japanese, Vietnamese — AI handles any language |
| **Real-time Data** | Continuously updated based on the official Vietnam government legal portal (phapluat.gov.vn) |

### Supported Document Types

Covers all legal document types in Vietnam's legislative hierarchy:

`Constitution` · `Code / Codex` · `Law` · `Ordinance` · `Order` · `Resolution` · `Joint Resolution` · `Decree` · `Decision` · `Circular` · `Joint Circular` · `Consolidated Text`

---

## Available Tools (8)

| Tool | Description |
|------|-------------|
| ⭐ `search_regulation_chunks_by_vector` | Semantic similarity search over regulation article chunks (core feature). Finds the closest legal clauses to your query using embeddings — not keyword matching. |
| `find_regulation_by_code` | Retrieve full text and metadata by regulation code |
| `search_regulations` | Partial-match search by Vietnamese regulation title keyword |
| `find_regulations_referencing_code` | Find regulations that cite, amend, or replace a given code |
| `find_related_regulations` | Bulk lookup of related regulations via the `related_decrees` field |
| `list_regulations` | Browse regulations by date, sector, authority, or status |
| `get_field_of_law_codes` | Get all field-of-law codes (63 fields, multilingual labels) |
| `get_master_codes` | Get regulation level and issuing authority codes |

> **Tip:** High-reasoning modes (Claude Extended Thinking, ChatGPT o1/o3, Gemini Deep Research) may call multiple tools per query for deeper accuracy.

---

## Quick Setup (Recommended)

> 🔑 **Get your API key first:** Sign up at [ruleway.ai/en/mcp](https://ruleway.ai/en/mcp) and issue a free key from the [Dashboard](https://ruleway.ai/en/mcp/dashboard).

The fastest way to configure MCP for your AI tool — no manual JSON editing:

```bash
npx vietnamese-legal-mcp
```

The CLI will ask for your API key and AI tool, then automatically write the config.

```bash
# Non-interactive
npx vietnamese-legal-mcp --key rwmcp_YOUR_KEY --tool cursor

# Dev server
npx vietnamese-legal-mcp --dev
```

**Supported tools:** Cursor · Claude Desktop · Windsurf · Codex · Antigravity · Gemini CLI

---

## How to Connect (Manual)

### Step 1: Sign Up & Get an API Key

1. Sign up at [ruleway.ai/en/mcp](https://ruleway.ai/en/mcp)
2. Go to [Dashboard](https://ruleway.ai/en/mcp/dashboard) → Issue an API key

---

### Claude.ai Web

Go to **Settings → Integrations → Add MCP Server** and enter:

```
https://mcp.ruleway.ai/sse?api_key=YOUR_API_KEY
```

> ⚠️ The URL contains your API key. Do not share or publicly post it. Rotate your key regularly.

---

### Desktop & CLI (Claude Desktop · Cursor · Gemini CLI · Windsurf · Antigravity)

> **Prerequisite:** Install [Node.js](https://nodejs.org/) (required to run `npx`)

Paste the JSON below into your config file and replace `YOUR_API_KEY`.

**Mac / Linux:**
```json
{
  "mcpServers": {
    "vietnamese-legal": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://mcp.ruleway.ai/sse",
        "--header", "x-api-key:YOUR_API_KEY"
      ]
    }
  }
}
```

**Windows:**
```json
{
  "mcpServers": {
    "vietnamese-legal": {
      "command": "cmd",
      "args": [
        "/c", "npx", "-y", "mcp-remote",
        "https://mcp.ruleway.ai/sse",
        "--header", "x-api-key:YOUR_API_KEY"
      ]
    }
  }
}
```

**Config file locations:**

| Tool | Config file |
|------|-------------|
| Cursor (global) | `~/.cursor/mcp.json` |
| Cursor (project) | `.cursor/mcp.json` |
| Claude Desktop (Mac) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Win) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Gemini CLI | `~/.gemini/settings.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Antigravity | `~/.gemini/antigravity/mcp_config.json` |

Restart the app after saving to apply the changes.

---

### Agent Skill Package

Prefer the agent skill format over MCP? Use `vietnamese-legal-skill` instead.  
It provides the same 8 legal search tools — choose whichever approach suits your workflow.

```bash
npx vietnamese-legal-skill
```

**Supported tools and install paths**

| AI Tool | Install Path |
|---------|-------------|
| Cursor | `~/.cursor/skills/vietnamese-legal/` |
| Claude (Desktop) | `~/.claude/skills/vietnamese-legal/` |
| Codex | `~/.agents/skills/vietnamese-legal/` |
| Antigravity | `~/.gemini/antigravity/skills/vietnamese-legal/` |

Non-interactive install with flags:

```bash
npx vietnamese-legal-skill --tool cursor --key rwmcp_your_key_here
```

---

### GPTs (ChatGPT Actions)

Register the OpenAPI spec URL in GPT Actions:

```
https://mcp.ruleway.ai/openapi.yaml
```

Authentication: **API Key** → Header name: `X-API-Key`

---

## Usage Examples

```
🇰🇷 KR Legal Team
Q: Are there foreign ownership limits when establishing a Vietnam subsidiary?
A: Dieu 22 of Law 67/2014/QH13 — sector-specific foreign investment limits...
   Source: [67/2014/QH13](https://phapluat.gov.vn/...)
```

```
🇯🇵 JP HR Manager
Q: How many days of annual leave are in the Vietnam Labor Law?
A: Article 113 of the Labor Code — 12 days minimum for 1 year of service, 14 days for hazardous work...
```

```
🇺🇸 US Compliance
Q: Is Circular 22/2025/TT-NHNN currently in effect?
A: Yes. Circular 22/2025/TT-NHNN issued by the State Bank of Vietnam is currently in effect as of...
```

```
🇯🇵 JP Manufacturer
Q: 環境影響評価の手続きはどこに規定されていますか？
A: 第18条 — 環境影響評価の手続きについては Nghị định 08/2022/NĐ-CP に規定されており...
```

```
🇬🇧 UK Law Firm
Q: Which decree governs corporate income tax for foreign companies?
A: The primary regulation is Circular 78/2014/TT-BTC and its amendments. Key articles: Article 10 (tax base)...
```

---

## Frequently Asked Questions

**Q: Do I need to know Vietnamese to use this?**  
A: No. AI automatically handles questions in any language — Korean, English, Japanese, Vietnamese, etc.

**Q: Which AI tools can I connect to?**  
A: Via MCP: ChatGPT, Google Gemini, Claude, Cursor, Windsurf, Antigravity, Gemini CLI.  
Via Skill package: Cursor, Codex, Antigravity, and any agent supporting custom skills.

**Q: How up-to-date is the legal data?**  
A: Continuously updated based on the official Vietnam government legal portal ([phapluat.gov.vn](https://phapluat.gov.vn)). Latest amendments are reflected in real time.

**Q: Can I verify the cited sources?**  
A: Yes. Every answer includes the original law code and a link to the source document on phapluat.gov.vn.

**Q: Are AI search results the same as legal advice?**  
A: No. Results are for reference only and do not replace advice from qualified legal professionals. For important legal matters, always consult a lawyer.

---

## Business Proposal

RuleWay is looking for collaboration with legal institutions, law firms, and legal tech partners to expand **Legal Vertical AI** capabilities.

- **Domain data & expertise** — Integrate case law, contracts, and real-world workflow data with AI to improve Legal AI quality
- **MCP·Skill co-design & validation** — Co-design Legal AI features and run pilots together
- **Co-GTM, white-labeling, API integration** — We can discuss various collaboration models flexibly

We welcome proposals from legal institutions and firms. 📧 [Send Proposal](https://forms.gle/hDXonrupAWTSNAN28)

> When submitting, please select "Proposal" as the inquiry type.

---

## Enterprise

Need deeper integration? → **[Enterprise Inquiry](https://ruleway.ai/en/intro/enterprise)**

- **Enterprise Deployment** — On-premise / private network local LLM, SSO & departmental access control, internal policy AI search, custom reports & automated workflows
- **REST API Service** — Direct access to the Vietnam legal database via REST API, semantic vector search, multilingual Q&A engine integration

📧 [Contact us](https://forms.gle/hDXonrupAWTSNAN28)

---

## Security Notice

- API keys may be embedded in URLs. Do not share or publicly post URLs containing your key.
- We recommend rotating your key regularly from the [Dashboard](https://ruleway.ai/en/mcp/dashboard).
- RuleWay is not responsible for credit losses or damages caused by key exposure.

---

## Contact

📧 [Contact us](https://forms.gle/hDXonrupAWTSNAN28)  
🌐 [ruleway.ai](https://ruleway.ai)
