import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Cloud } from "lucide-react";
import type { TopicData } from "@/data/mockData";

interface TopicCloudProps {
  topics: TopicData[];
}

export function TopicCloud({ topics }: TopicCloudProps) {
  const [hovered, setHovered] = useState<TopicData | null>(null);

  const maxFreq = Math.max(...topics.map((t) => t.frequency));
  const minFreq = Math.min(...topics.map((t) => t.frequency));

  const sortedTopics = useMemo(
    () => [...topics].sort(() => Math.random() - 0.5),
    [topics]
  );

  function getFontSize(freq: number): number {
    const normalized = (freq - minFreq) / (maxFreq - minFreq);
    return 11 + normalized * 18;
  }

  function getColor(sentiment: number): string {
    if (sentiment > 0.3) return "hsl(152,68%,46%)";
    if (sentiment > 0) return "hsl(152,50%,55%)";
    if (sentiment > -0.3) return "hsl(38,92%,56%)";
    return "hsl(0,72%,56%)";
  }

  function getOpacity(freq: number): number {
    const normalized = (freq - minFreq) / (maxFreq - minFreq);
    return 0.5 + normalized * 0.5;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Topic Cloud</h3>
      </div>

      <div className="relative rounded-xl bg-surface-1 border border-border/50 p-6 min-h-[200px] flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        {sortedTopics.map((topic, i) => (
          <motion.span
            key={topic.word}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: getOpacity(topic.frequency), scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            onMouseEnter={() => setHovered(topic)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-all hover:!opacity-100 hover:scale-110 font-medium whitespace-nowrap"
            style={{
              fontSize: getFontSize(topic.frequency),
              color: getColor(topic.sentiment),
              textShadow: hovered?.word === topic.word
                ? `0 0 12px ${getColor(topic.sentiment)}60`
                : "none",
            }}
          >
            {topic.word}
          </motion.span>
        ))}

        {/* Tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-surface-3 border border-border rounded-lg px-3 py-1.5 shadow-xl z-10"
          >
            <p className="text-xs font-semibold text-foreground">{hovered.word}</p>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-mono text-muted-foreground">
                Mentions: <span className="text-foreground">{hovered.frequency}</span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Sentiment:{" "}
                <span style={{ color: getColor(hovered.sentiment) }}>
                  {hovered.sentiment > 0 ? "+" : ""}{hovered.sentiment.toFixed(2)}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
