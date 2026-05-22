import { motion } from "framer-motion";
import { useState } from "react";
import type { CountryData } from "@/data/mockData";
import { MapPin } from "lucide-react";

interface WorldHeatmapProps {
  countries: CountryData[];
}

// Simple mercator-like projection for positioning dots
function project(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function WorldHeatmap({ countries }: WorldHeatmapProps) {
  const [hovered, setHovered] = useState<CountryData | null>(null);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Global Sentiment Map</h3>
      </div>

      <div className="relative w-full aspect-[2/1] rounded-xl bg-surface-1 border border-border/50 overflow-hidden">
        {/* Grid lines for atmosphere */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * (100 / 13)}%`} y1="0" x2={`${(i + 1) * (100 / 13)}%`} y2="100%" stroke="currentColor" strokeWidth="1" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * (100 / 7)}%`} x2="100%" y2={`${(i + 1) * (100 / 7)}%`} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>

        {/* Country dots */}
        {countries.map((country) => {
          const { x, y } = project(country.lat, country.lng);
          const isPositive = country.sentiment > 0.15;
          const isNegative = country.sentiment < -0.15;
          const dotSize = Math.max(6, Math.min(16, country.articleCount / 8));
          const glowSize = dotSize * 3;

          return (
            <motion.div
              key={country.code}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHovered(country)}
              onMouseLeave={() => setHovered(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.random() * 0.5, duration: 0.4, type: "spring" }}
            >
              {/* Glow */}
              <div
                className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-pulse-slow"
                style={{
                  width: glowSize,
                  height: glowSize,
                  background: isPositive
                    ? "radial-gradient(circle, hsla(152,68%,46%,0.25) 0%, transparent 70%)"
                    : isNegative
                    ? "radial-gradient(circle, hsla(0,72%,56%,0.25) 0%, transparent 70%)"
                    : "radial-gradient(circle, hsla(38,92%,56%,0.2) 0%, transparent 70%)",
                }}
              />
              {/* Dot */}
              <div
                className="relative rounded-full transition-transform hover:scale-150"
                style={{
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: isPositive
                    ? "hsl(152,68%,46%)"
                    : isNegative
                    ? "hsl(0,72%,56%)"
                    : "hsl(38,92%,56%)",
                  boxShadow: isPositive
                    ? "0 0 8px hsla(152,68%,46%,0.6)"
                    : isNegative
                    ? "0 0 8px hsla(0,72%,56%,0.6)"
                    : "0 0 8px hsla(38,92%,56%,0.5)",
                }}
              />
            </motion.div>
          );
        })}

        {/* Tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 pointer-events-none bg-surface-3 border border-border rounded-lg px-3 py-2 shadow-xl"
            style={{
              left: `${project(hovered.lat, hovered.lng).x}%`,
              top: `${project(hovered.lat, hovered.lng).y - 8}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="text-xs font-semibold text-foreground">{hovered.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-mono text-muted-foreground">
                Sentiment: <span className={hovered.sentiment > 0 ? "text-sentiment-positive" : hovered.sentiment < 0 ? "text-sentiment-negative" : "text-sentiment-neutral"}>
                  {hovered.sentiment > 0 ? "+" : ""}{hovered.sentiment.toFixed(2)}
                </span>
              </span>
              <span className="text-[10px] text-muted-foreground">·</span>
              <span className="text-[10px] font-mono text-muted-foreground">{hovered.articleCount} articles</span>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-sentiment-positive" /> Positive
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-sentiment-neutral" /> Neutral
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-sentiment-negative" /> Negative
          </span>
        </div>
      </div>
    </div>
  );
}
