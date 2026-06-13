---
title: "Trelo — Trust Middleware for AI Agents"
author: "Raj Pratap Singh Gurjar"
date: "May 2026"
geometry: margin=1in
---

# Product Requirements Document v1.0

## 1. Executive Summary

Trelo is a deterministic runtime safety and security layer that sits between AI agent frameworks (LangChain, CrewAI, OpenAI SDK, AutoGen) and the external world (tools, APIs, databases, payments). It combines nine layers of protection — circuit breaking, semantic deduplication, trajectory recovery, agent firewall, model-aware routing, idempotency, audit logging, deterministic testing, and hallucination guard — plus a shared tool library for token efficiency — into a single `pip install` proxy.

**Tagline:** Trust Middleware for AI Agents.

**Mental Model for VCs:** Cloudflare + Vanta for AI agents.

**Target Price:** Open-source core, $29/mo Pro, $299/mo Team, Custom Enterprise.

---

## 2. Market Research — What YC Is Funding

### 2.1 YC Summer 2026 Requests for Startups

Y Combinator's Summer 2026 RFS explicitly signals that agent infrastructure is a priority. Key relevant themes:

- **AI Companies That Replace Services, Not Improve Them:** YC partner Gustaf Alstromer specifically wants startups that sell the outcome, not the tool. Insurance brokerage, accounting, compliance, healthcare administration. Every one of these requires agents that execute reliably — which is exactly what Trelo enables.

- **Company Brain:** Tom Blomfield wants a system that extracts, structures, and maintains institutional knowledge so AI agents can execute reliably. Trelo's trajectory recovery layer (LLM Wiki pattern) directly enables this — it builds a living knowledge base of successful recovery patterns.

- **Service Replacement Thesis:** "The total spend on services is many times larger than the spend on software." YC believes the next wave of generational companies will be AI-native services. Trelo is the infrastructure layer that makes those services safe enough to deploy.

### 2.2 YC Batch Data (W26, S25, P26)

- 80-85% of YC S25 startups are B2B/enterprise-focused
- ~60% of YC 2026 batches are AI companies (up from 40% in 2024)
- Nearly 50% of recent YC batches are AI agent companies
- 80% of enterprises expected to implement AI agents by end of 2026

### 2.3 Related YC Companies Worth Watching

| Company | What They Build | YC Batch | Relevance to Trelo |
|---------|----------------|----------|-------------------|
| Chronicle Labs | Staging environment for enterprise AI agents (replay production traces) | P26 | Adjacent — they test agents before deploy; Trelo protects agents during runtime |
| Agentic Fabriq | Identity and governance layer for AI agents ("Okta for Agents") | P26 | Adjacent — identity/access is a different layer than Trelo's safety/execution layer |
| GodHands | Deterministic computer use layer for reliable browser/desktop ops | F26 | Complementary — they handle deterministic execution; Trelo handles safety around it |
| Hessian | Platform for automating business operations with AI agents | P26 | Potential customer — they need Trelo's safety guarantees |
| Prox | Ticket resolution agents for logistics companies | F26 | Potential customer — they need circuit breakers + cost optimization |

### 2.4 Competitor Landscape

| Competitor | What They Do | Trelo's Advantage |
|------------|-------------|------------------|
| Langfuse / Helicone | LLM observability, tracing, cost dashboards | Passive (show fire after it burns). Trelo is active — stops issues before they happen. |
| Guardrails AI | Output validation (PII, format, structure) | Shallow syntax validation. Trelo validates intent, not just format. |
| Mem0 / Letta | Agent memory & statefulness | Memory only. No execution boundaries or duplicate blocking. |
| Noma Security (YC, $132M) | Agentic AI security platform | CISO-focused, heavy platform. Trelo is lightweight middleware for developers. |
| Sycamore ($65M) | Enterprise agent orchestration | Too broad. Trelo is a thin trust layer that plugs into any orchestration. |
| Vijil ($23M) | Agent reliability & security testing | Pre-deployment only. Trelo provides continuous runtime enforcement. |
| AuraGuard (OSS) | Circuit breaker + exactly-once for tool calls | Narrow scope. No semantic intent, trajectory recovery, or model-aware routing. |
| Capsule Security ($7M) | Agent behavior monitoring & security | Monitoring only. Trelo actively blocks, recovers, and routes. |
| Galileo / Arize AI | Hallucination monitoring & scoring on LLM outputs | Post-hoc scoring only. Trelo detects hallucination *during* execution via canary tokens and auto-triggers recovery. |

