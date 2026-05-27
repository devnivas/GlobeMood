import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsFromMultipleSources, mapArticleToNewsFormat } from '@/services/newsService';
import { analyzeSentiment } from '@/services/sentimentService';
import type { NewsArticle } from '@/data/mockData';
import { newsArticles as mockArticles } from '@/data/mockData';

export function useLiveNews() {
  const [articles, setArticles] = useState<NewsArticle[]>(mockArticles);
  const [isLive, setIsLive] = useState(false);

  // Fetch live news
  const { data: liveNewsData, isLoading, error } = useQuery({
    queryKey: ['liveNews'],
    queryFn: async () => {
      try {
        const rawArticles = await fetchNewsFromMultipleSources();
        if (rawArticles.length === 0) {
          // Fallback to mock data if API is not configured
          return null;
        }

        // Map and analyze articles
        const processedArticles = rawArticles.map((article, index) => {
          const baseArticle = mapArticleToNewsFormat(article, index);
          
          // Perform sentiment analysis
          const text = `${baseArticle.title} ${baseArticle.summary}`;
          const { sentiment, emotion } = analyzeSentiment(text);
          
          return {
            ...baseArticle,
            sentiment,
            emotion,
          };
        });

        return processedArticles;
      } catch (err) {
        console.error('Error fetching live news:', err);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });

  // Update articles when live news is available
  useEffect(() => {
    if (liveNewsData && liveNewsData.length > 0) {
      // Combine live and mock data, prioritizing live news
      const combinedArticles = [...liveNewsData, ...mockArticles];
      // Remove duplicates based on similar titles
      const uniqueArticles = combinedArticles.reduce((acc, article) => {
        const isDuplicate = acc.some(
          existing =>
            existing.title.toLowerCase().includes(article.title.slice(0, 20).toLowerCase()) ||
            article.title.toLowerCase().includes(existing.title.slice(0, 20).toLowerCase())
        );
        return isDuplicate ? acc : [...acc, article];
      }, [] as NewsArticle[]);

      setArticles(uniqueArticles.slice(0, 200)); // Limit to 200 articles
      setIsLive(true);
    } else if (!isLoading && error) {
      // Use mock data if there's an error
      console.log('Using mock data due to API error or not configured');
      setArticles(mockArticles);
      setIsLive(false);
    }
  }, [liveNewsData, isLoading, error]);

  const refetch = useCallback(async () => {
    // Manual refresh
    try {
      const rawArticles = await fetchNewsFromMultipleSources();
      if (rawArticles.length > 0) {
        const processedArticles = rawArticles.map((article, index) => {
          const baseArticle = mapArticleToNewsFormat(article, index);
          const text = `${baseArticle.title} ${baseArticle.summary}`;
          const { sentiment, emotion } = analyzeSentiment(text);
          return { ...baseArticle, sentiment, emotion };
        });
        setArticles(prev => [...processedArticles, ...prev].slice(0, 200));
        setIsLive(true);
      }
    } catch (err) {
      console.error('Manual refresh failed:', err);
    }
  }, []);

  return {
    articles,
    isLoading,
    error,
    isLive,
    refetch,
  };
}
