import { motion } from "framer-motion";

const activities = [
  { time: "14:32:01", event: "Payment received — GlobalTech ($25,000)", level: "OK" },
  { time: "14:31:48", event: "Dunning email sent — Acme Corp (3rd notice)", level: "WARN" },
  { time: "14:31:22", event: "INV-4038 generated — Vertex Labs ($12,800)", level: "INFO" },
  { time: "14:30:55", event: "Credit check completed — NewCo (APPROVED)", level: "OK" },
  { time: "14:30:11", event: "INV-3756 escalated to collections", level: "WARN" },
  { time: "14:29:44", event: "Dispute opened — Orion LLC (INV-3990)", level: "WARN" },
  { time: "14:29:02", event: "Payment plan created — Sterling Media", level: "INFO" },
  { time: "14:28:33", event: "Wire confirmed — Pinnacle Group ($67,500)", level: "OK" },
];

const levelColor = {
  INFO: "text-primary",
  WARN: "text-accent",
  OK: "text-success",
};

export function ActivityLog() {
  return (
    <div className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5 h-full">
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">TRANSACTION LOG</h2>
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
