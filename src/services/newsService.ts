import axios from 'axios';

export interface NewsApiArticle {
  title: string;
  description: string;
  content: string;
  source: { name: string };
  author?: string;
  publishedAt: string;
  url: string;
  image?: string;
}

// Country code mapping for news sources
const COUNTRY_MAPPING: Record<string, { name: string; code: string }> = {
  'us': { name: 'United States', code: 'US' },
  'gb': { name: 'United Kingdom', code: 'GB' },
  'de': { name: 'Germany', code: 'DE' },
  'fr': { name: 'France', code: 'FR' },
  'jp': { name: 'Japan', code: 'JP' },
  'cn': { name: 'China', code: 'CN' },
  'in': { name: 'India', code: 'IN' },
  'br': { name: 'Brazil', code: 'BR' },
  'au': { name: 'Australia', code: 'AU' },
  'ca': { name: 'Canada', code: 'CA' },
  'kr': { name: 'South Korea', code: 'KR' },
  'ru': { name: 'Russia', code: 'RU' },
  'mx': { name: 'Mexico', code: 'MX' },
  'id': { name: 'Indonesia', code: 'ID' },
  'ng': { name: 'Nigeria', code: 'NG' },
  'za': { name: 'South Africa', code: 'ZA' },
  'sa': { name: 'Saudi Arabia', code: 'SA' },
  'tr': { name: 'Turkey', code: 'TR' },
  'se': { name: 'Sweden', code: 'SE' },
  'il': { name: 'Israel', code: 'IL' },
  'ae': { name: 'UAE', code: 'AE' },
  'sg': { name: 'Singapore', code: 'SG' },
  'th': { name: 'Thailand', code: 'TH' },
  'ar': { name: 'Argentina', code: 'AR' },
  'eg': { name: 'Egypt', code: 'EG' },
  'pl': { name: 'Poland', code: 'PL' },
  'it': { name: 'Italy', code: 'IT' },
  'es': { name: 'Spain', code: 'ES' },
  'nl': { name: 'Netherlands', code: 'NL' },
  'ch': { name: 'Switzerland', code: 'CH' },
};

// Source to country mapping
const SOURCE_COUNTRY_MAPPING: Record<string, string> = {
  'bbc-news': 'GB',
  'bbc-sport': 'GB',
  'the-telegraph': 'GB',
  'the-guardian': 'GB',
  'independent': 'GB',
  'al-jazeera-english': 'AE',
  'the-wall-street-journal': 'US',
  'cnn': 'US',
  'bloomberg': 'US',
  'fox-news': 'US',
  'nbc-news': 'US',
  'espn': 'US',
  'techcrunch': 'US',
  'wired': 'US',
  'the-verge': 'US',
  'politico': 'US',
  'breitbart-news': 'US',
  'national-geographic': 'US',
  'new-york-times': 'US',
  'associated-press': 'US',
  'reuters': 'GB',
  'spiegel-online': 'DE',
  'der-tagesspiegel': 'DE',
  'le-monde': 'FR',
  'liberation': 'FR',
  'figaro': 'FR',
  'corriere-della-sera': 'IT',
  'el-pais': 'ES',
  'abc-es': 'ES',
  'nrc': 'NL',
  'pravda': 'RU',
  'rt': 'RU',
  'nikkei': 'JP',
  'the-times-of-india': 'IN',
  'the-hindu': 'IN',
  'g1': 'BR',
  'canadian-broadcasting-corp': 'CA',
  'the-globe-and-mail': 'CA',
  'china-daily': 'CN',
  'dawn': 'IN',
  'bangkok-post': 'TH',
};

