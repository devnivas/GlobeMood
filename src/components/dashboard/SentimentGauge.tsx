import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { getSentimentLabel } from "@/data/mockData";

interface SentimentGaugeProps {
  value: number; // -1 to +1
  label?: string;
}

export function SentimentGauge({ value, label = "Global Tech Sentiment" }: SentimentGaugeProps) {
  // Map -1..+1 to 0..180 degrees for the arc
  const normalized = (value + 1) / 2; // 0..1
  const angle = normalized * 180;
  const circumference = Math.PI * 90; // half circle with r=90
  const strokeDashoffset = circumference * (1 - normalized);

  const sentimentLabel = getSentimentLabel(value);
  const isPositive = value > 0.15;
  const isNegative = value < -0.15;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 self-start">
        <Gauge className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Hype Gauge</h3>
      </div>

      <div className="relative w-48 h-28">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Colored arc */}
          <motion.path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke={isPositive ? "hsl(152,68%,46%)" : isNegative ? "hsl(0,72%,56%)" : "hsl(38,92%,56%)"}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: isPositive
                ? "drop-shadow(0 0 8px hsla(152,68%,46%,0.5))"
                : isNegative
                ? "drop-shadow(0 0 8px hsla(0,72%,56%,0.5))"
                : "drop-shadow(0 0 8px hsla(38,92%,56%,0.4))",
            }}
          />

          {/* Needle */}
          <motion.line
            x1="100"
            y1="100"
            x2="100"
            y2="25"
            stroke="hsl(var(--foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: angle - 90 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "100px 100px" }}
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="hsl(var(--foreground))" />

          {/* Labels */}
          <text x="8" y="108" className="text-[9px] fill-muted-foreground font-mono" textAnchor="start">-1</text>
          <text x="100" y="12" className="text-[9px] fill-muted-foreground font-mono" textAnchor="middle">0</text>
          <text x="192" y="108" className="text-[9px] fill-muted-foreground font-mono" textAnchor="end">+1</text>
        </svg>

        {/* Center value */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <motion.p
            className="text-2xl font-bold font-mono"
            style={{
              color: isPositive
                ? "hsl(152,68%,46%)"
                : isNegative
                ? "hsl(0,72%,56%)"
                : "hsl(38,92%,56%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {value > 0 ? "+" : ""}{value.toFixed(2)}
          </motion.p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">{label}</p>
      <p className="text-sm font-semibold mt-0.5" style={{
        color: isPositive
          ? "hsl(152,68%,46%)"
          : isNegative
          ? "hsl(0,72%,56%)"
          : "hsl(38,92%,56%)",
      }}>
        {sentimentLabel}
      </p>
    </div>
  );
}
