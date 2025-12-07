import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Newspaper,
  ArrowUpRight
} from "lucide-react";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    upcomingEventsCount: 0,
    newsCount: 0,
    recentNewsCount: 0,
    systemStatus: "Active",
    version: "1.0.0"
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load stats", error);
        toast.error("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">
          Dashboard
        </h1>
      </div>

      {/* Filament-style Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {/* Events Stat */}
        <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-950/5">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--forest-green)]/10 text-[var(--forest-green)]">
                    <Calendar className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm font-medium text-gray-500">Total Events</p>
                   <p className="text-3xl font-semibold text-gray-950 mt-1">{stats.eventsCount}</p>
                </div>
            </div>
            {/* Footer / Trend Area */}
            <div className="mt-4 pt-4 border-t border-gray-950/5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>{stats.upcomingEventsCount} Upcoming</span>
                </div>
                <span className="text-gray-400">Active</span>
            </div>
        </div>

        {/* News Stat */}
        <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-950/5">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--forest-green)]/10 text-[var(--forest-green)]">
                    <Newspaper className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm font-medium text-gray-500">News Articles</p>
                   <p className="text-3xl font-semibold text-gray-950 mt-1">{stats.newsCount}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-950/5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stats.recentNewsCount} New this week</span>
                </div>
                <span className="text-gray-400">Published</span>
            </div>
        </div>

        {/* System Stat */}
        <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-950/5">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[var(--forest-green)]/10 text-[var(--forest-green)]">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm font-medium text-gray-500">System Status</p>
                   <p className="text-3xl font-semibold text-gray-950 mt-1">{stats.systemStatus}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-950/5 flex items-center justify-between text-sm">
                 <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Operational</span>
                </div>
                <span className="text-gray-400">v{stats.version}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
