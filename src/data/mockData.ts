export type Emotion = "joy" | "fear" | "sadness" | "anger";
export type Category = "business" | "tech" | "science" | "health";

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  country: string;
  countryCode: string;
  category: Category;
  sentiment: number; // -1 to +1
  emotion: Emotion;
  summary: string;
  publishedAt: string;
  url: string;
  keywords: string[];
}

export interface CountryData {
  name: string;
  code: string;
  sentiment: number;
  articleCount: number;
  lat: number;
  lng: number;
}

export interface TopicData {
  word: string;
  frequency: number;
  sentiment: number;
}

export const countries: CountryData[] = [
  { name: "United States", code: "US", sentiment: 0.32, articleCount: 142, lat: 38, lng: -97 },
  { name: "United Kingdom", code: "GB", sentiment: 0.15, articleCount: 89, lat: 54, lng: -2 },
  { name: "Germany", code: "DE", sentiment: 0.28, articleCount: 67, lat: 51, lng: 10 },
  { name: "France", code: "FR", sentiment: -0.12, articleCount: 54, lat: 46, lng: 2 },
  { name: "Japan", code: "JP", sentiment: 0.45, articleCount: 78, lat: 36, lng: 138 },
  { name: "China", code: "CN", sentiment: -0.22, articleCount: 98, lat: 35, lng: 105 },
  { name: "India", code: "IN", sentiment: 0.38, articleCount: 112, lat: 20, lng: 77 },
  { name: "Brazil", code: "BR", sentiment: -0.05, articleCount: 45, lat: -14, lng: -51 },
  { name: "Australia", code: "AU", sentiment: 0.42, articleCount: 38, lat: -25, lng: 134 },
  { name: "Canada", code: "CA", sentiment: 0.25, articleCount: 52, lat: 56, lng: -106 },
  { name: "South Korea", code: "KR", sentiment: 0.55, articleCount: 61, lat: 36, lng: 128 },
  { name: "Russia", code: "RU", sentiment: -0.45, articleCount: 73, lat: 61, lng: 105 },
  { name: "Mexico", code: "MX", sentiment: -0.08, articleCount: 34, lat: 23, lng: -102 },
  { name: "Indonesia", code: "ID", sentiment: 0.18, articleCount: 28, lat: -5, lng: 120 },
  { name: "Nigeria", code: "NG", sentiment: -0.15, articleCount: 22, lat: 10, lng: 8 },
  { name: "South Africa", code: "ZA", sentiment: -0.28, articleCount: 31, lat: -30, lng: 25 },
  { name: "Saudi Arabia", code: "SA", sentiment: 0.22, articleCount: 19, lat: 24, lng: 45 },
  { name: "Turkey", code: "TR", sentiment: -0.18, articleCount: 27, lat: 39, lng: 35 },
  { name: "Sweden", code: "SE", sentiment: 0.52, articleCount: 18, lat: 62, lng: 15 },
  { name: "Israel", code: "IL", sentiment: -0.55, articleCount: 48, lat: 31, lng: 35 },
  { name: "UAE", code: "AE", sentiment: 0.48, articleCount: 25, lat: 24, lng: 54 },
  { name: "Singapore", code: "SG", sentiment: 0.61, articleCount: 32, lat: 1, lng: 104 },
  { name: "Thailand", code: "TH", sentiment: 0.12, articleCount: 20, lat: 15, lng: 101 },
  { name: "Argentina", code: "AR", sentiment: -0.32, articleCount: 18, lat: -34, lng: -64 },
  { name: "Egypt", code: "EG", sentiment: -0.2, articleCount: 24, lat: 26, lng: 30 },
  { name: "Poland", code: "PL", sentiment: 0.08, articleCount: 15, lat: 52, lng: 20 },
  { name: "Italy", code: "IT", sentiment: 0.05, articleCount: 42, lat: 43, lng: 12 },
  { name: "Spain", code: "ES", sentiment: 0.1, articleCount: 36, lat: 40, lng: -4 },
  { name: "Netherlands", code: "NL", sentiment: 0.35, articleCount: 21, lat: 52, lng: 5 },
  { name: "Switzerland", code: "CH", sentiment: 0.48, articleCount: 16, lat: 47, lng: 8 },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "AI Chip Demand Surges as Tech Giants Race for Dominance",
    source: "TechWire",
    country: "United States",
    countryCode: "US",
    category: "tech",
    sentiment: 0.72,
    emotion: "joy",
    summary: "Global semiconductor demand hits record highs as major tech companies invest billions in AI infrastructure. Market analysts predict sustained growth through 2027.",
    publishedAt: "2 hours ago",
    url: "#",
    keywords: ["AI", "semiconductors", "technology"],
  },
  {
    id: "2",
    title: "Global Markets Tumble Amid Rising Interest Rate Fears",
    source: "Financial Post",
    country: "United Kingdom",
    countryCode: "GB",
    category: "business",
    sentiment: -0.65,
    emotion: "fear",
    summary: "Stock markets worldwide experience sharp declines as central banks signal continued monetary tightening. Investors brace for potential recession.",
    publishedAt: "3 hours ago",
    url: "#",
    keywords: ["markets", "interest rates", "economy"],
  },
  {
    id: "3",
    title: "Breakthrough in Quantum Computing Achieved by Japanese Lab",
    source: "Science Daily",
    country: "Japan",
    countryCode: "JP",
    category: "science",
    sentiment: 0.88,
    emotion: "joy",
    summary: "Researchers at the University of Tokyo achieve a major milestone in quantum error correction, bringing practical quantum computing closer to reality.",
    publishedAt: "4 hours ago",
    url: "#",
    keywords: ["quantum computing", "research", "Japan"],
  },
  {
    id: "4",
    title: "New Pandemic Preparedness Treaty Faces Opposition",
    source: "Health Global",
    country: "India",
    countryCode: "IN",
    category: "health",
    sentiment: -0.42,
    emotion: "anger",
    summary: "Several nations push back against proposed WHO pandemic treaty, citing sovereignty concerns and unequal vaccine distribution in previous outbreaks.",
    publishedAt: "5 hours ago",
    url: "#",
    keywords: ["pandemic", "WHO", "health policy"],
  },
  {
    id: "5",
    title: "Electric Vehicle Sales in China Surpass Traditional Cars",
    source: "AutoTech Review",
    country: "China",
    countryCode: "CN",
    category: "tech",
    sentiment: 0.56,
    emotion: "joy",
    summary: "China's EV market reaches historic milestone as electric vehicle registrations outnumber conventional car sales for the first time in a single quarter.",
    publishedAt: "6 hours ago",
    url: "#",
    keywords: ["electric vehicles", "China", "automotive"],
  },
  {
    id: "6",
    title: "Brazil's Deforestation Rate Drops to 15-Year Low",
    source: "EcoWatch",
    country: "Brazil",
    countryCode: "BR",
    category: "science",
    sentiment: 0.75,
    emotion: "joy",
    summary: "Satellite data reveals Amazon deforestation has decreased by 40% year-over-year, signaling success of new environmental protection policies.",
    publishedAt: "7 hours ago",
    url: "#",
    keywords: ["deforestation", "Amazon", "environment"],
  },
  {
    id: "7",
    title: "Cybersecurity Threats Escalate in European Banking Sector",
    source: "Euro Finance",
    country: "Germany",
    countryCode: "DE",
    category: "business",
    sentiment: -0.58,
    emotion: "fear",
    summary: "European Central Bank warns of increasingly sophisticated cyberattacks targeting financial institutions, urging banks to strengthen digital defenses.",
    publishedAt: "8 hours ago",
    url: "#",
    keywords: ["cybersecurity", "banking", "Europe"],
  },
  {
    id: "8",
    title: "mRNA Technology Shows Promise for Cancer Treatment",
    source: "MedTech Today",
    country: "Germany",
    countryCode: "DE",
    category: "health",
    sentiment: 0.82,
    emotion: "joy",
    summary: "Clinical trials of mRNA-based cancer vaccines show remarkable results, with significant tumor reduction in 60% of participants.",
    publishedAt: "9 hours ago",
    url: "#",
    keywords: ["mRNA", "cancer", "vaccines"],
  },
  {
    id: "9",
    title: "India's Stock Market Correction Triggers Investor Panic",
    source: "Market Pulse",
    country: "India",
    countryCode: "IN",
    category: "business",
    sentiment: -0.71,
    emotion: "fear",
    summary: "The Sensex drops over 1,200 points in a single session as foreign investors pull out billions, raising concerns about emerging market stability.",
    publishedAt: "10 hours ago",
    url: "#",
    keywords: ["stock market", "India", "correction"],
  },
  {
    id: "10",
    title: "South Korea Leads Global 6G Research Initiative",
    source: "Wireless World",
    country: "South Korea",
    countryCode: "KR",
    category: "tech",
    sentiment: 0.68,
    emotion: "joy",
    summary: "Samsung and SK Telecom announce joint 6G research program, targeting commercial deployment by 2030 with speeds 50x faster than current 5G.",
    publishedAt: "11 hours ago",
    url: "#",
    keywords: ["6G", "South Korea", "telecommunications"],
  },
  {
    id: "11",
    title: "Climate Protests Disrupt Major European Capitals",
    source: "Global Dispatch",
    country: "France",
    countryCode: "FR",
    category: "science",
    sentiment: -0.35,
    emotion: "anger",
    summary: "Tens of thousands take to the streets in Paris, Berlin, and London demanding stronger climate action ahead of the upcoming UN summit.",
    publishedAt: "12 hours ago",
    url: "#",
    keywords: ["climate", "protests", "Europe"],
  },
  {
    id: "12",
    title: "Singapore's Smart City Initiative Sets Global Benchmark",
    source: "Urban Tech",
    country: "Singapore",
    countryCode: "SG",
    category: "tech",
    sentiment: 0.78,
    emotion: "joy",
    summary: "Singapore unveils next-generation smart city infrastructure powered by AI and IoT, reducing energy consumption by 30% across public buildings.",
    publishedAt: "13 hours ago",
    url: "#",
    keywords: ["smart city", "Singapore", "IoT"],
  },
];

