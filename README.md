# The Barter Breakdown

A Remotion explainer video — 16 seconds, 480 frames @ 30fps.

## Setup

```bash
npm install
npm start       # Opens Remotion Studio at localhost:3000
```

## Render locally

```bash
npm run build
# Output: out/barter-breakdown.mp4
```

## Render via GitHub Actions

Push to `main` — the workflow automatically renders both:
- `barter-breakdown-vertical.mp4` (1080x1920 TikTok)
- `barter-breakdown-landscape.mp4` (1920x1080 YouTube)

Rendered files are uploaded as GitHub Actions artifacts (14-day retention).

## Structure

```
src/
├── index.ts              # Remotion entry
├── Root.tsx              # Composition registry
├── BarterBreakdown.tsx   # Main timeline with <Sequence> blocks
├── constants.ts          # Colors, fonts, scene boundaries
├── components/
│   ├── ParticleSystem.tsx
│   └── DoubleArrow.tsx
└── scenes/
    ├── Scene1.tsx        # The Baker's Dilemma     [0-120]
    ├── Scene2.tsx        # The Rejected Offer      [120-300]
    ├── Scene3.tsx        # Barter Logic            [300-390]
    └── Scene4.tsx        # Currency Resolution     [390-480]
```

## Scenes

| Scene | Frames | Duration | Description |
|-------|--------|----------|-------------|
| 1 | 0–120 | 0:00–0:04 | BAKER thud → flour particles → split → HAIRCUT |
| 2 | 120–300 | 0:04–0:10 | 10 bread rows → color flip to red → wiggle → X stamp |
| 3 | 300–390 | 0:10–0:13 | BARTER → icons → broken arrow → SAME TIME flash |
| 4 | 390–480 | 0:13–0:16 | Emerald wipe → spinning coin → CURRENCY shimmer |
