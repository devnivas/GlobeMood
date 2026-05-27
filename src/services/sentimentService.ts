import Sentiment from 'sentiment';

export type Emotion = 'joy' | 'fear' | 'sadness' | 'anger';

const sentimentAnalyzer = new Sentiment();

// Emotion detection based on sentiment score and keywords
function detectEmotionFromText(text: string, sentimentScore: number): Emotion {
  const textLower = text.toLowerCase();
  
  // Fear indicators
  if (
    textLower.includes('crash') || 
    textLower.includes('plunge') || 
    textLower.includes('fear') ||
    textLower.includes('crisis') ||
    textLower.includes('panic') ||
    textLower.includes('collapse') ||
    sentimentScore < -0.5
  ) {
    return 'fear';
  }
  
  // Sadness indicators
  if (
    textLower.includes('loss') || 
    textLower.includes('death') || 
    textLower.includes('tragedy') ||
    textLower.includes('disaster') ||
    textLower.includes('decline') ||
    (sentimentScore < -0.2 && sentimentScore >= -0.5)
  ) {
    return 'sadness';
  }
  
  // Anger indicators
  if (
    textLower.includes('attack') || 
    textLower.includes('violence') || 
    textLower.includes('criticism') ||
    textLower.includes('conflict') ||
    textLower.includes('scandal') ||
    textLower.includes('accusation') ||
    (sentimentScore < 0 && textLower.includes('angry'))
  ) {
    return 'anger';
  }
  
  // Joy/Positive indicators
  return 'joy';
}

export interface SentimentResult {
  sentiment: number; // -1 to +1
  emotion: Emotion;
  confidence: number;
  score: number;
}

/**
 * Analyze sentiment of text and return normalized score (-1 to +1) and emotion
 */
export function analyzeSentiment(text: string): SentimentResult {
  try {
    const result = sentimentAnalyzer.analyze(text);
    
    // Normalize the sentiment score to -1 to +1 range
    // The sentiment library returns comparative score which we need to normalize
    let normalizedScore = result.comparative; // This is already -1 to +1 range typically
    
    // Ensure it's within bounds
    normalizedScore = Math.max(-1, Math.min(1, normalizedScore));
    
    const emotion = detectEmotionFromText(text, normalizedScore);
    
    return {
      sentiment: normalizedScore,
      emotion,
      confidence: Math.abs(normalizedScore),
      score: result.score,
    };
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return {
      sentiment: 0,
      emotion: 'joy',
      confidence: 0,
      score: 0,
    };
  }
}

/**
 * Analyze multiple articles and compute aggregate sentiment
 */
export function analyzeArticlesSentiment(texts: string[]) {
  const results = texts.map(analyzeSentiment);
  
  const avgSentiment = results.reduce((sum, r) => sum + r.sentiment, 0) / results.length;
  const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / results.length;
  
  // Determine dominant emotion
  const emotionCounts = results.reduce((acc, r) => {
    acc[r.emotion] = (acc[r.emotion] || 0) + 1;
    return acc;
  }, {} as Record<Emotion, number>);
  
  const dominantEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'joy';
  
  return {
    sentiment: avgSentiment,
    emotion: dominantEmotion as Emotion,
    confidence: avgConfidence,
    details: results,
  };
}

/**
 * Get sentiment color for visualization
 */
export function getSentimentColor(sentiment: number): string {
  if (sentiment > 0.5) return '#10b981'; // Green - Very Positive
  if (sentiment > 0.2) return '#34d399'; // Light Green - Positive
  if (sentiment > -0.2) return '#f59e0b'; // Amber - Neutral
  if (sentiment > -0.5) return '#f87171'; // Light Red - Negative
  return '#ef4444'; // Red - Very Negative
}
