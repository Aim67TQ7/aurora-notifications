import { motion } from "framer-motion";
import { Hexagon, Radio, Wifi, DollarSign } from "lucide-react";

export function HudHeader() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm glow-border p-6 md:p-8 scanlines">
      {/* Scan line animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-30" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Hexagon className="w-10 h-10" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              ACCOUNTS RECEIVABLE HUB
            </h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mt-1">
              COLLECTIONS CENTER v2.1 — FISCAL Q4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="text-success">$847,320 COLLECTED MTD</span>
          </span>
          <span className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-success" />
            <span className="text-success">SYNCED</span>
          </span>
          <span className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-primary animate-pulse-glow" />
            <span>MONITORING</span>
          </span>
        </div>
      </div>
    </div>
  );
}
