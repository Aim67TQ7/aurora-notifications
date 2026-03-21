import { motion } from "framer-motion";

const activities = [
  { time: "14:32:01", event: "Perimeter scan initiated", level: "INFO" },
  { time: "14:31:48", event: "Auth token refreshed [NODE-7]", level: "INFO" },
  { time: "14:31:22", event: "Anomaly flagged — sector 7-G", level: "WARN" },
  { time: "14:30:55", event: "Backup sequence completed", level: "OK" },
  { time: "14:30:11", event: "Thermal spike detected", level: "WARN" },
  { time: "14:29:44", event: "Drone sync — 12 units online", level: "INFO" },
];

const levelColor = {
  INFO: "text-primary",
  WARN: "text-accent",
  OK: "text-success",
};

export function ActivityLog() {
  return (
    <div className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5 h-full">
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">ACTIVITY LOG</h2>
      <div className="space-y-2 font-mono text-xs">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 py-1.5 border-b border-border/30 last:border-0"
          >
            <span className="text-muted-foreground shrink-0">{a.time}</span>
            <span className="text-foreground/80 flex-1 truncate">{a.event}</span>
            <span className={`shrink-0 ${levelColor[a.level as keyof typeof levelColor]}`}>{a.level}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