### 2.5 Market Size

- AI Agents Market: $7.63B (2025) → $182.97B (2033), CAGR 49.6%
- Agentic AI Security Market: $1.65B (2026) → $13.52B (2032), CAGR 42%
- 96% of enterprises report AI costs higher than expected
- 40%+ of agentic AI projects will be cancelled by 2027 (Gartner)
- 74% of orgs lack a real AI agent governance strategy

**Key Insight:** There is no single competitor that offers all of circuit breaking + semantic deduplication + trajectory recovery + model-aware routing + agent firewall + hallucination guard + audit trail in one thin middleware. This is Trelo's wedge.

---

## 3. Problem Statement

### 3.1 The Pain

Every team deploying AI agents independently discovers the same hard truths:

1. **Infinite Loops:** Agents retry failing tools endlessly, burning API budgets overnight. A standard agent retrying auth 47 times burns $0.42+ on nothing.

2. **Duplicate Actions:** An agent asked to "refund order 123" might also "issue $50 back to the customer" — same intent, different phrasing. Double charge. Double email. Angry customer.

3. **Runaway Costs:** Cheap models (GPT-4o-mini) fail more often on complex tool calls. Smart models (GPT-4o) cost 20x more. Teams guess which to use and overpay either way.

4. **Security Vulnerabilities:** Agents hallucinate and call internal IPs (169.254.169.254 — AWS metadata), leak PII to external APIs, or follow prompt injection instructions.

5. **No Recovery From Failure:** When an agent gets stuck, it either retries forever or gives up. No mechanism to learn from past failures and auto-recover.

6. **Zero Audit Trail:** When something goes wrong at 3 AM, there's no record of what the agent did, why it did it, or how to reproduce the issue.

7. **Hallucinations in Long-Running Sessions:** With every turn, context windows fill up. After ~20-30 tool calls, agents start conflating details, inventing facts, or ignoring instructions — a known failure mode with no runtime guard.

8. **Token Waste on Tool Repetition:** Every new session or agent re-defines tool schemas from scratch, burning hundreds of context tokens on descriptions the proxy already knows.

### 3.2 The Hallucination Problem in Detail

When an agent's context window is overstuffed — long conversations, large documents, many tool results — LLMs hallucinate. They conflate details, invent facts, or drop instructions. This is a well-documented failure mode (Lost-in-the-Middle, Attention Sinks), but **nobody has a runtime guard for it yet.**

Trelo's canary token technique solves this:
1. Injects a tiny, unique, meaningless token (e.g. `CANARY::a7f3b2`) into the system prompt at session start
2. If the agent's response ever contains the canary string → the model is regurgitating internal markers → hallucination risk
3. Periodically tests: ask the agent to recall its canaries. If early ones are missing → context is overstuffed → triggers auto-summarization or truncation
4. Multiple canaries at different context depths estimate how much of the window is actually attended to

This is a novel, defensible feature. No competitor in the agent infra space is doing runtime hallucination detection via canary tokens.

### 3.3 Market Validation

- 79% of enterprises have deployed AI agents (IDC/DataRobot)
- Only 23% are scaling to production — infrastructure bottlenecks prevent it
- 94% of developers would switch vendors for better agent infrastructure (Nylas)
- Every YC agent company we interviewed independently discovered they need circuit breakers, deduplication, and guardrails

---

## 4. Product Architecture

### 4.1 Trelo Proxy — System Design

