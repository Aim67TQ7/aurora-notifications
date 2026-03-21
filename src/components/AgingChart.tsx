import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const agingData = [
  { bucket: "0-30", amount: 342000, label: "Current", color: "hsl(185, 85%, 50%)" },
  { bucket: "31-60", amount: 198000, label: "31-60 Days", color: "hsl(185, 85%, 40%)" },
  { bucket: "61-90", amount: 127000, label: "61-90 Days", color: "hsl(45, 90%, 55%)" },
  { bucket: "90+", amount: 187000, label: "90+ Days", color: "hsl(0, 75%, 55%)" },
];

const formatCurrency = (value: number) =>
  `$${(value / 1000).toFixed(0)}K`;

export function AgingChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="rounded-lg bg-card/40 backdrop-blur-sm glow-border p-5"
    >
      <h2 className="font-mono text-xs tracking-widest text-muted-foreground mb-4">AGING REPORT</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agingData} barCategoryGap="20%">
            <XAxis
              dataKey="bucket"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(200, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              tick={{ fill: "hsl(200, 15%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }}
              width={50}
            />
            <Tooltip
              cursor={{ fill: "hsl(185, 85%, 50%, 0.05)" }}
              contentStyle={{
                background: "hsl(220, 20%, 10%)",
                border: "1px solid hsl(185, 40%, 20%)",
                borderRadius: "8px",
                fontFamily: "JetBrains Mono",
                fontSize: "11px",
                boxShadow: "0 0 20px hsl(185, 85%, 50%, 0.2)",
              }}
              labelStyle={{ color: "hsl(185, 80%, 85%)" }}
              formatter={(value: number) => [formatCurrency(value), "Outstanding"]}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {agingData.map((entry, index) => (
                <Cell key={index} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-3 font-mono text-[10px] text-muted-foreground tracking-wider">
        <span>TOTAL OUTSTANDING: <span className="text-primary font-bold">$854K</span></span>
        <span>DSO: <span className="text-accent font-bold">47 DAYS</span></span>
      </div>
    </motion.div>
  );
}
