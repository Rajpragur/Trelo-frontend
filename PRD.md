---
title: "Trelo — Trust Middleware for AI Agents"
author: "Raj Pratap Singh Gurjar"
date: "June 2026"
geometry: margin=1in
---

# Product Requirements Document v2.3

## 0. Document Control

| Detail | Value |
|--------|-------|
| **Version** | v2.3 |
| **Author** | Raj Pratap Singh Gurjar |
| **Date** | June 19, 2026 |
| **Status** | Draft |
| **Phase 1 Scope** | Landing page with waitlist, demo embed, GitHub stars counter |

---

## 1. Executive Summary

Trelo is a runtime safety layer that sits between AI agent frameworks and the external world. It combines circuit breaking, semantic dedup, trajectory recovery, agent firewall, model-aware routing, idempotency, audit logging, deterministic testing, and hallucination guard into a single `pip install` proxy.

**Tagline:** Trust Middleware for AI Agents.

**Pricing:** Open-source core, \$29/mo Pro, \$299/mo Team, Custom Enterprise.

**Current phase:** Landing page with waitlist to validate demand before building the full proxy.

---

## 2. Product Architecture — The 9 Layers

### Cross-Cutting Principle: Permission ≠ Budget

Two concerns that drift separately:

| Concern | Question | Enforced By | Drift Pattern |
|---------|----------|-------------|---------------|
| **Permission** | "Can this agent call this tool?" | L5 Agent Firewall — allowlist, SSRF, PII, prompt injection | Rarely changes — set per agent role, stable across runs |
| **Budget** | "Can this agent spend this much on this attempt?" | L6 Cost Enforcement — per-call cost cap, session budget, tier thresholds | Changes per attempt — depends on remaining budget, call complexity, model chosen |

Mixing them leads to brittle policy. A tool might be permitted (allowlisted, no injection risk) but exceed the per-attempt budget. Conversely, an agent might have budget remaining but lack permission for a tool. Trelo checks **permission first** (L5), then **budget** (L6), independently — and surfaces which gate was hit in the audit log.

---

### Architecture Diagram

```
Agent Framework (LangChain, CrewAI, OpenAI SDK, AutoGen, etc.)
  |
  v
+-- TRELO PROXY ---------------------------------------------------+
|                                                                   |
| L1: LLM Call Interceptor   — MD5 hash + Jaccard on args          |
| L2: Circuit Breaker        — CLOSED -> OPEN -> HALF_OPEN states   |
| L3: Trajectory Recovery    — LLM Wiki of recovery patterns        |
| L4: Side-Effect Safety     — PENDING/DISPATCHED/CONFIRMED states  |
| L5: Agent Firewall         — SSRF, PII, prompt injection blocking |
| L6: Cost Enforcement       — 80/95/100% budget thresholds         |
| L7: Audit & Compliance     — JSONL trail, drift detection         |
| L8: Deterministic Testing  — Replay traces in CI/CD              |
| L9: Hallucination Guard    — Canary tokens in context             |
| + Tool Library             — Shared tool schemas, saves ~500t/tool|
+-------------------------------------------------------------------+
  |
  v
Tools, APIs, Databases, External Services
```

### Layer Details (Implementation Notes)

