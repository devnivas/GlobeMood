# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Index.tsx (Main Page)                       │   │
│  │  ├─ useLiveNews Hook (Custom)                           │   │
│  │  ├─ SearchPanel                                         │   │
│  │  ├─ WorldHeatmap                                        │   │
│  │  ├─ SentimentGauge                                      │   │
│  │  ├─ TopicCloud                                         │   │
│  │  └─ NewsFeed Component                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│           ↑                                                       │
│           │ Provides articles & sentiment data                   │
│           │                                                       │
│  ┌────────┴──────────────────────────────────────────────────┐  │
│  │            useLiveNews Hook (New)                        │  │
│  │  ├─ fetchNewsFromMultipleSources()                      │  │
│  │  ├─ analyzeSentiment() for each article                 │  │
│  │  ├─ Combines live + mock data                           │  │
│  │  └─ Caches for 5 minutes                                │  │
│  └────┬─────────────────────────────────────────────────────┘  │
│       │                                                          │
│       ├─────────────────┬─────────────────────┐                 │
│       │                 │                     │                 │
└───────┼─────────────────┼─────────────────────┼─────────────────┘
        │                 │                     │
        ↓                 ↓                     ↓
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  News Service    │  │ Sentiment        │  │  Mock Data       │
│  (newsService)   │  │ Service          │  │  (mockData.ts)   │
│                  │  │ (sentimentService)  │                  │
│ • fetch from API │  │                  │  │ • Fallback data  │
│ • map to format  │  │ • Analyze text   │  │ • 12 articles    │
│ • detect country │  │ • Detect emotion │  │ • 30 countries   │
│ • source mapping │  │ • Score (-1 to   │  │                  │
│                  │  │   +1)            │  │                  │
└────────┬─────────┘  └──────────────────┘  └──────────────────┘
         │
         ↓
    ┌─────────────────────┐
    │  External APIs      │
    ├─────────────────────┤
    │ NewsAPI.org         │
    │ (Primary)           │
    │                     │
    │ • 50+ countries     │
    │ • Top headlines     │
    │ • 250 req/day free  │
    │                     │
    │ GNews (Optional)    │
    │ • Alternative       │
    │ • Fallback          │
    └─────────────────────┘
```

## Data Flow

```
User Action (Page Load or Refresh)
    ↓
Index.tsx calls useLiveNews()
    ↓
useLiveNews Hook (useQuery)
    ├─→ fetchNewsFromMultipleSources()
    │       ├─→ API Request to NewsAPI (for each country)
    │       └─→ Returns raw article array
    │
    ├─→ Map each article using mapArticleToNewsFormat()
    │       ├─→ Detect country from source/keywords
    │       └─→ Extract category
    │
    ├─→ analyzeSentiment() for each article
    │       ├─→ Run sentiment NLP analysis
    │       └─→ Classify emotion
    │
    ├─→ Combine with mock data (if live data available)
    │
    └─→ Return to component
        ↓
    filteredArticles (useMemo)
        ├─→ Apply search filter
        ├─→ Apply country filter
        └─→ Apply category filter
        ↓
    Component rendering
        ├─→ NewsFeed (shows articles)
        ├─→ WorldHeatmap (shows country sentiment)
        ├─→ SentimentGauge (shows global mood)
        └─→ StatsBar (shows metrics)
```

## Component Dependencies

```
Index.tsx
├── useLiveNews (custom hook)
│   ├── @tanstack/react-query
│   ├── newsService.ts
│   │   ├── axios
│   │   └── sentimentService.ts
│   │       └── sentiment (npm package)
│   └── mockData.ts
│
├── SearchPanel
├── NewsFeed
│   └── SentimentBadge
├── WorldHeatmap
│   └── Uses countries data
├── SentimentGauge
│   └── Uses globalSentiment
├── TopicCloud
│   └── Uses trendingTopics
└── StatsBar
    └── Uses articles & countries
```

## Files Modified/Created

```
✅ NEW FILES:
   src/services/newsService.ts          (News fetching)
   src/services/sentimentService.ts     (Sentiment analysis)
   src/hooks/useLiveNews.ts             (Custom hook)
   .env.example                          (API key template)
   .env.local                            (Local configuration)
   LIVE_NEWS_SETUP.md                    (Setup guide)
   INTEGRATION_SUMMARY.md                (This summary)

✅ MODIFIED FILES:
   src/pages/Index.tsx                   (Uses useLiveNews hook)
   src/data/mockData.ts                  (Added helper functions)

✅ UNCHANGED:
   All other components (NewsPanel, WorldHeatmap, etc.)
   All UI components
   Styling and configuration
```

## Technology Stack

```
Frontend:
├── React 18
├── TypeScript
├── Vite
└── Tailwind CSS

State Management:
├── React Query (@tanstack/react-query)
├── React Hooks (useState, useMemo, useEffect)
└── Framer Motion (animations)

Data Processing:
├── sentiment (NLP)
├── axios (HTTP)
└── JavaScript native APIs

APIs:
├── NewsAPI.org (Primary)
└── GNews.io (Fallback)
```

## Sentiment Classification Examples

```
Article: "AI Chip Demand Surges"
├─ Text Analysis: "surges" = positive keyword
├─ Sentiment Score: +0.72
└─ Emotion: joy ✅

Article: "Global Markets Tumble"
├─ Text Analysis: "tumble", "fear" keywords
├─ Sentiment Score: -0.65
└─ Emotion: fear 😨

Article: "Breakthrough in Quantum Computing"
├─ Text Analysis: "breakthrough" = achievement
├─ Sentiment Score: +0.88
└─ Emotion: joy ✅

Article: "Cybersecurity Threats Escalate"
├─ Text Analysis: "threats", "escalate" = danger
├─ Sentiment Score: -0.58
└─ Emotion: fear 😨
```

## API Call Optimization

```
Free Tier (NewsAPI): 250 requests/day

Current Setup:
├─ Countries: 13
├─ Calls per refresh: 1 call × 13 countries = 13 calls
└─ Max refreshes per day: 250 ÷ 13 ≈ 19 refreshes

Cache Strategy:
├─ staleTime: 5 minutes
│   └─ Data considered fresh for 5 min
├─ gcTime: 30 minutes
│   └─ Keep in memory for 30 min
└─ Result: Can refresh every 5 min without new API calls
```

## Error Handling

```
NewsAPI Call
    ↓
┌───────────────────┐
│ Success?          │
└────┬──────────────┘
     ├─ Yes ──→ Process articles
     │            ↓
     │         Analyze sentiment
     │            ↓
     │         Update dashboard
     │
     └─ No ──→ Check retry count
                   ├─ Retry 1 more time
                   ├─ Still fails?
                   │  └─→ Fall back to mock data
                   │      Show "Demo" mode
                   └─→ Log error
```

---

For detailed setup and configuration, see **LIVE_NEWS_SETUP.md**
