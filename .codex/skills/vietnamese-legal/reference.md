# Ruleway API Reference — Full Parameter Details

All tools: `POST https://mcp.ruleway.ai/<path>` with `x-api-key` header.  
Response shape: `{ "data": <payload>, "_credits_remaining": <number>, "_notice"?: <string> }` on success, `{ "error": "..." }` on failure.

- `_notice`: optional operational message from Ruleway (e.g. reference site maintenance). When present, the calling model must show it at the end of the user-facing answer (see SKILL.md RULE 5). Not a separate API tool.

---

## 1. `find_regulation_by_code` → `query.py code`

```bash
query.py code --regulation_code "09/2024/NĐ-CP"
```

**Body:**
```json
{ "regulation_code": "09/2024/NĐ-CP" }
```

**Returns:** `SharedDocument[]` — full `cleantext`, `source_url`, `source_file_path`, `related_decrees`, dates, multilingual names.  
Empty array `[]` = not found (no server fallback).

**Note:** Optional disambiguation params (`regulation_year`, `regulation_number`, `regulation_level_id`) exist but are rarely needed — pass only `regulation_code` for normal flows.

---

## 2. `find_regulations_referencing_code` → `query.py ref`

```bash
query.py ref --regulation_code "09/2024/NĐ-CP" [--limit 20]
```

**Body:**
```json
{ "regulation_code": "09/2024/NĐ-CP", "limit": 20 }
```

- `limit`: optional, default **20**, max **50**

**Returns:** `SharedDocument[]` with `cleantext`, sorted by `effective_date` desc.

---

## 3. `find_related_regulations` → `query.py related`

```bash
query.py related --regulation_code "09/2024/NĐ-CP" [--limit 20]
```

**Body:**
```json
{ "regulation_code": "09/2024/NĐ-CP", "limit": 20 }
```

**Returns:** `FindRelatedRegulationsResult` (metadata only — no `cleantext`):
```json
{
  "source_regulation_code": "09/2024/NĐ-CP",
  "related_count": 15,
  "items": [
    {
      "regulation_id": 123,
      "regulation_code": "168/2024/NĐ-CP",
      "regulation_name_vi": "...",
      "regulation_level": { "level_name_kr": "시행령", "level_name_en": "Decree", "level_name_vi": "Nghị định" },
      "governor": "Chính phủ",
      "governor_master": { "governor_name_ko": "정부", "governor_name_en": "Government" },
      "source_url": "https://...",
      "source_file_path": "https://...",
      "effective_date": "2024-07-01",
      "notice_date": "2024-06-15",
      "expiry_date": null
    }
  ]
}
```

> `related_count` = total in `related_decrees`. `items.length` ≤ `related_count`.

---

## 4. `get_master_codes` → `query.py master`

```bash
query.py master
```

**Body:** `{}`

**Returns:**
```json
{
  "regulation_levels": [
    { "id": 1, "level_name_kr": "헌법", "level_name_en": "Constitution", "level_name_vi": "Hiến pháp", "sort_order": 1 }
  ],
  "governors": [
    { "governor_id": 41, "governor_name_vi": "Chính phủ", "governor_name_ko": "정부", "governor_name_en": "Government" }
  ]
}
```

> Use `regulation_levels[n].id` as `--regulation_level_id`. Use `governors[n].governor_id` (not `id`) as `--governor_id`.

---

## 5. `get_field_of_law_codes` → `query.py fields`

```bash
query.py fields
```

**Body:** `{}`

**Returns:** `{ "total": N, "items": [ { "code", "kr", "en", "aliases_kr", "aliases_en", "doc_count" }, ... ] }`

Match user input to the closest `code` via `kr`, `en`, `aliases_kr`, `aliases_en`.  
Multi-sector: pass array to `--field_of_law` in `query.py list`.

---

## 6. `list_regulations` → `query.py list`

```bash
query.py list \
  --mode recent_effective \
  [--regulation_status_type CURRENT] \
  [--field_of_law "Lao động-Tiền lương"] \
  [--regulation_level_id 3] \
  [--governor_id 5] \
  [--limit 20] \
  [--effective_date_from 2024-01-01] \
  [--effective_date_to 2024-12-31] \
  [--notice_date_from 2024-01-01] \
  [--notice_date_to 2024-12-31] \
  [--expiry_date_from 2024-01-01] \
  [--expiry_date_to 2024-12-31]
```

**`--mode` values (required):**

| Value | Meaning |
|-------|---------|
| `recent_effective` | Sort by effective date |
| `recent_notice` | Sort by promulgation date |
| `recent_updated` | Sort by last update |
| `expiring_soon` | Soon to expire |

- `--limit`: optional default **20**, max **50**
- Returns metadata only (`is_used=true` rows only) — no `cleantext`

**Each row fields:** `regulation_code`, `regulation_name_vi`, `regulation_level_vi`, `governor_vi`, `description`, `regulation_status_type`, `effective_date`, `notice_date`, `expiry_date`, `source_url`, `source_file_path`

---

## 7. `search_regulations` → `query.py search`

```bash
query.py search \
  --query_vi "Bộ Luật Lao Động" \
  [--regulation_status_type CURRENT] \
  [--regulation_level_id 1] \
  [--limit 20]
```

**Note:** ILIKE on Vietnamese title only. Not for sector+time queries. No `cleantext` in results.  
On 0 results, `retry_hint` is returned — retry with Vietnamese synonyms up to 3 times, then use `query.py fields` + `query.py list`.

**Returns:**
```json
{
  "query_vi": "...",
  "total_returned": 5,
  "items": [ { "regulation_code": "45/2019/QH14", "regulation_name_vi": "...", ... } ],
  "retry_hint": "..."
}
```

> `retry_hint` only present when `total_returned === 0`.

---

## 8. `search_regulation_chunks_by_vector` → `query.py chunks`

```bash
query.py chunks \
  --query "chấm dứt hợp đồng lao động" \
  [--content "optional must-contain keyword"] \
  [--top_k 10] \
  [--regulation_status_type CURRENT] \
  [--regulation_level_id 3] \
  [--governor_id 5] \
  [--regulation_code "45/2019/QH14"] \
  [--article_number "15"] \
  [--effective_date_from 2024-01-01] \
  [--effective_date_to 2024-12-31] \
  [--notice_date_from 2024-01-01] \
  [--notice_date_to 2024-12-31] \
  [--expiry_date_from 2024-01-01] \
  [--expiry_date_to 2024-12-31]
```

**Query rules:**
- `--query` must be **Vietnamese legal keywords** — strip location noise (`Việt Nam`, `베트남`, `tại Việt Nam`, …)
- For a specific article: pass `--regulation_code` **and** `--article_number` together
- `--article_number` = digits only (`"15"` not `"Điều 15"`)
- `--top_k`: max 20, default 5 (REST), default 10 (MCP)

**Returns chunk fields:** `chunk_id`, `regulation_id`, `regulation_code`, `source_url`, `source_file_path`, `article_number`, `chunk_title`, `snippet`, `similarity_score`

**Inline citation priority:**
1. `source_url` present → `[regulation_code — Điều article](source_url)` + show `source_file_path`
2. No `source_url` → plain `regulation_code` + Điều
3. Missing code → fall back to `chunk_title`