// Detect country from source or content
function detectCountry(source: string, title: string): string {
  const sourceLower = source.toLowerCase();
  
  // Check direct source mapping
  if (SOURCE_COUNTRY_MAPPING[sourceLower]) {
    return SOURCE_COUNTRY_MAPPING[sourceLower];
  }
  
  // Check for keywords in title
  const countryKeywords: Record<string, string> = {
    'US': ['America', 'US', 'USA', 'United States', 'American', 'Trump', 'Biden', 'Congress', 'Washington'],
    'GB': ['UK', 'Britain', 'British', 'London', 'Parliament', 'Brexit'],
    'DE': ['Germany', 'German', 'Berlin', 'Merkel'],
    'FR': ['France', 'French', 'Paris', 'Macron'],
    'JP': ['Japan', 'Japanese', 'Tokyo'],
    'CN': ['China', 'Chinese', 'Beijing', 'Xi Jinping'],
    'IN': ['India', 'Indian', 'New Delhi', 'Modi'],
    'BR': ['Brazil', 'Brazilian', 'Rio', 'São Paulo'],
    'AU': ['Australia', 'Australian', 'Sydney'],
    'CA': ['Canada', 'Canadian', 'Toronto', 'Vancouver'],
    'KR': ['Korea', 'Korean', 'Seoul', 'K-pop'],
    'RU': ['Russia', 'Russian', 'Moscow', 'Putin'],
    'MX': ['Mexico', 'Mexican', 'Mexico City'],
    'ID': ['Indonesia', 'Indonesian', 'Jakarta'],
    'NG': ['Nigeria', 'Nigerian', 'Lagos'],
    'ZA': ['South Africa', 'African', 'Johannesburg'],
    'SA': ['Saudi Arabia', 'Saudi', 'Riyadh'],
    'TR': ['Turkey', 'Turkish', 'Istanbul', 'Ankara'],
    'SE': ['Sweden', 'Swedish', 'Stockholm'],
    'IL': ['Israel', 'Israeli', 'Tel Aviv', 'Jerusalem'],
    'AE': ['UAE', 'Dubai', 'Abu Dhabi', 'Emirates'],
    'SG': ['Singapore', 'Singaporean'],
    'TH': ['Thailand', 'Thai', 'Bangkok'],
    'AR': ['Argentina', 'Argentine', 'Buenos Aires'],
    'EG': ['Egypt', 'Egyptian', 'Cairo'],
    'PL': ['Poland', 'Polish', 'Warsaw'],
    'IT': ['Italy', 'Italian', 'Rome', 'Milan'],
    'ES': ['Spain', 'Spanish', 'Madrid', 'Barcelona'],
    'NL': ['Netherlands', 'Dutch', 'Amsterdam'],
    'CH': ['Switzerland', 'Swiss', 'Zurich'],
  };
  
  const titleLower = title.toLowerCase();
  for (const [code, keywords] of Object.entries(countryKeywords)) {
    for (const keyword of keywords) {
      if (titleLower.includes(keyword.toLowerCase())) {
        return code;
      }
    }
  }
  
  return 'US'; // Default fallback
}

export async function fetchNewsFromMultipleSources(): Promise<NewsApiArticle[]> {
  try {
    // Try to use NewsAPI if key is available
    const apiKey = import.meta.env.VITE_NEWS_API_KEY || '';
    
    if (!apiKey) {
      console.warn('NEWS_API_KEY not found in environment variables. Using mock data.');
      return [];
    }

    // Fetch from multiple news sources
    const countries = ['us', 'gb', 'de', 'fr', 'jp', 'in', 'br', 'au', 'ca', 'ru', 'kr', 'mx', 'ae'];
    const allArticles: NewsApiArticle[] = [];

    for (const country of countries) {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country,
            pageSize: 5,
            apiKey,
          },
          timeout: 5000,
        });

        if (response.data.articles) {
          allArticles.push(...response.data.articles);
        }
      } catch (error) {
        console.warn(`Failed to fetch news for country ${country}:`, error);
      }
    }

    return allArticles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Alternative: Fetch news from RSS feeds or alternative APIs
export async function fetchNewsFromGnews(): Promise<NewsApiArticle[]> {
  try {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY || '';
    
    if (!apiKey) {
      return [];
    }

    const response = await axios.get('https://gnews.io/api/v4/top', {
      params: {
        token: apiKey,
        limit: 100,
        lang: 'en',
      },
      timeout: 5000,
    });

    return response.data.articles || [];
  } catch (error) {
    console.error('Error fetching from GNews:', error);
    return [];
  }
}

// Map NewsAPI articles to our NewsArticle format
export function mapArticleToNewsFormat(article: NewsApiArticle, index: number, countryCode?: string) {
  const detectedCountry = countryCode || detectCountry(article.source.name, article.title);
  const countryData = Object.values(COUNTRY_MAPPING).find(c => c.code === detectedCountry) || 
                      { name: detectedCountry, code: detectedCountry };
  
  const categories: Array<'business' | 'tech' | 'science' | 'health'> = ['business', 'tech', 'science', 'health'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  return {
    id: `live-${index}-${Date.now()}`,
    title: article.title,
    source: article.source.name,
    country: countryData.name,
    countryCode: countryData.code,
    category,
    sentiment: 0, // Will be computed by sentiment analysis
    emotion: 'joy' as const,
    summary: article.description || article.content || 'No summary available',
    publishedAt: new Date(article.publishedAt).toLocaleString(),
    url: article.url,
    keywords: article.title.split(' ').filter(w => w.length > 4).slice(0, 5),
  };
}
