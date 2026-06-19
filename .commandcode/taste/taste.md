# design
See [design/taste.md](design/taste.md)
# fonts
- Use BDO Grotesk font for logo, navbar, hero section text, and feature cards. The font files are locally available in the fonts folder. Confidence: 0.75
- Use lighter font weights (font-normal or font-light) with BDO Grotesk, especially for pricing and comparison tables. Avoid font-bold or font-thin extremes. Confidence: 0.70
# tech-stack
- Use Next.js with Tailwind CSS for frontend. Confidence: 0.50
# tailwind
- Do NOT use shadcn/ui CSS custom properties (bg-background, text-foreground, text-muted-foreground, hover:bg-accent, etc.) — this project does not have a shadcn theme. Use concrete Tailwind classes like bg-white, text-gray-800, hover:bg-gray-50 instead. Confidence: 0.75
- Avoid dynamic Tailwind class construction via template literals (e.g., `data-[state=open]:${color}`) — Tailwind's JIT compiler cannot detect classes built at runtime. Always write complete, statically-analyzable class strings. Confidence: 0.70

# footer
- Use dynamic year (e.g., new Date().getFullYear()) in copyright footer instead of hardcoding the year. Confidence: 0.70
- Keep footer clean and minimal — contact details like email addresses belong on the Contact page, not duplicated in the footer. Confidence: 0.70

# auth
- Sign-in and sign-up mode toggling should be animated smoothly — use motion (AnimatePresence) for transitions between the two form states rather than an instant switch. Confidence: 0.70

# email
See [email/taste.md](email/taste.md)
# workflow
- When asked for an audit or list of issues, present the list first and wait for approval before making fixes — do not fix proactively. Confidence: 0.70
- Build complete, functional implementations — do not leave placeholder/stub/empty content. Every section should be filled out and working, ready to ship. Confidence: 0.85
- Keep codebase in sync with PRD.md — when the PRD is updated, proactively check and apply relevant changes to the implementation. Confidence: 0.70

# react
- Use optimistic UI updates for counters and lists — increment locally (+1) immediately on user action, then sync with server on page refresh. Confidence: 0.70
