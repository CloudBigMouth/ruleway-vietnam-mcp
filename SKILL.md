---
name: vietnamese-legal
version: 2.0.1
description: Search Vietnamese legal regulations, decrees, circulars, and law articles using Ruleway REST API. Use when the user asks about Vietnamese law, legal regulations, compliance requirements, or specific decrees and circulars.
---

# Vietnamese Legal Research Skill

**Base URL:** stored in `.env` as `RULEWAY_BASE_URL` (default: `https://mcp.ruleway.ai`)  
**API Key:** stored in `.env` as `RULEWAY_API_KEY` (set by installer — never hardcode)

**REST response envelope:** `{ "data": <payload>, "_credits_remaining": N, "_notice"?: string }`  
Use `data` as the tool result. If `_notice` is present, show it at the end of your final answer (RULE 5).

> Required packages: none (Python 3 standard library only)

---

## What this service does (and does not)

- Fetches **read-only** facts from Vietnamese law metadata and article-level vector chunks.
- **Does not** supply final legal conclusions or client-specific compliance verdicts — the calling model must reason and explain in the user's language.

---

## Critical rules

### CR-1 — regulation_code must be used verbatim
Values returned by any tool **must be passed as-is** to subsequent calls.  
**Never convert Vietnamese characters to ASCII** (`Đ` ≠ `D`, `ộ` ≠ `o`, etc.).  
Wrong: `"145/2020/ND-CP"` → Right: `"145/2020/NĐ-CP"`

### CR-2 — Empty result means "not found" — no pre-trained knowledge fallback
If a tool returns `[]` or `total_returned: 0`, report it to the user.  
**Do not substitute regulation codes or legal facts from pre-trained knowledge.**

### CR-3 — `query` is for vector DB only — separate from reasoning context
When calling `search_regulation_chunks_by_vector`, the `query` parameter is sent to the vector database for similarity matching only — NOT for your reasoning.

Split like this:
- **Reasoning context (keep in your head):** user language, question intent, company type, country of origin, time period
- **`query` (send to API):** Vietnamese legal concept keywords only, distilled from intent

STRIP from `query`: country/location noise words (Việt Nam, Vietnam, 베트남, 현지, tại Việt Nam, trong nước) — all documents are already Vietnamese law; these words hurt search quality.
STRIP from `query`: question words, negations, company names, personal context.
KEEP in `query`: legal nouns, article subjects, regulatory concepts.

Examples:
```bash
# User: "베트남에서 한국 기업 법인 설립 시 최소 자본금은?"
python $SCRIPT chunks --query "vốn điều lệ tối thiểu thành lập doanh nghiệp nước ngoài"
# NOT: --query "베트남 한국기업 최소자본금"

# User: "노동계약 해지 시 퇴직금 지급 기준"
python $SCRIPT chunks --query "trợ cấp thôi việc chấm dứt hợp đồng lao động" --content "trợ cấp thôi việc"
# content = must-contain 2nd-pass keyword filter
```

### CR-4 — Use `scripts/query.py` for all HTTP calls
Never use `Invoke-RestMethod`, `Invoke-WebRequest`, or inline `node -e` for API calls.  
Always use the pre-built script — it handles UTF-8, `.env` key loading, and error reporting:
```bash
python .cursor/skills/vietnamese-legal/scripts/query.py <command> [options]
```
> **PowerShell (Windows):** `&` is reserved — use `;` to chain commands, never `&`.  
> Correct: `python query.py chunks ... ; python query.py list ...`

Full parameter reference: [reference.md](reference.md)

### CR-5 — Read `reference.md` before every API call
**Before calling any `query.py` command**, open and read the matching section in `reference.md`.  
Each command has its own parameter set — never guess, never reuse parameters from a different command.

---

## When to use this skill

- User asks about Vietnamese laws, decrees, circulars, or regulations
- User gives an official **regulation code** or needs status / text
- User wants **topic + time** (latest, amended, expiring…) or sector-based lists
- User needs **article-level** evidence or "what does the law say about X?"

---

## Tool selection

| Situation | Tool | Script command |
|-----------|------|----------------|
| User gives a **regulation code** | `find_regulation_by_code` | `query.py code --regulation_code "..."` |
| What **amended / cited** a code | `find_regulations_referencing_code` | `query.py ref --regulation_code "..."` |
| **Structurally related** laws | `find_related_regulations` | `query.py related --regulation_code "..."` |
| User names **level** or **issuing body** | `get_master_codes` → `list_regulations` | `query.py master` |
| User names a **sector** (with or without time intent) | `get_field_of_law_codes` → `list_regulations` | `query.py fields` then `query.py list` |
| Browse by **dates / status only** | `list_regulations` directly | `query.py list --mode recent_effective` |
| Find by **official title** only | `search_regulations` | `query.py search --query_vi "..."` |
| **Meaning / article** search | `search_regulation_chunks_by_vector` | `query.py chunks --query "..."` |
| One regulation's **specific article** | chunks + code + article | `query.py chunks --query "..." --regulation_code "..." --article_number "15"` |
| **Must-contain keyword** filter | chunks + content | `query.py chunks --query "..." --content "keyword"` |

