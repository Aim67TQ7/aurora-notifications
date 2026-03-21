import { motion } from "framer-motion";

const debtors = [
  { name: "Acme Corp", id: "ACME-001", outstanding: "$34,200", days: 94, risk: "high" as const },
  { name: "DataVault", id: "DVT-055", outstanding: "$42,100", days: 127, risk: "high" as const },
  { name: "TechFlow Inc", id: "TECH-042", outstanding: "$18,750", days: 67, risk: "medium" as const },
  { name: "Orion LLC", id: "ORI-033", outstanding: "$15,300", days: 45, risk: "medium" as const },
  { name: "CloudNine SaaS", id: "CLD-019", outstanding: "$28,400", days: 38, risk: "low" as const },
];

const riskStyles = {
  high: "text-destructive",
  medium: "text-accent",
  low: "text-primary",
};

const riskLabel = {
  high: "HIGH",
  medium: "MED",
  low: "LOW",
};

export function TopDebtors() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">TOP OUTSTANDING ACCOUNTS</h2>
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 font-mono text-[10px] tracking-wider text-muted-foreground pb-2 border-b border-border/30">
          <span>ACCOUNT</span>
          <span className="text-right">BALANCE</span>
          <span className="text-right">DAYS</span>
          <span className="text-right">RISK</span>
        </div>
        {debtors.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-2 border-b border-border/20 last:border-0 group cursor-pointer hover:bg-card/30 -mx-2 px-2 rounded transition-colors"
          >
            <div className="min-w-0">
              <p className="font-display text-sm text-foreground truncate">{d.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{d.id}</p>
            </div>
            <span className="font-mono text-sm text-foreground font-bold self-center">{d.outstanding}</span>
            <span className={`font-mono text-sm self-center ${d.days > 90 ? "text-destructive" : d.days > 60 ? "text-accent" : "text-muted-foreground"}`}>
              {d.days}
            </span>
            <span className={`font-mono text-xs self-center font-bold ${riskStyles[d.risk]}`}>
              {riskLabel[d.risk]}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
