import { motion } from "framer-motion";
import { FileText, AlertTriangle, Clock, CheckCircle } from "lucide-react";

const stats = [
  { label: "OUTSTANDING", value: "$2.18M", subtitle: "214 bills", icon: FileText, type: "primary" as const },
  { label: "OVERDUE", value: "$263K", subtitle: "19 vendors", icon: AlertTriangle, type: "destructive" as const },
  { label: "DUE THIS WEEK", value: "$478K", subtitle: "31 bills", icon: Clock, type: "accent" as const },
  { label: "PAID MTD", value: "$1.12M", subtitle: "98.4% on-time", icon: CheckCircle, type: "success" as const },
];

const typeStyles = {
  primary: "glow-border text-primary",
  destructive: "glow-border-destructive text-destructive",
  accent: "glow-border-accent text-accent",
  success: "glow-border-success text-success",
};

export function ApStatsPanel() {
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
          <p className="font-mono text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
          {stat.type === "destructive" && (
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive animate-pulse-glow" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
