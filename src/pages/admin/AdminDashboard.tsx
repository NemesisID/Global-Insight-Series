import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Events Stat Widget */}
        <div className="bg-white p-6 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-gray-200 hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide">Total Events</h3>
            <span className="p-2 bg-green-50 text-green-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.eventsCount}</p>
            <div className="flex items-center mt-1 text-sm text-green-600 font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <span>{stats.upcomingEventsCount > 0 ? `${stats.upcomingEventsCount} upcoming` : 'No upcoming'}</span>
            </div>
          </div>
        </div>
        
        {/* News Stat Widget */}
        <div className="bg-white p-6 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-gray-200 hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide">News Articles</h3>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8"/></svg>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.newsCount}</p>
            <div className="flex items-center mt-1 text-sm text-blue-600 font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              <span>{stats.recentNewsCount > 0 ? `${stats.recentNewsCount} this week` : 'No new articles'}</span>
            </div>
          </div>
        </div>

        {/* System Status Widget */}
        <div className="bg-white p-6 rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-gray-200 hover:border-gray-300 transition-all">
           <div className="flex items-center justify-between">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide">System Status</h3>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{stats.systemStatus}</p>
             <div className="flex items-center mt-1 text-sm text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span>Running v{stats.version}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
