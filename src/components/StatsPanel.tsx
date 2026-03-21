import { motion } from "framer-motion";
import { Activity, Bell, Shield, Zap } from "lucide-react";

const stats = [
  { label: "ACTIVE", value: "147", icon: Activity, type: "primary" as const },
  { label: "CRITICAL", value: "3", icon: Shield, type: "destructive" as const },
  { label: "PENDING", value: "28", icon: Bell, type: "accent" as const },
  { label: "RESOLVED", value: "1,204", icon: Zap, type: "success" as const },
];

const typeStyles = {
  primary: "glow-border text-primary",
  destructive: "glow-border-destructive text-destructive",
  accent: "glow-border-accent text-accent",
  success: "glow-border-success text-success",
};

export function StatsPanel() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`relative rounded-lg bg-card/60 backdrop-blur-sm p-5 ${typeStyles[stat.type]} overflow-hidden`}
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon className="w-5 h-5 opacity-70" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground">{stat.label}</span>
          </div>
          <p className="font-mono text-3xl font-bold">{stat.value}</p>
          {stat.type === "destructive" && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive animate-pulse-glow" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
