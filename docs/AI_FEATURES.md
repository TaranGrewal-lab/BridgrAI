# AI Features Architecture

All AI features are advisory only — they never auto-message vendors or guests, never auto-pay, and always require explicit user "Apply to my wedding" confirmation before writing data.

## Components
- **AI Gateway** (NestJS `AiModule`) wraps the Claude API (`claude-sonnet-4-6` default, configurable). Single `AiService.complete(promptTemplate, variables)` entry point with structured-output (JSON schema) parsing.
- **Prompt Templates** stored in `apps/api/src/ai/prompts/*.ts`, versioned, with Punjabi-wedding domain context (ceremony names, typical vendor categories, cultural sequencing) baked into the system prompt.

## Feature → Endpoint → Behavior

1. **AI Wedding Assistant** (`POST /ai/checklist`, `/ai/budget-recommendation`, `/ai/vendor-recommendation`, `/ai/guest-grouping`)
   - Input: event type / wedding context. Output: structured JSON (checklist items, budget split, vendor category priorities, guest groupings).
2. **AI Budget Planner** — given `totalBudget` and selected event types, returns a % allocation per event (e.g. Anand Karaj 35%, Reception 30%, Mehndi 10%...) calibrated by region/country cost data table (`docs` seed data, editable by Admin).
3. **AI Guest Planner** — clusters guests by `relationship`/`tags`/`side` into suggested per-event invite lists (e.g. suggest excluding distant relatives from Mehndi, including close family in Choora).
4. **AI Vendor Recommender** — ranks vendors already in the directory using `category + city + budget range + style tags + rating`, returns vendor ids only (never injects new/external vendors).

## Guardrails
- Output schema validated server-side (zod) before being returned to client; malformed AI output is rejected and retried once, then falls back to a static rule-based recommendation.
- Rate-limited per wedding (e.g. 50 AI calls/day on Free, unlimited on Premium).
- No PII beyond first names and aggregate counts is sent in vendor-recommendation prompts.
