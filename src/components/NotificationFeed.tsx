import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, DollarSign, MessageSquare, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

type NotificationType = "past_due" | "payment" | "dispute" | "collected";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  amount: string;
  time: string;
  account: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "past_due", title: "INV-4021 Past Due 90+ Days", description: "Acme Corp — Original due date Sep 15. Three reminder emails sent, no response.", amount: "$34,200", time: "2m ago", account: "ACME-001", read: false },
  { id: "2", type: "past_due", title: "INV-3987 Payment Overdue", description: "TechFlow Inc — 67 days past due. Payment plan discussion requested.", amount: "$18,750", time: "15m ago", account: "TECH-042", read: false },
  { id: "3", type: "payment", title: "Payment Received — GlobalTech", description: "Partial payment applied to INV-3901. Remaining balance: $12,400.", amount: "$25,000", time: "28m ago", account: "GLBT-018", read: false },
  { id: "4", type: "collected", title: "INV-3845 Fully Paid", description: "Nexus Systems — Invoice settled in full. Account in good standing.", amount: "$8,900", time: "45m ago", account: "NXS-007", read: true },
  { id: "5", type: "dispute", title: "Dispute Filed — Orion LLC", description: "Customer claims service not delivered for line items 3-5. Review required.", amount: "$15,300", time: "1h ago", account: "ORI-033", read: false },
  { id: "6", type: "payment", title: "Wire Transfer Confirmed", description: "Pinnacle Group — Full payment via wire. 2-day processing.", amount: "$67,500", time: "1h ago", account: "PNG-011", read: true },
  { id: "7", type: "past_due", title: "INV-3756 Escalated to Collections", description: "DataVault — 120+ days outstanding. Auto-escalated per policy.", amount: "$42,100", time: "2h ago", account: "DVT-055", read: true },
  { id: "8", type: "collected", title: "Payment Plan Complete", description: "Sterling Media — Final installment received. 6-month plan fulfilled.", amount: "$31,200", time: "3h ago", account: "STM-029", read: true },
];

const typeConfig = {
  past_due: { icon: AlertTriangle, color: "text-destructive", glow: "glow-border-destructive", dot: "bg-destructive" },
  payment: { icon: DollarSign, color: "text-primary", glow: "glow-border", dot: "bg-primary" },
  dispute: { icon: MessageSquare, color: "text-accent", glow: "glow-border-accent", dot: "bg-accent" },
  collected: { icon: CheckCircle, color: "text-success", glow: "glow-border-success", dot: "bg-success" },
};

const filters: { label: string; value: NotificationType | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "PAST DUE", value: "past_due" },
  { label: "PAYMENTS", value: "payment" },
  { label: "DISPUTES", value: "dispute" },
  { label: "COLLECTED", value: "collected" },
];

export function NotificationFeed() {
  const [activeFilter, setActiveFilter] = useState<NotificationType | "all">("all");

  const filtered = activeFilter === "all" ? notifications : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-md font-mono text-xs tracking-widest transition-all whitespace-nowrap ${
              activeFilter === f.value
                ? "bg-primary/20 text-primary glow-border"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((notif, i) => {
            const config = typeConfig[notif.type];
            const Icon = config.icon;
            return (
              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={`relative group rounded-lg bg-card/40 backdrop-blur-sm p-4 cursor-pointer transition-all hover:bg-card/70 ${
                  !notif.read ? config.glow : "border border-border/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 ${config.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-foreground text-sm truncate">{notif.title}</h3>
                      {!notif.read && <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse-glow`} />}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-2">{notif.description}</p>
                    <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider text-muted-foreground">
                      <span className={`${config.color} font-bold text-xs`}>{notif.amount}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{notif.time}</span>
                      <span className="opacity-60">[{notif.account}]</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
