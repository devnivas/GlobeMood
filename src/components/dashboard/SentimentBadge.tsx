import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Emotion } from "@/data/mockData";

interface SentimentBadgeProps {
  score: number;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function SentimentBadge({ score, size = "sm", showLabel = true }: SentimentBadgeProps) {
  const isPositive = score > 0.15;
  const isNegative = score < -0.15;
  const label = isPositive ? "Positive" : isNegative ? "Negative" : "Neutral";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-mono font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        isPositive && "bg-sentiment-positive/15 text-sentiment-positive",
        isNegative && "bg-sentiment-negative/15 text-sentiment-negative",
        !isPositive && !isNegative && "bg-sentiment-neutral/15 text-sentiment-neutral"
      )}
    >
      <span className={cn(
        "inline-block rounded-full",
        size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
        isPositive && "bg-sentiment-positive",
        isNegative && "bg-sentiment-negative",
        !isPositive && !isNegative && "bg-sentiment-neutral"
      )} />
      {showLabel && <span>{label}</span>}
      <span>{score > 0 ? "+" : ""}{score.toFixed(2)}</span>
    </span>
  );
}

interface EmotionTagProps {
  emotion: Emotion;
}

export function EmotionTag({ emotion }: EmotionTagProps) {
  const config: Record<Emotion, { label: string; emoji: string; className: string }> = {
    joy: { label: "Joy", emoji: "😊", className: "bg-sentiment-joy/10 text-sentiment-joy" },
    fear: { label: "Fear", emoji: "😨", className: "bg-sentiment-fear/10 text-sentiment-fear" },
    sadness: { label: "Sadness", emoji: "😔", className: "bg-sentiment-sadness/10 text-sentiment-sadness" },
    anger: { label: "Anger", emoji: "😠", className: "bg-sentiment-anger/10 text-sentiment-anger" },
  };

  const c = config[emotion];

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", c.className)}>
      <span>{c.emoji}</span>
      <span>{c.label}</span>
    </span>
  );
}
