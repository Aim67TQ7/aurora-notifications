import { motion } from "framer-motion";

const vendors = [
  { name: "Apex Raw Materials", id: "APX-003", outstanding: "$124,000", days: 12, priority: "high" as const },
  { name: "TitanWorks", id: "TTN-016", outstanding: "$82,000", days: 8, priority: "high" as const },
  { name: "Atlas Manufacturing", id: "ATL-027", outstanding: "$31,800", days: 22, priority: "medium" as const },
  { name: "Meridian Supplies", id: "MRD-012", outstanding: "$22,400", days: 44, priority: "medium" as const },
  { name: "Cornerstone Properties", id: "CNR-009", outstanding: "$18,500", days: 3, priority: "low" as const },
];

const priorityStyles = {
  high: "text-destructive",
  medium: "text-accent",
  low: "text-primary",
};

const priorityLabel = {
  high: "URGENT",
  medium: "SOON",
  low: "OK",
};

export function TopVendors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">TOP VENDOR OBLIGATIONS</h2>
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 font-mono text-[10px] tracking-wider text-muted-foreground pb-2 border-b border-border/30">
          <span>VENDOR</span>
          <span className="text-right">OWED</span>
          <span className="text-right">DUE</span>
          <span className="text-right">STATUS</span>
        </div>
        {vendors.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-2 border-b border-border/20 last:border-0 group cursor-pointer hover:bg-card/30 -mx-2 px-2 rounded transition-colors"
          >
            <div className="min-w-0">
              <p className="font-display text-sm text-foreground truncate">{v.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{v.id}</p>
            </div>
            <span className="font-mono text-sm text-foreground font-bold self-center">{v.outstanding}</span>
            <span className={`font-mono text-sm self-center ${v.days <= 7 ? "text-destructive" : v.days <= 14 ? "text-accent" : "text-muted-foreground"}`}>
              {v.days}d
            </span>
            <span className={`font-mono text-xs self-center font-bold ${priorityStyles[v.priority]}`}>
              {priorityLabel[v.priority]}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
