# Orchestration — who does what

Goal: spend almost no Claude Opus/Fable tokens on the build. Claude designed it; cheaper and separately-metered models build it.

| Role | Model | Packets | Setting |
|---|---|---|---|
| Architect / final review | Claude (this session) | wrote bible + packets; reviews the PR at packet 08 | — |
| Builder | OpenAI Codex (gpt-5-codex) | 01, 03, 04, 05, 07 | reasoning **high** |
| Builder, hard packets | Codex | 02 (Court map), 06 (Observatory), 08 | reasoning **xhigh** |
| Research desk | Grok (web access) | R | default; must cite links |
| Copy pass | Claude Sonnet or Haiku | the prose tightening inside 03 | low cost; output = diff for review |
| QA pass between packets | Claude Haiku | run acceptance checks, report pass/fail | cheapest available |

## How to run a packet with Codex
From `Documents/projects/BreakTheCode` on branch `redesign/temple`:

```
codex --model gpt-5-codex -c model_reasoning_effort=high "Follow AGENTS.md. Do packet 02 from docs/redesign/PACKETS.md."
```
(Use `xhigh` for 02, 06, 08.) One packet per run. Review the diff and NOTES.md entry before launching the next.

## How to run the research desk with Grok
Give Grok `docs/redesign/PACKETS.md` §R, `docs/redesign/00-DESIGN-BIBLE.md` §5, and the two JSON files. Ask for the report first, JSON edits second. Merge by hand or via a Codex run: "Apply RESEARCH-REPORT.md verdicts to data/texts.json and data/glyphs.json, nothing else."

## Order
```
01 ──► 02 ──► 03 ──► 04 ──► 05 ──► 06 ──► 07 ──► 08 ──► Claude review ──► merge
 └──► R (Grok, parallel) ───────────────────────────────┘
```

## Push access
Desktop `gh` is DaryllGomas (READ on this repo). Options: (a) add DaryllGomas as a collaborator on Namkuzu-da-OS/BreakTheCode, or (b) push from a machine holding the Namkuzu-da-OS SSH key. Codex can commit locally without either.