export const trendingTopics: TopicData[] = [
  { word: "Artificial Intelligence", frequency: 95, sentiment: 0.45 },
  { word: "Stock Market", frequency: 82, sentiment: -0.32 },
  { word: "Electric Vehicles", frequency: 78, sentiment: 0.58 },
  { word: "Climate Change", frequency: 71, sentiment: -0.25 },
  { word: "Quantum Computing", frequency: 65, sentiment: 0.72 },
  { word: "Cybersecurity", frequency: 60, sentiment: -0.48 },
  { word: "mRNA Vaccines", frequency: 55, sentiment: 0.65 },
  { word: "Cryptocurrency", frequency: 52, sentiment: 0.12 },
  { word: "Space Exploration", frequency: 48, sentiment: 0.82 },
  { word: "Renewable Energy", frequency: 45, sentiment: 0.55 },
  { word: "Trade Wars", frequency: 42, sentiment: -0.62 },
  { word: "Semiconductors", frequency: 40, sentiment: 0.48 },
  { word: "Pandemic", frequency: 38, sentiment: -0.55 },
  { word: "Robotics", frequency: 35, sentiment: 0.52 },
  { word: "Data Privacy", frequency: 33, sentiment: -0.18 },
  { word: "5G Networks", frequency: 30, sentiment: 0.35 },
  { word: "Inflation", frequency: 28, sentiment: -0.72 },
  { word: "Biotechnology", frequency: 26, sentiment: 0.62 },
  { word: "Geopolitics", frequency: 24, sentiment: -0.42 },
  { word: "Smart Cities", frequency: 22, sentiment: 0.68 },
];

