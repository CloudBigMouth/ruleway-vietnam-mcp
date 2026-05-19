# 🇻🇳 RuleWay — Máy chủ MCP Luật Việt Nam

**Ngôn ngữ:** [한국어](README.md) | [English](README.en.md) | [日本語](README.ja.md) | Tiếng Việt

---

> Máy chủ MCP cho phép trợ lý AI của bạn truy cập trực tiếp vào cơ sở dữ liệu pháp luật Việt Nam.  
> Kết nối Claude, Cursor, Gemini CLI, ChatGPT Desktop và hỏi về luật Việt Nam bằng ngôn ngữ tự nhiên.

![RuleWay MCP Hero](https://raw.githubusercontent.com/CloudBigMouth/ruleway-vietnam-mcp/main/hero-vi.png)

🌐 **Dịch vụ:** [ruleway.ai/vi/mcp](https://ruleway.ai/vi/mcp)  
🔑 **Lấy API Key:** [Dashboard →](https://ruleway.ai/vi/mcp/dashboard)  
🏠 **Trang chủ:** [ruleway.ai](https://ruleway.ai)

**65.000+ Văn bản pháp luật Việt Nam · Cập nhật thời gian thực · Hỏi bằng bất kỳ ngôn ngữ nào**

---

## Tại sao cần MCP / Skill?

ChatGPT, Gemini, Claude là những công cụ AI mạnh mẽ — nhưng với công việc pháp lý Việt Nam, có một điều còn thiếu: kết nối trực tiếp với cơ sở dữ liệu pháp luật thực tế.

| | AI thông thường | Với RuleWay MCP / Skill |
|---|---|---|
| **Ảo giác (Hallucination)** | Bịa đặt số hiệu văn bản và tự tin trả lời sai điều khoản | Chỉ cung cấp nội dung pháp luật lấy từ DB thực — không ảo giác |
| **Cập nhật sửa đổi** | Văn bản mới ban hành hoặc sửa đổi không hiển thị cho đến khi mô hình được đào tạo lại | Truy vấn trực tiếp DB pháp luật thời gian thực — phản ánh sửa đổi mới nhất ngay lập tức |
| **Xác minh nguồn** | Không thể xác minh liệu các nguồn được trích dẫn có thực sự tồn tại không | Mọi văn bản được trích dẫn đều có thể xác minh ngay trong tài liệu nguồn |
| **Độ phủ pháp luật Việt Nam** | Dữ liệu đặc thù Việt Nam thiếu dẫn đến câu trả lời mang tính đoán mò | Cơ sở dữ liệu 65.000+ văn bản pháp luật Việt Nam chuyên dụng cho câu trả lời chính xác |

---

## Đối tượng sử dụng

- **Tất cả những người làm việc liên quan đến Việt Nam** — Kiểm tra hợp đồng, quy định visa, tư vấn thuế, v.v. Hỏi AI bằng ngôn ngữ hàng ngày, không cần chuyên môn pháp lý.
- **Doanh nghiệp chuẩn bị thâm nhập thị trường Việt Nam** — Nhanh chóng xác định các quy định về đầu tư, lao động và thuế trước khi mở rộng.
- **Nhóm pháp lý & tuân thủ tại doanh nghiệp nước ngoài hoạt động tại Việt Nam** — Kiểm tra ngay các thay đổi quy định mới nhất và lịch sử sửa đổi.
- **Nhân viên nghiên cứu tại văn phòng luật và kế toán** — Tiết kiệm thời gian bằng cách nhanh chóng tìm số hiệu văn bản và căn cứ điều khoản.
- **Chuyên gia HR, thuế và hợp đồng** — Kiểm tra luật lao động, thuế và quy định hợp đồng ngay trong bối cảnh công việc.

---

## Tính năng chính

| Tính năng | Mô tả |
|-----------|--------|
| **Tìm kiếm pháp luật AI theo ngữ nghĩa** | Hỏi bằng ngôn ngữ tự nhiên — không cần số hiệu văn bản. Tìm các điều khoản liên quan nhất bằng độ tương đồng vector. Chính xác và hiệu quả hơn nhiều so với khớp từ khóa thông thường. |
| **Tra cứu văn bản tức thì** | Lấy toàn văn, ngày hiệu lực và trạng thái hợp lệ theo mã văn bản |
| **Theo dõi sửa đổi & thay thế** | Tự động truy vết văn bản đã thay đổi như thế nào và văn bản nào đã thay thế nó |
| **Lọc theo thời gian / cơ quan** | Lọc danh sách văn bản theo khoảng thời gian, bộ/ngành hoặc trạng thái (Hiện hành / Hết hiệu lực / Dự kiến) |
| **Truy vấn đa ngôn ngữ** | Hỏi bằng tiếng Hàn, Anh, Nhật, Việt — AI xử lý mọi ngôn ngữ |
| **Dữ liệu thời gian thực** | Liên tục cập nhật dựa trên Cổng thông tin pháp luật chính thức của Chính phủ Việt Nam (phapluat.gov.vn) |

### Các loại văn bản được hỗ trợ

Bao gồm tất cả các loại văn bản pháp luật trong hệ thống lập pháp Việt Nam:

`Hiến pháp` · `Bộ luật` · `Luật` · `Pháp lệnh` · `Lệnh` · `Nghị quyết` · `Nghị quyết liên tịch` · `Nghị định` · `Quyết định` · `Thông tư` · `Thông tư liên tịch` · `Văn bản hợp nhất`

---

## Các công cụ có sẵn (8 công cụ)

| Công cụ | Mô tả |
|---------|--------|
| ⭐ `search_regulation_chunks_by_vector` | Tìm kiếm theo độ tương đồng ngữ nghĩa trên các đoạn điều khoản văn bản (tính năng cốt lõi). Tìm các điều khoản gần nhất với câu hỏi của bạn bằng embeddings — không phải khớp từ khóa. |
| `find_regulation_by_code` | Lấy toàn văn và siêu dữ liệu theo mã văn bản |
| `search_regulations` | Tìm kiếm khớp một phần theo từ khóa tên văn bản tiếng Việt |
| `find_regulations_referencing_code` | Tìm các văn bản trích dẫn, sửa đổi hoặc thay thế một mã nhất định |
| `find_related_regulations` | Tra cứu hàng loạt các văn bản liên quan qua trường `related_decrees` |
| `list_regulations` | Duyệt văn bản theo ngày, lĩnh vực, cơ quan hoặc trạng thái |
| `get_field_of_law_codes` | Lấy tất cả mã lĩnh vực pháp luật (63 lĩnh vực, nhãn đa ngôn ngữ) |
| `get_master_codes` | Lấy mã cấp độ văn bản và cơ quan ban hành |

> **Lưu ý:** Các chế độ suy luận cao cấp (Claude Extended Thinking, ChatGPT o1/o3, Gemini Deep Research) có thể gọi nhiều công cụ lặp lại để đạt độ chính xác cao hơn.

---

## Cài đặt nhanh (Khuyến nghị)

> 🔑 **Lấy API key trước:** Đăng ký tại [ruleway.ai/vi/mcp](https://ruleway.ai/vi/mcp) và cấp key miễn phí từ [Dashboard](https://ruleway.ai/vi/mcp/dashboard).

Công cụ CLI tự động cấu hình — không cần chỉnh sửa JSON thủ công:

```bash
npx vietnamese-legal-mcp
```

Chỉ cần nhập API key và AI tool, file cấu hình sẽ tự động được tạo.

```bash
# Cài đặt không tương tác
npx vietnamese-legal-mcp --key rwmcp_YOUR_KEY --tool cursor

# Kết nối máy chủ phát triển
npx vietnamese-legal-mcp --dev
```

**Công cụ được hỗ trợ:** Cursor · Claude Desktop · Windsurf · Codex · Antigravity · Gemini CLI

---

## Cách kết nối (Cấu hình thủ công)

### Bước 1: Đăng ký và lấy API Key

1. Đăng ký tại [ruleway.ai/vi/mcp](https://ruleway.ai/vi/mcp)
2. Vào [Dashboard](https://ruleway.ai/vi/mcp/dashboard) → Phát hành API key

---

### Claude.ai Web

Vào **Settings → Integrations → Add MCP Server** và nhập:

```
https://mcp.ruleway.ai/sse?api_key=YOUR_API_KEY
```

> ⚠️ URL chứa API key của bạn. Không chia sẻ hoặc đăng URL này công khai. Nên thường xuyên tái phát hành key.

---

### Desktop & CLI (Claude Desktop · Cursor · Gemini CLI · Windsurf · Antigravity)

> **Yêu cầu:** Cài đặt [Node.js](https://nodejs.org/) (cần để chạy `npx`)

Dán JSON bên dưới vào file cấu hình và thay `YOUR_API_KEY` bằng key thực của bạn.

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

**Vị trí file cấu hình:**

| Công cụ | File cấu hình |
|---------|--------------|
| Cursor (toàn cục) | `~/.cursor/mcp.json` |
| Cursor (dự án) | `.cursor/mcp.json` |
| Claude Desktop (Mac) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Win) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Gemini CLI | `~/.gemini/settings.json` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Antigravity | `~/.gemini/antigravity/mcp_config.json` |

Khởi động lại ứng dụng sau khi lưu để áp dụng thay đổi.

---

### Gói Agent Skill

Nếu bạn thích định dạng Agent Skill thay vì MCP, hãy dùng `vietnamese-legal-skill`.  
Cung cấp 8 công cụ tìm kiếm pháp luật giống hệt — hãy chọn tùy theo sở thích của bạn.

```bash
npx vietnamese-legal-skill
```

**Công cụ AI được hỗ trợ và đường dẫn cài đặt**

| Công cụ AI | Đường dẫn cài đặt |
|-----------|------------------|
| Cursor | `~/.cursor/skills/vietnamese-legal/` |
| Claude (Desktop) | `~/.claude/skills/vietnamese-legal/` |
| Codex | `~/.agents/skills/vietnamese-legal/` |
| Antigravity | `~/.gemini/antigravity/skills/vietnamese-legal/` |

Cài đặt không tương tác với flags:

```bash
npx vietnamese-legal-skill --tool cursor --key rwmcp_your_key_here
```

---

### GPTs (ChatGPT Actions)

Đăng ký URL spec OpenAPI trong GPT Actions:

```
https://mcp.ruleway.ai/openapi.yaml
```

Xác thực: **API Key** → Header name: `X-API-Key`

---

## Ví dụ sử dụng

```
🇻🇳 Chuyên gia pháp lý
Câu hỏi: Có giới hạn tỷ lệ sở hữu nước ngoài khi thành lập công ty con tại Việt Nam không?
Trả lời: Điều 22 Luật 67/2014/QH13 — Giới hạn đầu tư nước ngoài theo từng ngành...
         Nguồn: [67/2014/QH13](https://phapluat.gov.vn/...)
```

```
🇰🇷 Nhóm pháp lý Hàn Quốc
질문: 베트남 자회사 설립 시 외국인 지분 한도가 있나요?
Trả lời: Điều 22 Luật Đầu tư 67/2014/QH13 — giới hạn theo ngành và các ngoại lệ...
```

```
🇺🇸 US Compliance
Câu hỏi: Is Circular 22/2025/TT-NHNN currently in effect?
Trả lời: Yes. Circular 22/2025/TT-NHNN issued by the State Bank of Vietnam is currently in effect as of...
```

```
🇯🇵 Nhà sản xuất Nhật Bản
質問: 環境影響評価の手続きはどこに規定されていますか？
Trả lời: Điều 18 Nghị định 08/2022/NĐ-CP — Quy định thủ tục đánh giá tác động môi trường...
```

---

## Câu hỏi thường gặp (FAQ)

**Q: Tôi có cần biết tiếng Việt không?**  
A: Không. AI tự động xử lý câu hỏi bằng mọi ngôn ngữ — tiếng Anh, tiếng Hàn, tiếng Nhật, v.v.

**Q: Tôi có thể kết nối với những AI tool nào?**  
A: Qua MCP: ChatGPT, Google Gemini, Claude, Cursor, Windsurf, Antigravity, Gemini CLI  
Qua Skill package: Cursor, Codex, Antigravity và bất kỳ agent nào hỗ trợ custom skills

**Q: Dữ liệu pháp luật được cập nhật đến mức nào?**  
A: Liên tục cập nhật dựa trên Cổng thông tin pháp luật chính thức của Chính phủ Việt Nam ([phapluat.gov.vn](https://phapluat.gov.vn)). Các sửa đổi mới nhất được phản ánh theo thời gian thực.

**Q: Tôi có thể xác minh các nguồn được trích dẫn không?**  
A: Có. Mỗi câu trả lời đều bao gồm mã văn bản gốc và liên kết đến tài liệu nguồn trên phapluat.gov.vn.

**Q: Kết quả tìm kiếm AI có thay thế được tư vấn pháp lý không?**  
A: Không. Kết quả chỉ mang tính tham khảo và không thay thế lời khuyên của chuyên gia pháp lý có trình độ. Đối với các vấn đề pháp lý quan trọng, hãy luôn tham khảo ý kiến luật sư.

---

## Đề xuất hợp tác

RuleWay đang tìm kiếm sự hợp tác với các tổ chức pháp luật, văn phòng luật và đối tác legal tech để mở rộng khả năng **Legal Vertical AI**.

- **Kết hợp dữ liệu domain & chuyên môn** — Tích hợp án lệ, hợp đồng và dữ liệu quy trình thực tiễn với AI để nâng cao chất lượng Legal AI
- **Đồng thiết kế & xác thực MCP·Skill** — Cùng thiết kế tính năng Legal AI và thực hiện thử nghiệm
- **Co-GTM, white-label, tích hợp API** — Có thể thảo luận linh hoạt về nhiều mô hình hợp tác

Chào đón đề xuất từ các tổ chức và công ty pháp luật. 📧 [Gửi đề xuất](https://forms.gle/hDXonrupAWTSNAN28)

> Khi gửi, vui lòng chọn "Đề xuất" làm loại yêu cầu.

---

## Doanh nghiệp

Cần tích hợp sâu hơn? → **[Liên hệ Enterprise](https://ruleway.ai/vi/intro/enterprise)**

- **Triển khai Enterprise** — LLM cục bộ trên mạng riêng/on-premise, SSO & kiểm soát truy cập theo phòng ban, tìm kiếm AI quy định nội bộ, báo cáo tùy chỉnh & quy trình tự động hóa
- **Dịch vụ REST API** — Truy cập trực tiếp vào DB pháp luật Việt Nam qua REST API, tìm kiếm vector ngữ nghĩa, tích hợp engine Q&A đa ngôn ngữ

📧 [Liên hệ chúng tôi](https://forms.gle/hDXonrupAWTSNAN28)

---

## Lưu ý bảo mật

- API key có thể được nhúng trong URL. Không chia sẻ hoặc đăng công khai URL chứa key của bạn.
- Chúng tôi khuyến nghị thường xuyên tái phát hành key từ [Dashboard](https://ruleway.ai/vi/mcp/dashboard).
- RuleWay không chịu trách nhiệm về tổn thất tín dụng hoặc thiệt hại do lộ key.

---

## Liên hệ

📧 [Liên hệ chúng tôi](https://forms.gle/hDXonrupAWTSNAN28)  
🌐 [ruleway.ai](https://ruleway.ai)