```
Agent Framework (LangChain, CrewAI, OpenAI SDK, AutoGen, etc.)
     |
     v
+---------------------------------------------------------------+
|                    TRELO PROXY LAYER                          |
+---------------------------------------------------------------+
| L1: LLM Call Interceptor -- intercepts every LLM-to-tool call|
|     - MD5 hash of (tool_name + canonical_args)               |
|     - Jaccard similarity on stringified arguments            |
|     - Detects duplicate intent across rephrased requests     |
|     - Decision: ALLOW / BLOCK / QUEUE                        |
+---------------------------------------------------------------+
| L2: Circuit Breaker -- state machine for tool health          |
|     States: CLOSED -> OPEN_RECOVERY -> HALF_OPEN -> CLOSED   |
|     3 failures/60s -> escalate to stronger model             |
|     Strong model fixes -> probe with cheap -> circuit resets |
|     All fails -> HARD OPEN -> human notified                 |
+---------------------------------------------------------------+
| L3: Trajectory Recovery -- LLM Wiki pattern                   |
|     raw/traces/ -> LLM compiles -> wiki/trajectories/        |
|     Stagnation detected -> read relevant wiki -> inject hint |
|     KB of successful recovery patterns maintained by LLM     |
+---------------------------------------------------------------+
| L4: Side-Effect Safety -- Idempotency enforcement             |
|     PENDING -> DISPATCHED -> CONFIRMED/FAILED state machine  |
|     Deterministic request_id = hash(run_id + tool + args)    |
|     Never retry from DISPATCHED -- check or fail safe        |
+---------------------------------------------------------------+
| L5: Agent Firewall                                            |
|     - SSRF prevention: block 169.254.x.x, private IPs        |
|     - PII/secret redaction: regex + ML pattern detection     |
|     - Prompt injection detection: 150+ signature catalog     |
|     - Privilege control: URL allowlists + R/W/D permissions  |
|     - Package typosquatting detection                        |
+---------------------------------------------------------------+
| L6: Dynamic Cost & Policy Enforcement                         |
|     80% budget -> auto-downgrade model at next task bound    |
|     95% budget -> pause new tasks, notify human              |
|     100% budget -> hard stop (never mid-execution)           |
+---------------------------------------------------------------+
| L7: Audit & Compliance Trail                                  |
|     JSONL: every decision logged with timestamp + agent_id   |
|     SOC2/ISO compliance reports from local data              |
|     Drift detection: compare current to historical baseline  |
+---------------------------------------------------------------+
| L8: Deterministic Testing Environment                         |
|     Replay exact execution traces from L7 audit logs          |
|     A/B test: same task, different circuit breaker configs   |
|     Inject simulated failures (503s, timeouts, malformed)    |
|     CI/CD integration for agent reliability testing          |
+---------------------------------------------------------------+
| L9: Hallucination Guard — Canary Token Detection              |
|     Injects unique canary tokens at context boundaries        |
|     Detects canary leaks in agent output (hallucination flag) |
|     Periodic canary survival check → context overstuff detect |
|     Auto-triggers truncation/summarization when integrity low |
+---------------------------------------------------------------+
| Tool Library — Shared, Pre-Warmed Tool Definitions            |
|     Agents reference tools by name, not full schema blobs     |
|     Memory stays isolated per-session; tools are shared       |
|     Saves ~500+ tokens per tool reference per session start   |
|     Reduces startup latency and token waste                   |
+---------------------------------------------------------------+
     |
     v
Tools, APIs, Databases, Payments, External Services
```

### 4.2 The Secret Weapon: Model-Aware Circuit Breaking

The core technical insight that makes Trelo novel:

| Model State | Model Used | Behavior |
|-------------|-----------|----------|
| CLOSED | Cheap (GPT-4o-mini, ~$0.15/M) | Normal operation |
| OPEN recovery | Smart (GPT-4o/Claude Sonnet, ~$3/M) | Recovery attempt with full failure context |
| Recovery success | HALF_OPEN with cheap model | Probe tool; if OK -> CLOSED |
| Recovery failure | HARD OPEN | Tool broken; human notified |
| HALF_OPEN success | CLOSED with cheap model | Normal operation resumes |
| HALF_OPEN failure | OPEN recovery with smart model | Try smart model again |

