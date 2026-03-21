import { HudHeader } from "@/components/HudHeader";
import { StatsPanel } from "@/components/StatsPanel";
import { NotificationFeed } from "@/components/NotificationFeed";
import { ActivityLog } from "@/components/ActivityLog";
import { AgingChart } from "@/components/AgingChart";
import { TopDebtors } from "@/components/TopDebtors";
import { HubNav } from "@/components/HubNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background ar-grid">
      <div className="container max-w-6xl mx-auto py-6 px-4 space-y-6">
        <HubNav />
        <HudHeader />
        <StatsPanel />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AgingChart />
          <TopDebtors />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <NotificationFeed />
          </div>
          <div>
            <ActivityLog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
