# 🇻🇳 RuleWay — ベトナム法令 MCPサーバー

**言語:** [한국어](README.md) | [English](README.en.md) | 日本語 | [Tiếng Việt](README.vi.md)

---

> AIアシスタントがベトナム法令データベースに直接アクセスできるMCPサーバーです。  
> Claude、Cursor、Gemini CLI、ChatGPT Desktopなどに接続して、ベトナム法令を自然言語で照会できます。

![RuleWay MCP ヒーロー](https://raw.githubusercontent.com/CloudBigMouth/ruleway-vietnam-mcp/main/hero-ja.png)

🌐 **サービス:** [ruleway.ai/ja/mcp](https://ruleway.ai/ja/mcp)  
🔑 **APIキー発行:** [ダッシュボード →](https://ruleway.ai/ja/mcp/dashboard)  
🏠 **ホームページ:** [ruleway.ai](https://ruleway.ai)

**65,000以上のベトナム法令 · リアルタイム更新 · あらゆる言語で質問可能**

---

## なぜMCP / Skillなのか？

ChatGPT、Gemini、Claudeは強力なAIツールです。しかしベトナム法律業務には決定的な欠陥があります。実際の法令データベースへの直接接続がないという点です。

| | 一般的なAI | RuleWay MCP / Skill 使用時 |
|---|---|---|
| **ハルシネーション** | 法令番号を作り出し、誤った条文を自信を持って回答 | 実際のDBから取得した法令テキストのみ提供 — ハルシネーションなし |
| **最新の改正反映** | モデルの再学習まで新たに制定・改正された法令は見えない | リアルタイムの法令DBに直接クエリ — 最新の改正を即座に反映 |
| **出典の確認** | 引用した出典が実際に存在するか確認不可 | すべての引用法令を原文で即座に確認可能 |
| **ベトナム法令カバレッジ** | ベトナム特化データが不足し、推測的な回答が頻発 | 65,000以上のベトナム法令専用DBで正確な根拠を提供 |

---

## こんな方に必要です

- **ベトナム関連業務を行うすべての方** — 契約書審査、ビザ規定、税務相談など、日常言語でAIに質問できます。法律の専門家でなくても大丈夫です。
- **ベトナム進出を準備する企業** — 進出前に投資・労働・税務関連規定を迅速に把握できます。
- **外資系企業の法務・コンプライアンス担当者** — ベトナム法令の最新変更事項と改正履歴を即座に確認できます。
- **法律事務所・会計事務所のリサーチ担当者** — 法令番号と条文根拠を素早く見つけ、業務時間を短縮できます。
- **HR・税務・契約担当者** — 業務コンテキスト内で労働法・税法・契約規定を直接確認できます。

---

## 主な機能

| 機能 | 説明 |
|------|------|
| **セマンティックAI法令検索** | 法令番号なしで自然言語で質問すると、ベクトル類似度で重要な条文を探します。単純なキーワードマッチングより大幅に正確で効率的です。 |
| **法令の即時照会** | 法令コードで全文・施行日・有効性を即座に確認します |
| **改正・代替法令の追跡** | 特定の法令がその後どのように変わったか、どの法令が代替したかを自動で逆追跡します |
| **期間・機関別の絞り込み** | 期間、省庁、ステータス（現行・廃止・予定）で法令リストをフィルタリングします |
| **多言語クエリ** | 韓国語・英語・日本語・ベトナム語など、どの言語で質問してもAIが処理します |
| **リアルタイムデータ** | ベトナム政府公式法令ポータル(phapluat.gov.vn)を基準に継続的に更新されます |

### 対応文書タイプ

ベトナムの立法体系のすべての法令文書タイプをカバーします:

`憲法` · `法典/コデックス` · `法律` · `法令(Pháp lệnh)` · `命令` · `決議` · `共同決議` · `政令(Nghị định)` · `決定(Quyết định)` · `通達(Thông tư)` · `共同通達` · `統合テキスト`

---

## 利用可能なツール（8種類）

| ツール名 | 説明 |
|---------|------|
| ⭐ `search_regulation_chunks_by_vector` | 法令本文の条文チャンクをエンベディングベースの類似度で検索（コア機能）。キーワードマッチングではなく意味的類似度検索。 |
| `find_regulation_by_code` | 法令コードで全文およびメタデータを即座に照会 |
| `search_regulations` | ベトナム語法令名のキーワードで部分一致検索 |
| `find_regulations_referencing_code` | 特定の法令を引用・改正・代替した法令の逆追跡 |
| `find_related_regulations` | `related_decrees`フィールドによる関連法令の一括照会 |
| `list_regulations` | 日付・分野・機関・ステータス条件で法令リストを閲覧 |
| `get_field_of_law_codes` | 法分野コードリストの照会（63分野、多言語表示） |
| `get_master_codes` | 法令体系レベルおよび発令機関コードの照会 |

> **注意:** Claude Extended Thinking、ChatGPT o1/o3、Gemini Deep Researchなどの高度な推論モードは、精度向上のために複数のツールを繰り返し呼び出す場合があります。

---

## クイックセットアップ（推奨）

> 🔑 **まずAPIキーを取得してください:** [ruleway.ai/ja/mcp](https://ruleway.ai/ja/mcp) でサインアップし、[ダッシュボード](https://ruleway.ai/ja/mcp/dashboard)から無料で発行できます。

JSONを直接編集せずに設定できるCLIインストールツール:

```bash
npx vietnamese-legal-mcp
```

APIキーとAIツールを入力するだけで、設定ファイルが自動的に作成されます。

```bash
# 非対話式インストール
npx vietnamese-legal-mcp --key rwmcp_YOUR_KEY --tool cursor

# 開発サーバーに接続
npx vietnamese-legal-mcp --dev
```

**対応ツール:** Cursor · Claude Desktop · Windsurf · Codex · Antigravity · Gemini CLI

---

## 接続方法（手動設定）

### ステップ1: 会員登録とAPIキーの発行

1. [ruleway.ai/ja/mcp](https://ruleway.ai/ja/mcp) で会員登録
2. [ダッシュボード](https://ruleway.ai/ja/mcp/dashboard) → APIキーを発行

---

### Claude.ai Web

**Settings → Integrations → Add MCP Server** に以下のURLを入力:

```
https://mcp.ruleway.ai/sse?api_key=YOUR_API_KEY
```

> ⚠️ URLにAPIキーが含まれます。他の人と共有したり公開したりしないでください。定期的にキーを再発行することをお勧めします。

---

### デスクトップ & CLI（Claude Desktop · Cursor · Gemini CLI · Windsurf · Antigravity）

> **事前準備:** [Node.js](https://nodejs.org/)のインストールが必要（npx実行のため）

設定ファイルに以下のJSONを貼り付けて`YOUR_API_KEY`を実際のキーに置き換えてください。

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

**設定ファイルの場所:**

| ツール | 設定ファイル |
|--------|------------|
| Cursor（グローバル） | `~/.cursor/mcp.json` |
| Cursor（プロジェクト） | `.cursor/mcp.json` |
| Claude Desktop（Mac） | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop（Win） | `%APPDATA%\Claude\claude_desktop_config.json` |
| Gemini CLI | `~/.gemini/settings.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Antigravity | `~/.gemini/antigravity/mcp_config.json` |

保存後、アプリを再起動すると変更が適用されます。

---

### Agent Skillパッケージ

MCPよりAgent Skill形式を好む場合は `vietnamese-legal-skill` をご利用ください。  
同じ8つの法令検索ツールを提供しており、好みに合わせて選択できます。

```bash
npx vietnamese-legal-skill
```

**対応AIツールとインストールパス**

| AIツール | インストールパス |
|---------|----------------|
| Cursor | `~/.cursor/skills/vietnamese-legal/` |
| Claude (Desktop) | `~/.claude/skills/vietnamese-legal/` |
| Codex | `~/.agents/skills/vietnamese-legal/` |
| Antigravity | `~/.gemini/antigravity/skills/vietnamese-legal/` |

フラグを使った非対話型インストール:

```bash
npx vietnamese-legal-skill --tool cursor --key rwmcp_your_key_here
```

---

### GPTs（ChatGPT Actions）

GPT ActionsにOpenAPI仕様URLを登録してください:

```
https://mcp.ruleway.ai/openapi.yaml
```

認証: **API Key** → Header name: `X-API-Key`

---

## 使用例

```
🇯🇵 JP HRマネージャー
質問: ベトナム労働法の年次有給休暇は何日ですか？
回答: 労働法典第113条 — 勤続1年で最低12日、危険有害業務は14日...
```

```
🇰🇷 KR 法務チーム
질문: 베트남 자회사 설립 시 외국인 지분 한도가 있나요?
回答: 法律67/2014/QH13第22条 — 業種別外国人投資上限...
      出典: [67/2014/QH13](https://phapluat.gov.vn/...)
```

```
🇺🇸 US Compliance
質問: Is Circular 22/2025/TT-NHNN currently in effect?
回答: Yes. Circular 22/2025/TT-NHNN issued by the State Bank of Vietnam is currently in effect...
```

```
🇯🇵 JP 製造業
質問: 環境影響評価の手続きはどこに規定されていますか？
回答: Nghị định 08/2022/NĐ-CP第18条 — 環境影響評価の手続きについては...
```

---

## よくある質問（FAQ）

**Q: ベトナム語がわからなくても使えますか？**  
A: はい。AIが日本語・韓国語・英語など、どの言語でも自動的に処理します。

**Q: どのAIツールに接続できますか？**  
A: MCP方式: ChatGPT、Google Gemini、Claude、Cursor、Windsurf、Antigravity、Gemini CLI  
Skillパッケージ: Cursor、Codex、AntigravityなどカスタムスキルをサポートするAIエージェント

**Q: 法令データはどれほど最新ですか？**  
A: ベトナム政府公式法令ポータル([phapluat.gov.vn](https://phapluat.gov.vn))を基準に継続的に更新されます。最新の改正がリアルタイムで反映されます。

**Q: 引用された出典を直接確認できますか？**  
A: はい。すべての回答に元の法令コードとphapluat.gov.vnへのリンクが含まれます。

**Q: AI検索結果は法律専門家のアドバイスの代わりになりますか？**  
A: なりません。結果は参考用であり、法律専門家のアドバイスを代替するものではありません。重要な法律問題は必ず弁護士にご相談ください。

---

## ビジネス提案

RuleWayは**Legal垂直AI**機能拡張のため、法律専門機関・法律事務所・リーガルテックパートナーとの協業を求めています。

- **ドメインデータ・専門知識の組み合わせ** — 判例・契約・実務ワークフローデータをAIと統合し、Legal AI品質を高めます
- **MCP·Skill共同設計・検証** — Legal AI機能を共に設計し、パイロットを実施します
- **共同GTM・ホワイトラベル・API連携** — 様々な協業モデルを柔軟に議論できます

法律専門機関・企業からのご提案をお待ちしています。 📧 [提案する](https://forms.gle/hDXonrupAWTSNAN28)

> 送信時に問い合わせ種別で「提案」を選択してください。

---

## エンタープライズ

より深い統合が必要ですか？ → **[エンタープライズお問い合わせ](https://ruleway.ai/ja/intro/enterprise)**

- **エンタープライズデプロイメント** — オンプレミス/プライベートネットワークローカルLLM、SSO・部署別アクセス制御、社内規定AI検索、カスタムレポート・自動化ワークフロー
- **REST APIサービス** — ベトナム法令DBにREST APIで直接アクセス、セマンティックベクトル検索、多言語Q&Aエンジン統合

📧 [お問い合わせ](https://forms.gle/hDXonrupAWTSNAN28)

---

## セキュリティに関するご注意

- APIキーはURLに含まれる場合があります。URLを他の人と共有したり公開したりしないでください。
- [ダッシュボード](https://ruleway.ai/ja/mcp/dashboard)でキーを定期的に再発行することをお勧めします。
- キーの露出による損害についてRuleWayは責任を負いません。

---

## お問い合わせ

📧 [お問い合わせ](https://forms.gle/hDXonrupAWTSNAN28)  
🌐 [ruleway.ai](https://ruleway.ai)
