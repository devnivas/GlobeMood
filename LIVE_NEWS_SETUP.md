# Live News Feed Setup Guide

## Overview

This guide will help you set up the **Global Pulse Dashboard** with real-time news feeds from around the world. The application performs automated sentiment analysis on news articles to provide global mood insights.

## Features Added

✅ **Live News Integration** - Fetches real-time news from multiple sources worldwide
✅ **Sentiment Analysis** - Automatically analyzes sentiment and emotion of news articles
✅ **Country Detection** - Maps news to 30+ countries around the globe
✅ **Dynamic Dashboard** - Real-time updates on world sentiment and trending topics
✅ **Category Filtering** - Filter news by Business, Tech, Science, and Health

## Prerequisites

- Node.js 16+ or Bun package manager
- An API key from a news provider (see options below)

## Step 1: Install Dependencies

The following packages have been added:
- `sentiment` - For sentiment analysis
- `axios` - For API requests
- `@tanstack/react-query` - Already included for state management

```bash
npm install
```

## Step 2: Get API Keys

Choose one or more of the following news APIs:

### Option A: NewsAPI (Recommended)

**Best for:** Broad coverage of global news, multiple languages support

1. Go to [https://newsapi.org](https://newsapi.org)
2. Click "Register" to sign up for a free account
3. Copy your API key from the dashboard
4. Free tier includes:
   - 250 requests per day
   - Top headlines from 50+ countries
   - Real-time news

### Option B: GNews API (Optional)

**Best for:** Alternative source, additional fallback

1. Go to [https://gnews.io](https://gnews.io)
2. Sign up for a free account
3. Get your API key
4. Free tier includes:
   - 10 requests per day
   - 100 articles per request

## Step 3: Configure Environment Variables

Create a `.env.local` file in the project root (or copy from `.env.example`):

```bash
# .env.local

# NewsAPI Key
VITE_NEWS_API_KEY=your_newsapi_key_here

# GNews Key (optional)
VITE_GNEWS_API_KEY=your_gnews_api_key_here
```

**Important:** 
- Never commit `.env.local` to git (it's in `.gitignore`)
- Keep your API keys secret
- If API keys are not configured, the app will use fallback mock data

## Step 4: How It Works

### News Fetching

The application fetches news from multiple countries:

```typescript
const countries = ['us', 'gb', 'de', 'fr', 'jp', 'in', 'br', 'au', 'ca', 'ru', 'kr', 'mx', 'ae'];
```

For each country, it retrieves the top 5 recent headlines.

### Sentiment Analysis

Each article is analyzed using the `sentiment` library:

- **Sentiment Score**: Range from -1 (negative) to +1 (positive)
- **Emotion Classification**:
  - 😊 **Joy** - Positive news
  - 😨 **Fear** - Crisis, threats, decline
  - 😔 **Sadness** - Loss, tragedy, decline
  - 😠 **Anger** - Conflict, scandal, criticism

**Example:**

```typescript
const article = "Global Markets Tumble Amid Rising Interest Rate Fears";
const sentiment = analyzeSentiment(article);
// Returns: { sentiment: -0.65, emotion: 'fear', confidence: 0.65 }
```

### Country Detection

Articles are automatically mapped to countries through:

1. **Source Detection** - Map news source to country (BBC → UK, CNN → US)
2. **Keyword Matching** - Extract country mentions from titles
3. **Fallback** - Default to US if no match found

## Step 5: Run the Application

```bash
npm run dev
```

The app will start at `http://localhost:5173`

### Live Features

- **Refresh Button** - Manually refresh the news feed (top-right corner)
- **Live Indicator** - Shows "Live" when connected to real API, "Demo" when using mock data
- **Article Count** - Footer displays total articles being tracked
- **Real-time Sentiment** - All visualizations update with live data

## File Structure

New files added:

```
src/
├── services/
│   ├── newsService.ts       # Fetch news from APIs
│   └── sentimentService.ts  # Sentiment analysis
├── hooks/
│   └── useLiveNews.ts       # React hook for live news state
└── data/
    └── mockData.ts          # Enhanced with helpers
```

## Configuration

### How to Increase Data Volume

Edit `newsService.ts` to fetch more articles:

```typescript
// Increase articles per country
pageSize: 10, // Default is 5

// Add more countries
const countries = ['us', 'gb', 'de', 'fr', 'jp', 'in', 'br', 'au', 'ca', 'ru', 'kr', 'mx', 'ae', 'sg', 'il'];
```

### How to Add New Country Detection

Edit `newsService.ts` - Add to `SOURCE_COUNTRY_MAPPING`:

```typescript
const SOURCE_COUNTRY_MAPPING: Record<string, string> = {
  'bbc-news': 'GB',
  'your-source-name': 'XX', // Add here
};
```

Or add keywords to `countryKeywords`:

```typescript
'XX': ['keyword1', 'keyword2', 'city_name'],
```

## Troubleshooting

### Issue: "Live" indicator shows "Demo"

**Cause:** API key not configured or API request failed

**Solution:**
1. Check `.env.local` has `VITE_NEWS_API_KEY` set
2. Verify API key is valid at [newsapi.org](https://newsapi.org)
3. Check browser console for error messages
4. Ensure daily API quota is not exceeded

### Issue: No articles showing

**Cause:** Either API error or invalid API key

**Solution:**
1. Open browser DevTools (F12)
2. Check console for error messages
3. Verify API key in `.env.local`
4. Check API request quota

### Issue: Sentiment analysis seems off

**Cause:** Sentiment library has limitations with short texts

**Solution:**
- The sentiment analysis is based on keyword matching
- More comprehensive text (title + description) improves accuracy
- Some complex sentiments may be misclassified

## API Usage Tips

### NewsAPI Optimization

- Free tier = 250 requests/day
- Each country = 1 request
- 13 countries × 1 request = 13 requests per refresh
- You can refresh ~19 times per day with default settings

**To reduce usage:**
- Reduce number of countries: Edit `newsService.ts`
- Reduce request frequency: Adjust cache time in `useLiveNews.ts` (staleTime parameter)

### Cache Configuration

Edit `useLiveNews.ts`:

```typescript
const { data: liveNewsData, isLoading, error } = useQuery({
  queryKey: ['liveNews'],
  queryFn: async () => { /* ... */ },
  staleTime: 5 * 60 * 1000,  // Cache for 5 minutes
  gcTime: 30 * 60 * 1000,     // Keep in memory for 30 minutes
  retry: 1,
});
```

## Performance Considerations

- Articles are limited to 200 total (to prevent memory issues)
- Sentiment analysis runs client-side (no additional API calls)
- News fetching uses React Query for automatic caching
- Updates are debounced to prevent excessive re-renders

## Next Steps

1. **Add more sentiment indicators** - Create custom sentiment models
2. **Integrate real-time updates** - Use WebSockets for live push
3. **Add article sources** - Link to original articles
4. **Expand analytics** - Add more visualizations
5. **Mobile optimization** - Improve mobile UX

## Support & Resources

- [NewsAPI Documentation](https://newsapi.org/docs)
- [GNews API Documentation](https://gnews.io/docs)
- [Sentiment NLP Library](https://github.com/thisandagain/sentiment)
- [React Query Documentation](https://tanstack.com/query/latest)

## License

See main README.md
