import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Newspaper } from "lucide-react";
import { SentimentBadge, EmotionTag } from "./SentimentBadge";
import type { NewsArticle } from "@/data/mockData";
import { useState } from "react";

interface NewsFeedProps {
  articles: NewsArticle[];
}

export function NewsFeed({ articles }: NewsFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Live Feed</h3>
        <span className="text-xs text-muted-foreground font-mono">({articles.length})</span>
      </div>

      <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
        <AnimatePresence>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
              className="group rounded-lg border border-border/50 bg-surface-1 hover:bg-surface-2 hover:border-border transition-all cursor-pointer p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs text-muted-foreground">{article.source}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs text-muted-foreground">{article.country}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <SentimentBadge score={article.sentiment} />
                  <EmotionTag emotion={article.emotion} />
                </div>
              </div>

              <AnimatePresence>
                {expandedId === article.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Summary</span>
                        <br />
                        {article.summary}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {article.keywords.map((kw) => (
                          <span key={kw} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                            {kw}
                          </span>
                        ))}
                        <a
                          href={article.url}
                          className="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read full article <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