export const categoryOptions: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "business", label: "Business" },
  { value: "tech", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
];

export const countryOptions = [
  { value: "all", label: "All Countries" },
  ...countries.map((c) => ({ value: c.code, label: c.name })),
];

export function getSentimentLabel(score: number): string {
  if (score >= 0.5) return "Very Positive";
  if (score >= 0.15) return "Positive";
  if (score > -0.15) return "Neutral";
  if (score > -0.5) return "Negative";
  return "Very Negative";
}

export function getEmotionEmoji(emotion: Emotion): string {
  switch (emotion) {
    case "joy": return "😊";
    case "fear": return "😨";
    case "sadness": return "😔";
    case "anger": return "😠";
  }
}

export function getGlobalSentiment(): number {
  const avg = countries.reduce((sum, c) => sum + c.sentiment, 0) / countries.length;
  return Math.round(avg * 100) / 100;
}

/**
 * Compute sentiment and stats for articles
 */
export function computeArticleStats(articles: NewsArticle[]) {
  if (articles.length === 0) {
    return {
      avgSentiment: 0,
      sentimentByCountry: {},
      sentimentByCategory: {},
      emotionDistribution: {
        joy: 0,
        fear: 0,
        sadness: 0,
        anger: 0,
      },
      topKeywords: [],
    };
  }

  // Average sentiment
  const avgSentiment = articles.reduce((sum, a) => sum + a.sentiment, 0) / articles.length;

  // Sentiment by country
  const sentimentByCountry: Record<string, { sum: number; count: number }> = {};
  articles.forEach((article) => {
    if (!sentimentByCountry[article.countryCode]) {
      sentimentByCountry[article.countryCode] = { sum: 0, count: 0 };
    }
    sentimentByCountry[article.countryCode].sum += article.sentiment;
    sentimentByCountry[article.countryCode].count += 1;
  });

  // Sentiment by category
  const sentimentByCategory: Record<Category, { sum: number; count: number }> = {
    business: { sum: 0, count: 0 },
    tech: { sum: 0, count: 0 },
    science: { sum: 0, count: 0 },
    health: { sum: 0, count: 0 },
  };
  articles.forEach((article) => {
    sentimentByCategory[article.category].sum += article.sentiment;
    sentimentByCategory[article.category].count += 1;
  });

  // Emotion distribution
  const emotionDistribution: Record<Emotion, number> = {
    joy: 0,
    fear: 0,
    sadness: 0,
    anger: 0,
  };
  articles.forEach((article) => {
    emotionDistribution[article.emotion]++;
  });

  // Top keywords
  const keywordFreq: Record<string, number> = {};
  articles.forEach((article) => {
    article.keywords.forEach((kw) => {
      keywordFreq[kw] = (keywordFreq[kw] || 0) + 1;
    });
  });
  const topKeywords = Object.entries(keywordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, frequency]) => ({
      word,
      frequency,
      sentiment: articles
        .filter((a) => a.keywords.includes(word))
        .reduce((sum, a) => sum + a.sentiment, 0) /
        articles.filter((a) => a.keywords.includes(word)).length || 0,
    }));

  return {
    avgSentiment: Math.round(avgSentiment * 100) / 100,
    sentimentByCountry,
    sentimentByCategory,
    emotionDistribution,
    topKeywords,
  };
}

/**
 * Update country data based on articles
 */
export function updateCountrySentiment(articles: NewsArticle[]): CountryData[] {
  const stats = computeArticleStats(articles);

  return countries.map((country) => {
    const countryStats = stats.sentimentByCountry[country.code];
    if (countryStats && countryStats.count > 0) {
      return {
        ...country,
        sentiment: Math.round((countryStats.sum / countryStats.count) * 100) / 100,
        articleCount: countryStats.count,
      };
    }
    return country;
  });
}