**Cost Impact:** A loop without Trelo burns $0.42+ (47 retries at cheap model). With Trelo: 3 cheap failures ($0.02) + 1 smart recovery ($0.03) = $0.05. Task completed. 90% cost reduction on failure scenarios.

---

## 5. V1 Build Plan (14 Days)

Week | What to Build | Reference | LOC
-----|--------------|-----------|-----
Days 1-3 | L2: Circuit Breaker (CLOSED→OPEN state machine) | AuraGuard CLI pattern | ~150
Days 4-5 | L1: Semantic Dedup (MD5 hash + Jaccard on args) | AutomatosAI pattern | ~100
Days 6-8 | L5: SSRF + PII (regex URL filter + PII patterns) | Puffer/ZugaShield patterns | ~200
Days 9-11 | L4: Side-Effect Safety (receipt store) | SafeAgent pattern | ~150
Days 12-13 | L3: Basic Trajectory Store (SQLite + embedding similarity) | LLM Wiki pattern (simplified) | ~200
Day 14 | L7: Audit Trail (JSONL logging) + Demo Video | Zero-dependency file logger | ~50

**Tech Stack:** Python, FastAPI, SQLite, sentence-transformers (all-MiniLM-L6-v2), OpenRouter API for model routing.

**Total:** ~1,000 lines of Python. Buildable in 14 days by one person using v4 pro via command code.

---

## 6. User Experience Flow

### 6.1 Developer Onboarding

```bash
# Install
pip install trelo

# Run the proxy
trelo serve --port 8000

# Point your agent to it
agent = Agent(base_url="http://localhost:8000/v1")
# That's it. 9 layers of protection active.
```

### 6.2 Dashboard

A minimal web dashboard showing:
- Real-time circuit breaker states (per-tool)
- Cost savings counter (actual vs. without Trelo)
- Blocked threats (SSRF attempts, PII leaks, prompt injections)
- Execution history with pass/fail per interaction
- Audit log export (JSONL, SOC2-ready)

---

## 7. Business Model

| Tier | Price | What's Included |
|------|-------|----------------|
| Open Source | Free | Core proxy, circuit breaker, basic loop detection, audit logging |
| Pro | $29/month | Semantic dedup, trajectory recovery, model-aware routing, dashboard |
| Team | $299/month | Agent firewall, cost policies, A/B testing, team dashboard |
| Enterprise | Custom | Compliance reports (SOC2/ISO), SSO, dedicated tenant, SLA, AWS autoscaling backend |

**Revenue Levers:**
- Per-request for hosted proxy ($0.0001/request after free tier)
- Seat-based for Team/Enterprise
- Usage-based for model routing optimization (% of token savings)

---

## 8. Go-To-Market Strategy

### Phase 1: Community-Led Growth (Months 1-3)
- Open source on GitHub with README + quickstart + demo video
- Launch on Hacker News: "Show HN: Trelo — Stop your AI agents from burning $500 overnight"
- r/AI_Agents community (315K members)
- LangChain Discord, CrewAI Discord, AutoGen Discord
- Content: "Why your agent burned $83 last night (and the circuit breaker pattern that fixes it)"

### Phase 2: Design Partners → Paying Customers (Months 3-6)
- 10 design partners from community with agents in production
- Free Team tier for 3 months in exchange for case studies
- Convert after proving demonstrable token savings

### Phase 3: Enterprise Pipeline (Months 6-12)
- Target companies running 100+ agents (fintech, e-commerce, SaaS)
- Channel: compliance and security budgets ($2K-5K/month)

---

## 9. Why This Wins

1. **Timing is perfect:** Gartner predicts 40%+ agent project cancellation by 2027. Teams are desperately searching for reliability solutions.

