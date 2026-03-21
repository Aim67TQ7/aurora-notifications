import { HudHeader } from "@/components/ap/ApHudHeader";
import { ApStatsPanel } from "@/components/ap/ApStatsPanel";
import { ApNotificationFeed } from "@/components/ap/ApNotificationFeed";
import { ApActivityLog } from "@/components/ap/ApActivityLog";
import { ApAgingChart } from "@/components/ap/ApAgingChart";
import { TopVendors } from "@/components/ap/TopVendors";

const AccountsPayable = () => {
  return (
    <div className="min-h-screen bg-background ar-grid">
      <div className="container max-w-6xl mx-auto py-6 px-4 space-y-6">
        <HudHeader />
        <ApStatsPanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApAgingChart />
          <TopVendors />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ApNotificationFeed />
          </div>
          <div>
            <ApActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayable;
