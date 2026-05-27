# Quick Start Guide - Live News Setup

## ⚡ 3-Minute Setup

### Step 1: Get Your API Key (1 minute)

1. Open [https://newsapi.org/register](https://newsapi.org/register)
2. Fill in the form and sign up
3. Check your email and verify
4. Copy your API key from the dashboard

### Step 2: Configure the App (1 minute)

1. Open `.env.local` in the project root
2. Replace `your_newsapi_key_here` with your actual key:
   ```
   VITE_NEWS_API_KEY=abc123def456...
   ```
3. Save the file

### Step 3: Run the App (1 minute)

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

You should see:
- ✅ "Live" indicator in the top-right corner
- ✅ Real news articles from around the world
- ✅ Sentiment scores and emotions for each article
- ✅ Interactive world heatmap showing global sentiment

---

## 🎯 Key Features

### Live News Feed
- **What**: Real articles from 30+ countries
- **How**: Fetches from NewsAPI automatically
- **Update**: Every 5 minutes (cached)

### Sentiment Analysis
- **Score**: -1 (very negative) to +1 (very positive)
- **Emotions**: 😊 Joy, 😨 Fear, 😔 Sadness, 😠 Anger
- **Speed**: Instant (runs locally, no extra API calls)

### Interactive Dashboard
- **World Heatmap**: Click countries to see sentiment
- **Global Gauge**: Overall world mood
- **News Feed**: Scrollable list of articles
- **Search**: Find articles by keywords

---

## 🔄 Refresh News

Click the **Refresh** button in the top-right corner to get latest news immediately.

**Note**: The app caches news for 5 minutes to save API quota.

---

## 📊 Understanding the Sentiment Scores

### Very Positive (+0.5 to +1.0)
- Breakthrough discoveries
- Economic growth
- Tech achievements
- Innovation
- **Color**: Green 🟢

### Positive (+0.15 to +0.5)
- Good news
- Progress reports
- Positive developments
- **Color**: Light Green 🟢

### Neutral (-0.15 to +0.15)
- Factual reports
- Balanced news
- **Color**: Yellow 🟡

### Negative (-0.5 to -0.15)
- Challenges
- Decline reports
- Concerns
- **Color**: Red 🔴

### Very Negative (-1.0 to -0.5)
- Crises
- Major losses
- Disasters
- Threats
- **Color**: Dark Red 🔴

---

## 🌍 Supported Countries

The app fetches news from these countries by default:

- 🇺🇸 United States
- 🇬🇧 United Kingdom
- 🇩🇪 Germany
- 🇫🇷 France
- 🇯🇵 Japan
- 🇮🇳 India
- 🇧🇷 Brazil
- 🇦🇺 Australia
- 🇨🇦 Canada
- 🇷🇺 Russia
- 🇰🇷 South Korea
- 🇲🇽 Mexico
- 🇦🇪 UAE

(Plus 17 more for a total of 30+)

---

## ❓ Troubleshooting

### Q: It shows "Demo" instead of "Live"

**A:** Your API key might not be set or is invalid.

**Fix:**
1. Check `.env.local` has your key
2. Verify the key at [newsapi.org/account](https://newsapi.org/account)
3. Restart the dev server

### Q: No articles are showing

**A:** Either API failed or no key configured.

**Fix:**
1. Open browser console (F12)
2. Look for error messages
3. Check your API quota

### Q: Same articles keep showing

**A:** This is normal! The app caches for 5 minutes to save API quota.

**Fix:**
- Click "Refresh" button to get new articles immediately

### Q: Can I add more countries?

**A:** Yes! Edit `src/services/newsService.ts` and add to the countries array.

---

## 📈 API Quota Management

**NewsAPI Free Tier:**
- 250 requests per day
- 13 countries × 1 request = 13 requests per refresh
- **Result**: Can refresh ~19 times per day

**Tips to reduce usage:**
- Don't refresh too frequently (auto-caches for 5 min)
- Remove unused countries
- Upgrade to paid plan for unlimited requests

---

## 🎨 Customization

### Change Update Frequency

Edit `src/hooks/useLiveNews.ts`:

```typescript
staleTime: 10 * 60 * 1000,  // Change 5 to 10 minutes
```

### Add More Countries

Edit `src/services/newsService.ts`:

```typescript
const countries = ['us', 'gb', 'de', 'fr', 'jp', 'in', 'br', 'au', 'ca', 'ru', 'kr', 'mx', 'ae', 'sg'];
```

### Show More Articles

Edit `src/services/newsService.ts`:

```typescript
pageSize: 10,  // Change from 5 to 10
```

---

## 📚 What's Happening Behind the Scenes

1. **User opens dashboard**
   - App loads, checks for API key
   - If key exists, fetches news from 13 countries
   - Analyzes sentiment of each article
   - Updates all visualizations

2. **Auto-refresh every 5 minutes**
   - Fetches latest news
   - Analyzes sentiment
   - Updates dashboard

3. **User clicks Refresh**
   - Forces immediate fetch (ignores cache)
   - Updates all data

4. **Sentiment scoring**
   - Analyzes title + description
   - Classifies emotions
   - Scores -1 to +1
   - Colors heatmap accordingly

---

## 🚀 Next Steps

### Basic Setup Complete? ✅

Now you can:
- ✅ Watch real-time global sentiment
- ✅ Filter by country or category
- ✅ Search for specific topics
- ✅ See emotional analysis
- ✅ Export data if needed

### Want More Features?

- Add WebSocket for real-time push
- Create custom dashboards
- Export sentiment reports
- Add email alerts
- Integrate with other tools

---

## 📞 Support

- **API Issues?** Check [NewsAPI Docs](https://newsapi.org/docs)
- **Sentiment Questions?** See LIVE_NEWS_SETUP.md
- **Architecture?** See ARCHITECTURE.md
- **Code Issues?** Check browser console (F12)

---

## ✅ Success Checklist

- [ ] API key obtained from newsapi.org
- [ ] `.env.local` configured with API key
- [ ] `npm run dev` started successfully
- [ ] Browser shows "Live" indicator
- [ ] Articles loading from multiple countries
- [ ] Sentiment scores displaying correctly
- [ ] Heatmap colors updating
- [ ] Refresh button working

**All checked?** 🎉 **You're good to go!**

---

## 📝 Remember

- **Never share** your API key
- **Don't commit** `.env.local` to git (it's gitignored)
- **Monitor quota** at newsapi.org dashboard
- **Cache helps**: App caches for 5 minutes to save calls

---

**Happy analyzing!** 📊✨
