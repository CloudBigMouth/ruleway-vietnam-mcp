#!/usr/bin/env python3
"""Ruleway Vietnamese Legal API query script.

Usage: python3 scripts/query.py <command> [options]

Commands:
  chunks   search_regulation_chunks_by_vector
  code     find_regulation_by_code
  ref      find_regulations_referencing_code
  related  find_related_regulations
  master   get_master_codes
  fields   get_field_of_law_codes
  list     list_regulations
  search   search_regulations

Required packages: none (Python 3 standard library only)
API key loaded from .env in skill root directory (parent of scripts/).
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.error


# ── Load .env ─────────────────────────────────────────────────────────────────

def load_env():
    skill_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    env_path = os.path.join(skill_root, ".env")
    env = {}
    if not os.path.exists(env_path):
        return env
    with open(env_path, encoding="utf-8-sig") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env


_env = load_env()

API_KEY = os.environ.get("RULEWAY_API_KEY") or _env.get("RULEWAY_API_KEY")
BASE_URL = (
    os.environ.get("RULEWAY_BASE_URL")
    or _env.get("RULEWAY_BASE_URL")
    or "https://mcp.ruleway.ai"
).rstrip("/")

if not API_KEY:
    print(
        "ERROR: RULEWAY_API_KEY not set.\n"
        "Run the installer first: node install.js",
        file=sys.stderr,
    )
    sys.exit(1)


# ── HTTP helper ───────────────────────────────────────────────────────────────

def post(path, body):
    url = f"{BASE_URL}/{path}"
    data = json.dumps(body, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "x-api-key": API_KEY,
            "User-Agent": "ruleway-legal-skill/2.0",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"ERROR: HTTP {e.code} — {body_text}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"ERROR: Connection failed — {e.reason}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON response — {e}", file=sys.stderr)
        sys.exit(1)

    if isinstance(result, dict) and "error" in result:
        print(f"ERROR: API — {result['error']}", file=sys.stderr)
        sys.exit(1)

    return result


def out(result):
    text = json.dumps(result, ensure_ascii=False, indent=2)
    sys.stdout.buffer.write((text + "\n").encode("utf-8"))


# ── Command handlers ──────────────────────────────────────────────────────────

def cmd_chunks(args):
    body = {"query": args.query}
    if args.content is not None:
        body["content"] = args.content
    if args.top_k is not None:
        body["top_k"] = args.top_k
    if args.regulation_status_type is not None:
        body["regulation_status_type"] = args.regulation_status_type
    if args.regulation_level_id is not None:
        body["regulation_level_id"] = args.regulation_level_id
    if args.governor_id is not None:
        body["governor_id"] = args.governor_id
    if args.regulation_code is not None:
        body["regulation_code"] = args.regulation_code
    if args.article_number is not None:
        body["article_number"] = args.article_number
    if args.effective_date_from is not None:
        body["effective_date_from"] = args.effective_date_from
    if args.effective_date_to is not None:
        body["effective_date_to"] = args.effective_date_to
    if args.notice_date_from is not None:
        body["notice_date_from"] = args.notice_date_from
    if args.notice_date_to is not None:
        body["notice_date_to"] = args.notice_date_to
    if args.expiry_date_from is not None:
        body["expiry_date_from"] = args.expiry_date_from
    if args.expiry_date_to is not None:
        body["expiry_date_to"] = args.expiry_date_to
    out(post("search_regulation_chunks_by_vector", body))


def cmd_code(args):
    out(post("find_regulation_by_code", {"regulation_code": args.regulation_code}))


def cmd_ref(args):
    body = {"regulation_code": args.regulation_code}
    if args.limit is not None:
        body["limit"] = args.limit
    out(post("find_regulations_referencing_code", body))


def cmd_related(args):
    body = {"regulation_code": args.regulation_code}
    if args.limit is not None:
        body["limit"] = args.limit
    out(post("find_related_regulations", body))


def cmd_master(_args):
    out(post("get_master_codes", {}))


def cmd_fields(_args):
    out(post("get_field_of_law_codes", {}))


def cmd_list(args):
    body = {"mode": args.mode}
    if args.regulation_status_type is not None:
        body["regulation_status_type"] = args.regulation_status_type
    if args.field_of_law is not None:
        body["field_of_law"] = args.field_of_law
    if args.regulation_level_id is not None:
        body["regulation_level_id"] = args.regulation_level_id
    if args.governor_id is not None:
        body["governor_id"] = args.governor_id
    if args.limit is not None:
        body["limit"] = args.limit
    if args.effective_date_from is not None:
        body["effective_date_from"] = args.effective_date_from
    if args.effective_date_to is not None:
        body["effective_date_to"] = args.effective_date_to
    if args.notice_date_from is not None:
        body["notice_date_from"] = args.notice_date_from
    if args.notice_date_to is not None:
        body["notice_date_to"] = args.notice_date_to
    if args.expiry_date_from is not None:
        body["expiry_date_from"] = args.expiry_date_from
    if args.expiry_date_to is not None:
        body["expiry_date_to"] = args.expiry_date_to
    out(post("list_regulations", body))


def cmd_search(args):
    body = {"query_vi": args.query_vi}
    if args.regulation_status_type is not None:
        body["regulation_status_type"] = args.regulation_status_type
    if args.regulation_level_id is not None:
        body["regulation_level_id"] = args.regulation_level_id
    if args.limit is not None:
        body["limit"] = args.limit
    out(post("search_regulations", body))


# ── Argument parser ───────────────────────────────────────────────────────────

def add_date_args(p):
    p.add_argument("--effective_date_from", metavar="YYYY-MM-DD")
    p.add_argument("--effective_date_to", metavar="YYYY-MM-DD")
    p.add_argument("--notice_date_from", metavar="YYYY-MM-DD")
    p.add_argument("--notice_date_to", metavar="YYYY-MM-DD")
    p.add_argument("--expiry_date_from", metavar="YYYY-MM-DD")
    p.add_argument("--expiry_date_to", metavar="YYYY-MM-DD")


def add_filter_args(p):
    p.add_argument("--regulation_status_type", choices=["CURRENT", "PLAN", "PAST"],
                   default="CURRENT")
    p.add_argument("--regulation_level_id", type=int, metavar="ID")
    p.add_argument("--governor_id", type=int, metavar="ID")


def main():
    parser = argparse.ArgumentParser(
        description="Ruleway Vietnamese Legal API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Full parameter reference: reference.md in skill root directory.",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    # chunks
    p = sub.add_parser("chunks", help="search_regulation_chunks_by_vector")
    p.add_argument("--query", required=True, help="Vietnamese legal keywords")
    p.add_argument("--content", help="Optional must-contain keyword in chunk")
    p.add_argument("--top_k", type=int, metavar="N", help="Max results (default 5, max 20)")
    p.add_argument("--regulation_code", metavar="CODE")
    p.add_argument("--article_number", metavar="N", help="Digits only, e.g. '15'")
    add_filter_args(p)
    add_date_args(p)

    # code
    p = sub.add_parser("code", help="find_regulation_by_code")
    p.add_argument("--regulation_code", required=True, metavar="CODE")

    # ref
    p = sub.add_parser("ref", help="find_regulations_referencing_code")
    p.add_argument("--regulation_code", required=True, metavar="CODE")
    p.add_argument("--limit", type=int, metavar="N", help="Default 20, max 50")

    # related
    p = sub.add_parser("related", help="find_related_regulations")
    p.add_argument("--regulation_code", required=True, metavar="CODE")
    p.add_argument("--limit", type=int, metavar="N")

    # master
    sub.add_parser("master", help="get_master_codes — lookup regulation_level_id and governor_id")

    # fields
    sub.add_parser("fields", help="get_field_of_law_codes — lookup field_of_law codes")

    # list
    p = sub.add_parser("list", help="list_regulations")
    p.add_argument("--mode", required=True,
                   choices=["recent_effective", "recent_notice", "recent_updated", "expiring_soon"])
    p.add_argument("--field_of_law", metavar="CODE",
                   help="Vietnamese field code from query.py fields")
    p.add_argument("--limit", type=int, metavar="N", help="Default 20, max 50")
    add_filter_args(p)
    add_date_args(p)

    # search
    p = sub.add_parser("search", help="search_regulations — search by Vietnamese title")
    p.add_argument("--query_vi", required=True, help="Vietnamese title keyword")
    p.add_argument("--regulation_status_type", choices=["CURRENT", "PLAN", "PAST"],
                   default="CURRENT")
    p.add_argument("--regulation_level_id", type=int, metavar="ID")
    p.add_argument("--limit", type=int, metavar="N", help="Default 20, max 50")

    args = parser.parse_args()

    dispatch = {
        "chunks": cmd_chunks,
        "code": cmd_code,
        "ref": cmd_ref,
        "related": cmd_related,
        "master": cmd_master,
        "fields": cmd_fields,
        "list": cmd_list,
        "search": cmd_search,
    }
    dispatch[args.command](args)


if __name__ == "__main__":
    main()
