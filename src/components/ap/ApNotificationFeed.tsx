import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CreditCard, MessageSquare, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

type NotificationType = "overdue" | "scheduled" | "dispute" | "paid";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  amount: string;
  time: string;
  vendor: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "overdue", title: "BILL-7821 Overdue — 14 Days", description: "Meridian Supplies — Net 30 terms expired. Late fee accruing at 1.5%/mo.", amount: "$22,400", time: "5m ago", vendor: "MRD-012", read: false },
  { id: "2", type: "scheduled", title: "Batch Payment Scheduled", description: "17 vendor payments totaling $198,400 queued for Friday disbursement.", amount: "$198,400", time: "22m ago", vendor: "BATCH-44", read: false },
  { id: "3", type: "paid", title: "ACH Transfer Complete — LogiCore", description: "Payment for BILL-7790 processed. Early pay discount of 2% applied.", amount: "$45,200", time: "38m ago", vendor: "LGC-008", read: true },
  { id: "4", type: "dispute", title: "Invoice Discrepancy — Atlas MFG", description: "PO quantity mismatch on line items 2, 5. Variance of $3,200. Vendor notified.", amount: "$31,800", time: "1h ago", vendor: "ATL-027", read: false },
  { id: "5", type: "overdue", title: "BILL-7756 Past Due — 31 Days", description: "ClearView IT — Recurring SaaS license. Auto-pay failed, card expired.", amount: "$8,900", time: "1h ago", vendor: "CLV-041", read: false },
  { id: "6", type: "paid", title: "Wire Sent — Apex Raw Materials", description: "Urgent payment for Q4 materials order. Reference: WR-20241201.", amount: "$124,000", time: "2h ago", vendor: "APX-003", read: true },
  { id: "7", type: "scheduled", title: "Early Pay Discount Expiring", description: "TitanWorks — 2/10 Net 30 discount expires tomorrow. Save $1,640.", amount: "$82,000", time: "2h ago", vendor: "TTN-016", read: false },
  { id: "8", type: "paid", title: "Recurring Payment Processed", description: "Monthly lease payment to Cornerstone Properties. Auto-debit confirmed.", amount: "$18,500", time: "3h ago", vendor: "CNR-009", read: true },
];

const typeConfig = {
  overdue: { icon: AlertTriangle, color: "text-destructive", glow: "glow-border-destructive", dot: "bg-destructive" },
  scheduled: { icon: CreditCard, color: "text-primary", glow: "glow-border", dot: "bg-primary" },
  dispute: { icon: MessageSquare, color: "text-accent", glow: "glow-border-accent", dot: "bg-accent" },
  paid: { icon: CheckCircle, color: "text-success", glow: "glow-border-success", dot: "bg-success" },
};

const filters: { label: string; value: NotificationType | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "OVERDUE", value: "overdue" },
  { label: "SCHEDULED", value: "scheduled" },
  { label: "DISPUTES", value: "dispute" },
  { label: "PAID", value: "paid" },
];

export function ApNotificationFeed() {
  const [activeFilter, setActiveFilter] = useState<NotificationType | "all">("all");

  const filtered = activeFilter === "all" ? notifications : notifications.filter(n => n.type === activeFilter);

  return (
    <div className="space-y-4">
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
                      <span className="opacity-60">[{notif.vendor}]</span>
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