2. **No one combines all 9 layers:** Every competitor solves one piece. Trelo solves all of them in one `pip install`.

3. **YC is signaling directly:** Their RFS for "AI companies that replace services" requires exactly the runtime safety Trelo provides. Their funding of Chronicle Labs, Agentic Fabriq, and GodHands validates the agent infrastructure thesis.

4. **The economics work:** $29/mo Pro tier is affordable for individual devs. $299/mo Team is cheap compared to the $500+ agents can burn in a single overnight loop.

5. **Network effects:** The more agents protected by Trelo, the more recovery patterns in the trajectory wiki. The OSS core drives adoption; the hosted tiers monetize advanced features.

6. **Defensible moat through novelty:** Model-aware circuit breaking + canary token hallucination detection are genuinely novel. No competitor combines execution safety with runtime hallucination detection. Both techniques are patentable and create a differentiated story for YC interviews.

7. **Token efficiency as a wedge:** The shared tool library saves developers 500+ tokens per tool reference per session — a concrete, measurable benefit that compounds across hundreds of agents. It's the kind of efficiency metric enterprises love.

---

## 10. Risk Assessment

| Risk | Mitigation |
|------|-----------|
| LangChain/OpenAI build this natively | Stay middleware — they focus on orchestration, not safety. Partner with them if needed. |
| Open-source competitors | Keep OSS core free, monetize advanced layers (firewall, cost policies, enterprise compliance). |
| Enterprise sales cycles | Start with dev-led growth. Enterprise is phase 3. |
| Single founder risk | Apply to YC/EF to find a co-founder. The product-first approach buys time. |
| Model routing costs | Both cheap and smart model costs are trending down over time. |

---

## 11. Key Metrics & OKRs

### Month 1-2
- 500 GitHub stars
- 100 developer signups
- HN front page

### Month 3-4
- 10 design partners
- First revenue ($500 MRR)
- 500 agents protected

### Month 5-6
- Team tier launched
- First enterprise POC
- $5K MRR, 5,000 agents protected

### Month 7-9
- YC Demo Day (if accepted)
- Seed round ($2-3M)
- $15K MRR, enterprise pipeline

### Month 10-12
- Enterprise GA
- SOC2 certification
- 50+ paying teams
- $50K MRR, 50,000+ agents protected

---

## 12. Appendix: YC Application One-Pager

**Describe what your company does in one sentence:**

Trelo is trust middleware for AI agents — a deterministic runtime that stops infinite loops, blocks duplicate payments, prevents security attacks, and slashes token waste by 40-70%. One line of code. `pip install trelo`.

**What are you going to make?**

A lightweight proxy that sits between any AI agent framework and the world, enforcing execution safety and security. It combines circuit breakers with model-aware routing, semantic deduplication, trajectory recovery, an agent firewall, and a full audit trail — all in one `pip install`.

**Why is this important right now?**

96% of enterprises report agentic AI costs far exceeding expectations. 40%+ of agentic AI projects will be cancelled by 2027. 79% have deployed agents, but only 23% are scaling to production. Every team is independently building guardrails and circuit breakers. Trelo standardizes this into one runtime.

**What have you built so far?**

A working Python proxy that intercepts agent tool calls, detects stagnation via embedding similarity, and demonstrates circuit breaking with model escalation. Open-source launch this week.

**Why you?**

I have personally hit these failure modes building AI agents. I understand the exact moment a developer realizes their agent looped overnight and drained their API budget. I am a student founder who can ship fast and build the tool I wish already existed.

---

*Document Version 1.1 — June 2026*
*Author: Raj Pratap Singh Gurjar*

### Changelog

- **v1.1 (June 2026):** Added Layer 9 (Hallucination Guard via canary tokens), shared Tool Library for token efficiency, extended problem statement with hallucination + token waste pain points, updated competitor analysis, removed B2C pivot from scope. Autoscaling added as Enterprise-tier ops feature.
