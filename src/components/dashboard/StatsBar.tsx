import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import type { NewsArticle, CountryData } from "@/data/mockData";

interface StatsBarProps {
  articles: NewsArticle[];
  countries: CountryData[];
}

export function StatsBar({ articles, countries }: StatsBarProps) {
  const positiveCount = articles.filter((a) => a.sentiment > 0.15).length;
  const negativeCount = articles.filter((a) => a.sentiment < -0.15).length;
  const neutralCount = articles.length - positiveCount - negativeCount;
  const avgSentiment = articles.reduce((s, a) => s + a.sentiment, 0) / articles.length;

  const stats = [
    {
      label: "Articles Analyzed",
      value: articles.length,
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Positive",
      value: positiveCount,
      icon: TrendingUp,
      color: "text-sentiment-positive",
    },
    {
      label: "Negative",
      value: negativeCount,
      icon: TrendingDown,
      color: "text-sentiment-negative",
    },
    {
      label: "Avg. Sentiment",
      value: (avgSentiment > 0 ? "+" : "") + avgSentiment.toFixed(2),
      icon: Activity,
      color: avgSentiment > 0 ? "text-sentiment-positive" : avgSentiment < 0 ? "text-sentiment-negative" : "text-sentiment-neutral",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="rounded-lg border border-border/50 bg-surface-1 p-3"
        >
          <div className="flex items-center gap-2">
            <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</span>
          </div>
          <p className={`text-2xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
