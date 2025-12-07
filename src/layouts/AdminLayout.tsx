import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Newspaper, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-950/5">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-950/5">
            <Link to="/control" className="flex items-center gap-3">
                <span className="font-bold text-gray-950 tracking-tight text-lg">
                    Dashboard Admin
                </span>
            </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {/* Group: Overview */}
            <div>
                <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Overview
                </div>
                <div className="space-y-1">
                    <Link
                        to="/control"
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive("/control")
                            ? "bg-[var(--forest-green)]/10 text-[var(--forest-green)]"
                            : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                        }`}
                    >
                        <LayoutDashboard className={`w-5 h-5 ${isActive("/control") ? "text-[var(--forest-green)]" : "text-gray-400 group-hover:text-gray-500"}`} />
                        <span>Dashboard</span>
                    </Link>
                </div>
            </div>

            {/* Group: Resources */}
            <div>
                <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Resources
                </div>
                <div className="space-y-1">
                    <Link
                        to="/control/events"
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive("/control/events")
                            ? "bg-[var(--forest-green)]/10 text-[var(--forest-green)]"
                            : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                        }`}
                    >
                        <CalendarDays className={`w-5 h-5 ${isActive("/control/events") ? "text-[var(--forest-green)]" : "text-gray-400 group-hover:text-gray-500"}`} />
                        <span>Events</span>
                    </Link>

                    <Link
                        to="/control/news"
                        onClick={() => setSidebarOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive("/control/news")
                            ? "bg-[var(--forest-green)]/10 text-[var(--forest-green)]"
                            : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                        }`}
                    >
                        <Newspaper className={`w-5 h-5 ${isActive("/control/news") ? "text-[var(--forest-green)]" : "text-gray-400 group-hover:text-gray-500"}`} />
                        <span>News</span>
                    </Link>
                </div>
            </div>
        </nav>

        {/* Logout Section (Bottom) */}
        <div className="p-4 border-t border-gray-950/5">
            <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
            >
                <LogOut className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Sign Out</span>
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-950 antialiased flex">
        {/* Mobile Backdrop & Drawer */}
        <div className={`relative z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
            <div className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                 <SidebarContent />
                 <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                    <X className="w-6 h-6" />
                 </button>
            </div>
        </div>

        {/* Desktop Sidebar (Fixed) */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-[17rem] z-40">
            <SidebarContent />
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 lg:pl-[17rem] flex flex-col min-h-screen">
            {/* Topbar */}
            <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-xl border-b border-gray-950/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500 font-medium">Menu</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-950 font-semibold tracking-wide">
                            {location.pathname === "/control" && "Dashboard"}
                            {location.pathname === "/control/events" && "Events"}
                            {location.pathname === "/control/news" && "News"}
                        </span>
                    </div>
                </div>
                {/* Global Actions (Placeholder) */}
                <div className="flex items-center gap-4">
                    <a href="/" target="_blank" className="text-sm font-medium text-gray-500 hover:text-[var(--forest-green)] transition-colors">
                        View Site
                    </a>
                </div>
            </header>

            {/* Content Body */}
            <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    </div>
  );
}