| Layer | Problem It Solves | Key Implementation Detail | Cost Impact |
|-------|------------------|--------------------------|-------------|
| L1: Call Interceptor | Duplicate intents cost double | MD5 hash (tool_name + canonical_args) + Jaccard > 0.9 = BLOCK | Prevents double charges |
| L2: Circuit Breaker | Infinite retry loops burn \$500 overnight | 3 failures/60s -> escalate cheap→smart model -> probe -> reset. All fail -> HARD OPEN -> human notified | 90% reduction on failure costs |
| L3: Trajectory Recovery | Agent gets stuck same way every time | raw/traces/ -> LLM compiles -> wiki/trajectories/. Stagnation triggers wiki read -> hint injection | Faster recovery, less token waste |
| L4: Idempotency | Retrying already-dispatched actions or re-executing after timeout/restart | Stable `operation_id` per expensive external action. Cache first-execution result; return cached on reattempt (covers timeout-after-success, worker restart, browser/tool state mismatch). `request_id = hash(run_id + tool + operation_id)`. State: PENDING → DISPATCHED → CONFIRMED. Never retry from CONFIRMED. | Prevents duplicate payments/emails, silent double-execution on worker restart, duplicate API mutations |
| L5: Agent Firewall | Agent calls internal IPs, leaks secrets | Block 169.254.x.x, 10.x.x.x, 172.16-31.x.x, 192.168.x.x. Regex for API keys/emails/credit cards. 150+ injection signatures | Security — priceless |
| L6: Cost Enforcement | Agents burn through budgets silently | 80% -> auto-downgrade model. 95% -> pause new tasks. 100% -> hard stop (never mid-execution). Per-attempt cost cap independent of tool permissions. | Predictable costs, no surprise bills from a single expensive attempt |
| L7: Audit Trail | No record when things break at 3 AM | JSONL with timestamp + agent_id per decision. SOC2-ready format. Drift detection vs historical baseline | Compliance requirement |
| L8: Deterministic Testing | Can't reproduce agent failures | Replay exact traces from L7. A/B test configs. Inject 503s/timeouts. CI/CD integration | Confidence to deploy |
| L9: Hallucination Guard | Agent hallucinates after 30+ tool calls | Inject canary tokens at context boundaries. Check survival rate periodically. Auto-trigger summarization when integrity drops | Prevents quiet failures |
| Tool Library | Every new session re-defines tool schemas | Agents reference tools by name. Shared schema cache. ~500 tokens saved per tool per session start | 10-20% token savings |

### Model-Aware Circuit Breaking (Secret Weapon)

| State | Model Used | Behavior |
|-------|-----------|----------|
| CLOSED | Cheap (GPT-4o-mini) | Normal operation |
| OPEN recovery | Smart (GPT-4o/Claude Sonnet) | Recovery with full failure context |
| Recovery success | HALF_OPEN with cheap | Probe tool; if OK -> CLOSED |
| Recovery failure | HARD OPEN | Tool broken; human notified |
| HALF_OPEN success | CLOSED with cheap | Normal operation resumes |
| HALF_OPEN failure | OPEN with smart | Try smart again |

**Cost math:** 47 retries without Trelo = \$0.42. With Trelo: 3 cheap failures (\$0.02) + 1 smart recovery (\$0.03) = \$0.05. **90% less.**

---

## 3. Phase 1 — Landing Page Build

### 3.1 Why Landing Page First

Validate demand before investing 2-3 weeks in proxy code. Capture waitlist emails (signal for YC/investors). Show demo video to communicate value. Display GitHub stars as social proof. Build SEO presence early.

### 3.2 Landing Page Sections

| Section | Key Elements |
|---------|-------------|
| **Hero** | Headline: "Trust Middleware for AI Agents". Subheadline: "Stop infinite loops, block duplicate payments, prevent SSRF attacks, slash token waste by 40-70%. `pip install trelo`". Primary CTA: "Join the Waitlist". Secondary: "View on GitHub" with star badge. GitHub stars via shields.io or direct API polled every 60s. Loading state: skeleton shimmer. Error: "Star on GitHub" fallback text. Empty: "0 stars" |
| **Problem/Solution** | Split screen. Left (pain): "Agent retried broken tool 47 times — \$0.94 for nothing", "Refunded same customer twice — different words, same intent", "Called cloud metadata endpoint — nobody noticed". Right (solution): Trelo fixes all three in one import. |
| **Demo** | Embedded video (30-60s) showing side-by-side: Without Trelo (agent spins, costs \$0.94, FAILED) vs With Trelo (circuit breaker kicks in, costs \$0.12, COMPLETED). Loading: skeleton + play button overlay. Error: "Watch on YouTube →" fallback link. |
| **9 Features Grid** | Cards for each layer. Icon + name + one-liner + expandable detail. Circuit Breaker: "Stops infinite retry loops. Saves 90% on failure costs." Semantic Dedup: "Detects duplicate intents even when rephrased." etc. |
| **Waitlist Signup** | Email (required), Name (optional), Use Case dropdown (Individual Dev / Startup / Enterprise / VC / Other). Client-side validation with debounce. Success: checkmark + "You're on the list!" Error: inline message. Duplicate: "Already on the list!" Loading: spinner, fields disabled. |
| **GitHub Section** | "We're Open Source". Big star count (48px) + GitHub link. Loading: skeleton. Error: "Can't reach GitHub. [Check repo →]" Empty: "Fresh repo — be the first?" |
| **Footer** | GitHub, Twitter/X, Email, Docs (placeholder). "Built by Raj Pratap Singh Gurjar" |

