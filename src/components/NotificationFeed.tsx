import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Bell, Info, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

type NotificationType = "alert" | "update" | "message" | "success";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  source: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "alert", title: "Perimeter Breach Detected", description: "Anomalous activity in sector 7-G. Automated countermeasures engaged.", time: "2m ago", source: "SEC-GRID", read: false },
  { id: "2", type: "alert", title: "System Overload Warning", description: "Core processor at 94% capacity. Recommend load redistribution.", time: "8m ago", source: "SYS-MON", read: false },
  { id: "3", type: "update", title: "Firmware Update Available", description: "AR-Core v4.2.1 ready for deployment across all nodes.", time: "15m ago", source: "UPD-SVC", read: false },
  { id: "4", type: "success", title: "Scan Complete", description: "Network integrity verified. No vulnerabilities detected.", time: "23m ago", source: "NET-SCAN", read: true },
  { id: "5", type: "message", title: "Incoming Transmission", description: "Priority message from Command. Authentication required.", time: "31m ago", source: "COMM-CH", read: false },
  { id: "6", type: "update", title: "Drone Fleet Sync", description: "12 units synchronized. Formation pattern Delta-7 confirmed.", time: "45m ago", source: "DRN-CTL", read: true },
  { id: "7", type: "alert", title: "Thermal Spike in Module B", description: "Temperature exceeding threshold. Cooling protocol initiated.", time: "1h ago", source: "ENV-MON", read: true },
  { id: "8", type: "success", title: "Backup Complete", description: "Full system snapshot archived. Integrity hash verified.", time: "1h ago", source: "BKP-SYS", read: true },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: "text-destructive", glow: "glow-border-destructive", dot: "bg-destructive" },
  update: { icon: Info, color: "text-primary", glow: "glow-border", dot: "bg-primary" },
  message: { icon: Bell, color: "text-accent", glow: "glow-border-accent", dot: "bg-accent" },
  success: { icon: CheckCircle, color: "text-success", glow: "glow-border-success", dot: "bg-success" },
};

const filters: { label: string; value: NotificationType | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "ALERTS", value: "alert" },
  { label: "UPDATES", value: "update" },
  { label: "MESSAGES", value: "message" },
  { label: "RESOLVED", value: "success" },
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
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{notif.time}</span>
                      <span className={`${config.color} opacity-60`}>[{notif.source}]</span>
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
