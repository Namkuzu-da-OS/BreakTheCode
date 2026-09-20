# Orchestration — who does what

Goal: spend almost no Claude tokens on the build. Claude specs and reviews; Codex builds the code **and generates the art**.

| Role | Model | Packets | Setting |
|---|---|---|---|
| Architect / reviewer | Claude (this session) | wrote the bible + packets; reviews at 04, 05 and 08 | — |
| Builder | Codex | 01, 03, 04, 06, 07 | reasoning **high** |
| Builder, hard packets | Codex | 02 (art), 05 (constellation), 08 | reasoning **xhigh** |
| Research desk | Grok (web access) | R | must cite links |
| Copy pass | Claude Sonnet or Haiku | `cardLines` wording inside 01/04 | output = diff for review |

## Running a packet

```
codex exec -C "C:\Users\Daryll\Documents\projects\BreakTheCode" \
  -s workspace-write \
  -c model_reasoning_effort=high \
  "Follow AGENTS.md. Do packet 01 from docs/redesign/PACKETS.md, and only packet 01."
```

Notes:
- The configured model is `gpt-5.6-sol`. **`gpt-5-codex` is a stale name — don't pass it.** Available: `gpt-5.5`, `gpt-5.6-sol`, `gpt-6-astra`.
- Use `xhigh` for packets 02, 05 and 08.
- `-s workspace-write` lets it write in the repo without disabling the sandbox.
- One packet per run. Review the diff and the NOTES.md entry before launching the next.

## Attaching the mockup

Codex accepts reference images on the command line:

```
codex exec -C "<repo>" -s workspace-write -c model_reasoning_effort=xhigh \
  -i "docs/redesign/reference/MASTER-mockup.png" \
  "Follow AGENTS.md. Do packet 02 from docs/redesign/PACKETS.md, and only packet 02."
```

Always attach it for any packet that touches layout or art.

## Image generation (packet 02)

Codex has a **built-in `image_gen` tool** (system skill `imagegen` at `~/.codex/skills/.system/imagegen/SKILL.md`). Built-in mode needs no `OPENAI_API_KEY`; there is a `scripts/image_gen.py` CLI fallback that does. Generated files land under `~/.codex/generated_images/<session>/` and get copied into the repo.

The rule that matters: **every generation call passes the master mockup as a reference and the shared style preamble from bible §6.** Codex is being asked for a component that belongs inside that world, never a new art direction. Regenerate anything that comes back off-palette or off-light.

## Order

```
01 ──► 02 ──► 03 ──► 04 ──► 05 ──► 06 ──► 07 ──► 08 ──► Claude review ──► merge
 └──► R (Grok, parallel) ───────────────────────────────┘
```

## Push access

Desktop `gh` is DaryllGomas (READ on this repo). Options: (a) add DaryllGomas as a collaborator on Namkuzu-da-OS/BreakTheCode, or (b) push from a machine holding the Namkuzu-da-OS SSH key. Codex commits locally without either.