### 3.3 Technical Specs

| Requirement | Detail |
|-------------|--------|
| Stack | Static HTML/CSS/JS or HTML + Tailwind CDN |
| Hosting | GitHub Pages, Vercel, or Netlify (free tiers) |
| Domain | trelo.dev or trelo.ai (check availability) |
| Waitlist backend | Formspree (50/mo free) or Web3Forms or Vercel serverless fn |
| GitHub stars | Client-side fetch from api.github.com. Use token for 5000/hr rate limit. Cache in localStorage (5 min TTL). |
| SEO | og:title, og:description, og:image (1200x630), twitter:card, sitemap.xml, robots.txt |
| Performance | Lighthouse 90+ all categories |
| Responsive | 320px, 768px, 1024px, 1440px breakpoints |
| Theme | Dark default, no toggle |

### 3.4 Build Schedule (5 Days)

| Day | What |
|-----|------|
| 1 | HTML structure + nav + hero + GitHub stars API integration |
| 2 | Problem/Solution section + 9 features grid with collapsible |
| 3 | Demo embed (YouTube/Vimeo iframe + fallback) + waitlist form with all states |
| 4 | GitHub activity + footer + mobile responsive pass |
| 5 | SEO meta + deploy to Pages/Vercel + performance audit |

### 3.5 File Structure

```
trelo-landing/
  index.html
  css/styles.css
  js/main.js, github-stars.js, waitlist.js
  assets/logo.svg, favicon.ico, og-image.png, demo-video.mp4
  robots.txt, sitemap.xml
```

---

## 4. Phase 2 — Core Proxy Build (14 Days)

### 4.1 Week 1: Runtime Core

| Day | Component | LOC |
|-----|-----------|-----|
| 1-2 | Monkeypatch interceptor — hook `openai.ChatCompletion.create`, route all tool calls through Trelo | ~80 |
| 3-4 | Circuit breaker — per-tool state machine, 3 failures/60s → escalate model | ~120 |
| 4-5 | Semantic dedup — MD5 hash + Jaccard, cache with TTL | ~40 |
| 5-6 | Cost tracker — per-agent budget, model-level counters, 80/95/100% thresholds | ~60 |
| 6-7 | Audit log — JSONL per session, ISO timestamps | ~30 |

### 4.2 Week 2: Safety + Demo Dashboard

| Day | Component | LOC |
|-----|-----------|-----|
| 8-9 | SSRF guard — block private IPs, loopback, link-local | ~40 |
| 9-10 | PII guard — regex for emails, API keys, AWS keys, credit cards, SSNs | ~50 |
| 10-11 | Demo dashboard — Streamlit/FastAPI, before/after cost comparison, circuit viz | ~150 |
| 12-13 | Demo scripts — broken tool, duplicate intent, SSRF attack, cost burn + record/replay | ~120 |
| 14 | PyPI publish + README + demo video script | ~50 |

**Tech stack:** Python, FastAPI, SQLite, sentence-transformers (all-MiniLM-L6-v2), OpenRouter API.

---

## 5. Demo Scenarios

| Scenario | Without Trelo | With Trelo | Dashboard shows |
|----------|--------------|------------|-----------------|
| Broken tool (500 error) | 47 retries, \$0.94, FAILED | 3 cheap fails + 1 smart recovery, \$0.12, COMPLETED | "Saved \$0.82" — circuit state viz — recovery trajectory diff |
| Duplicate intent ("refund order 123" + "issue refund for customer 123") | Both execute, double refund | Second blocked (Jaccard > 0.9) | "Blocked duplicate: refund order 123" |
| SSRF (agent calls 169.254.169.254) | AWS keys leaked | URL blocked | "SSRF blocked: http://169.254.169.254/" |
| Cost burn during live demo | Contributes to runaway costs | Budget thresholds enforced at 80/95/100% | Live cost vs baseline, tools called vs blocked |

---

## 6. Business Model

| Tier | Price | Includes |
|------|-------|----------|
| Open Source | Free | Core proxy, circuit breaker, basic loop detection, audit logging |
| Pro | \$29/mo | Semantic dedup, trajectory recovery, model-aware routing, dashboard |
| Team | \$299/mo | Agent firewall, cost policies, A/B testing, team dashboard |
| Enterprise | Custom | Compliance reports (SOC2/ISO), SSO, dedicated tenant, SLA, autoscaling |