---

## `regulation_status_type` values

| Value | Meaning |
|-------|---------|
| `CURRENT` | In force (default) |
| `PLAN` | Not yet effective |
| `PAST` | Expired / repealed |

---

## User intent → `mode` mapping (for `list` command)

`--mode` is **required** for `query.py list`.

| User says | `--mode` value |
|-----------|---------------|
| 최신 / latest / mới nhất | `recent_effective` |
| 새로 공포 / newly promulgated / mới ban hành | `recent_notice` |
| 개정 / amended / sửa đổi | `recent_updated` |
| 만료 임박 / expiring | `expiring_soon` |
| **Default when no time intent** | `recent_effective` |

---

## Execution — `scripts/query.py`

> API key and base URL auto-loaded from `.env` in skill root directory.

```bash
SCRIPT=.cursor/skills/ruleway-legal/scripts/query.py

# Semantic article search (most common)
python $SCRIPT chunks --query "mức đóng bảo hiểm" --top_k 5
python $SCRIPT chunks --query "mức đóng" --regulation_code "41/2024/QH15" --article_number "34"
python $SCRIPT chunks --query "chấm dứt hợp đồng" --content "trợ cấp thôi việc"

# Full text by regulation code
python $SCRIPT code --regulation_code "41/2024/QH15"

# List by sector
python $SCRIPT fields
python $SCRIPT list --mode recent_effective --field_of_law "Lao động-Tiền lương"

# Search by Vietnamese title
python $SCRIPT search --query_vi "Bộ Luật Lao Động"

# Referencing / related
python $SCRIPT ref --regulation_code "41/2024/QH15"
python $SCRIPT related --regulation_code "41/2024/QH15"

# Lookup IDs for filters
python $SCRIPT master
```

Full parameter list for each command: [reference.md](reference.md)

---

## Internal IDs (never ask the end user)

- `regulation_level_id`, `governor_id`: integers from `query.py master`
- `field_of_law`: Vietnamese string from `query.py fields` (`code` field); multi-sector = array
- Reuse IDs from prior results when chaining calls.

---

## `related_decrees` recursion

Each entry: `{ "docGUId", "docName", "fieldName", "docIdentity" }`.  
`docIdentity` = regulation code → run `query.py code --regulation_code "<docIdentity>"` for full text.

---

## Citation rules (mandatory)

> **NON-NEGOTIABLE. Omitting source links or article numbers is a citation violation.**

### RULE 1 — Article number mandatory for article-level answers
Every bullet stating a legal rule **must** begin with `**Dieu N**` (e.g. `**Dieu 34**`, `**Dieu 15 khoan 2**`).  
Source: `article_number` from chunks output, or parse `Điều N` markers from `cleantext`.

### RULE 2 — Source block mandatory per regulation
End each regulation's section with exactly once:
```
Source: [regulation_code](source_url)  [regulation_code pdf file](source_file_path)
```
Never omit, reconstruct, or shorten `source_url` / `source_file_path` — use exact API values.

### RULE 3 — List results: source links per row
```
**[regulation_code](source_url)** — name (translated) | governor | effective_date  [pdf file](source_file_path)
```

### RULE 4 — Credits
If `_credits_remaining` is in the API response, end your answer with: `_(Credits remaining: N)_` (use the minimum across all calls in the session). Place this **before** any system notice (RULE 5).

### RULE 5 — System notice (`_notice`)
When the API response includes `_notice`, append it at the **absolute end** of your final answer (after credits). Use a clearly separated block (e.g. horizontal rule, then the notice text). You may translate `_notice` into the user's language, but keep dates, URLs, and maintenance windows exactly as written. This is operational status (e.g. source site maintenance) — not a substitute for legal sources in RULE 2.

---

## Recommended workflows

1. **Known code:** `query.py code` → optional `query.py chunks` for article focus
2. **Sector only:** `query.py fields` → `query.py list --mode recent_effective --field_of_law <code>`
3. **Sector + time:** `query.py fields` → `query.py list --mode <from intent> --field_of_law <code>`
4. **Title only:** `query.py search` → `query.py code` on chosen result
5. **Topic / article:** `query.py chunks` → `query.py code` for full law
6. **Graph:** `query.py code` → `query.py related` / `query.py ref` → recurse via `query.py code`

---

## Notes

- Vietnamese is the language of `cleantext` and titles; translate for the user.
- `query.py search` requires `--query_vi` in Vietnamese (not Korean/English).
- `article_number` must be numeric string and **must** pair with `regulation_code`.
- `query.py search` results do not include `cleantext` — use `query.py code` for full text.
