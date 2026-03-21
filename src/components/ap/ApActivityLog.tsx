import { motion } from "framer-motion";

const activities = [
  { time: "14:32:01", event: "ACH sent — LogiCore ($45,200)", level: "OK" },
  { time: "14:31:48", event: "Bill approved — Atlas MFG (INV-9122)", level: "INFO" },
  { time: "14:31:22", event: "Late fee accrued — Meridian Supplies ($336)", level: "WARN" },
  { time: "14:30:55", event: "Early pay discount applied — TitanWorks (2%)", level: "OK" },
  { time: "14:30:11", event: "PO mismatch flagged — Atlas MFG", level: "WARN" },
  { time: "14:29:44", event: "Batch #44 queued — 17 payments ($198K)", level: "INFO" },
  { time: "14:29:02", event: "Auto-pay failed — ClearView IT (card expired)", level: "WARN" },
  { time: "14:28:33", event: "Wire confirmed — Apex Raw Materials ($124K)", level: "OK" },
];

const levelColor = {
  INFO: "text-primary",
  WARN: "text-accent",
  OK: "text-success",
};

export function ApActivityLog() {
  return (
    <div className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5 h-full">
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">DISBURSEMENT LOG</h2>
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