---

## 7. Go-To-Market

| Phase | Timeline | Actions |
|-------|----------|---------|
| Landing Page | Week 1 | Build page → post on X, HN, r/AI_Agents, LangChain/CrewAI/AutoGen Discords |
| OSS Launch | Month 2 | Publish proxy on PyPI. 10 design partners from waitlist. Free Team in exchange for case studies. |
| Enterprise | Month 4+ | Target 100+ agent companies (fintech, e-commerce, SaaS). Compliance/security budgets \$2-5K/mo. |

**Content play:** "Why your agent burned \$83 last night (and the circuit breaker that fixes it)" — blog post for HN/Reddit.

---

## 8. Key Metrics & OKRs

| Month | GitHub Stars | Waitlist/Paying | Revenue | Agents Protected |
|-------|-------------|-----------------|---------|-----------------|
| 1 | 100 | 200 signups | \$0 | 0 |
| 2-3 | 500 | 100 dev signups, 10 design partners | \$0 | 500 |
| 4-6 | — | 10+ paying teams | \$5K MRR | 5,000 |
| 7-9 | — | Enterprise pipeline | \$15K MRR | — |
| 10-12 | — | 50+ paying teams | \$50K MRR | 50,000+ |

---

## 9. Market Positioning

| Problem | How Trelo Wins |
|---------|---------------|
| Agent loops on broken tool | Circuit breaker: 90% cost reduction on failures |
| Duplicate intents cost double | Semantic dedup: blocks rephrased duplicates |
| Agent discovers internal IPs | SSRF guard: blocks before execution |
| Agent leaks PII | PII guard: redacts in real-time |
| Nobody knows agent costs | Dashboard: per-agent tracking + projections |
| Agent hallucinates after 30 turns | Canary token guard: detects + summarizes |
| Token waste on repeated tool schemas | Shared tool library: -500 tokens/tool/session |

**Competitive wedge:** No single competitor offers all of these in one `pip install`. Competitors solve one piece (observability, memory, testing, monitoring). Trelo is the only active runtime middleware that does all 9.

**Market timing:** 40%+ of agentic AI projects will be cancelled by 2027 (Gartner). 96% of enterprises report costs exceeding expectations. The market is desperate for this.

---

## 10. YC One-Pager

**One sentence:** Trelo is trust middleware for AI agents — a deterministic runtime that stops infinite loops, blocks duplicate payments, prevents security attacks, and slashes token waste by 40-70%. One line of code. `pip install trelo`.

**What you're making:** A lightweight proxy between any agent framework and the world — circuit breakers with model-aware routing, semantic dedup, trajectory recovery, agent firewall, full audit trail. All in one `pip install`.

**Why now:** 96% of enterprises say AI costs exceed expectations. 40%+ of agent projects will be cancelled. 79% deployed agents but only 23% scaled. Every team independently builds guardrails and circuit breakers. Trelo standardizes this.

**What you've built so far:** Landing page (waitlist growing), demo video showing circuit breaker savings, GitHub community building. Python proxy in active development.

**Why you:** Experienced the exact failure modes building AI agents at Uber AI / Google Gemini (NDA). Know the moment a dev realizes their agent looped overnight and drained the budget. Student founder, ship fast.

---

## 11. Changelog

- **v2.3 (June 19, 2026):** Enhanced L4 Idempotency with stable operation IDs and result caching (covers timeout-after-success, worker restart, state mismatch). Added explicit cross-cutting principle: Permission ≠ Budget (L5/L6 separation). Per-attempt cost cap added to L6.
- **v2.2 (June 18, 2026):** Restructured for concision. Kept detailed implementation notes for all 9 layers. Phase 1 landing page scope with full build spec (waitlist, demo, GitHub stars). Phase 2 proxy build plan. Demo scenarios, business model, GTM, OKRs, competitive positioning, YC one-pager. PDF generation via pandoc.
- **v2.1 (June 2026):** Demo-scope PRD. Removed aspirational V2 layers.
- **v1.1 (June 2026):** Added hallucination guard, tool library.
- **v1.0 (May 2026):** Initial 9-layer release.
