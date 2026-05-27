import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, Zap, RefreshCw } from "lucide-react";
import { SearchPanel } from "@/components/dashboard/SearchPanel";
import { NewsFeed } from "@/components/dashboard/NewsFeed";
import { WorldHeatmap } from "@/components/dashboard/WorldHeatmap";
import { SentimentGauge } from "@/components/dashboard/SentimentGauge";
import { TopicCloud } from "@/components/dashboard/TopicCloud";
import { StatsBar } from "@/components/dashboard/StatsBar";
import {
  countries,
  trendingTopics,
  getGlobalSentiment,
  updateCountrySentiment,
  computeArticleStats,
  type Category,
} from "@/data/mockData";
import { useLiveNews } from "@/hooks/useLiveNews";

const Index = () => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const { articles, isLoading, isLive, refetch } = useLiveNews();

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        !search ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
      const matchesCountry = country === "all" || article.countryCode === country;
      const matchesCategory = category === "all" || article.category === category;
      return matchesSearch && matchesCountry && matchesCategory;
    });
  }, [search, country, category, articles]);

  // Update country sentiments based on articles
  const updatedCountries = useMemo(() => {
    return updateCountrySentiment(articles);
  }, [articles]);

  const globalSentiment = useMemo(() => {
    const stats = computeArticleStats(articles);
    return stats.avgSentiment;
  }, [articles]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-surface-1/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <Globe className="h-7 w-7 text-primary" />
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-sentiment-positive animate-pulse" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-gradient-brand">GlobeMood</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Strategic Intelligence Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border/50 hover:bg-surface-2 transition-colors disabled:opacity-50"
                title="Refresh news feed"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-sentiment-positive" />
                <span className="hidden sm:inline font-mono">{isLive ? "Live" : "Demo"}</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-sentiment-positive animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SearchPanel
            search={search}
            onSearchChange={setSearch}
            country={country}
            onCountryChange={setCountry}
            category={category}
            onCategoryChange={setCategory}
          />
        </motion.div>

        {/* Stats Bar */}
        <StatsBar articles={filteredArticles} countries={updatedCountries} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Heatmap + Gauge Row */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <WorldHeatmap countries={updatedCountries} />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-xl border border-border/50 bg-surface-1 p-4"
              >
                <SentimentGauge value={globalSentiment} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <TopicCloud topics={trendingTopics} />
              </motion.div>
            </div>
          </div>

          {/* Right: News Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-1"
          >
            <NewsFeed articles={filteredArticles} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground font-mono">
            GlobeMood v1.0 · Powered by AI Sentiment Analysis
          </p>
          <p className="text-[10px] text-muted-foreground font-mono">
            {updatedCountries.length} countries · {articles.length} articles tracked {isLive && "(Live)"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
