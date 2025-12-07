import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Newspaper, 
  Settings, 
  LogOut 
} from "lucide-react";

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-[var(--forest-green)]">GIS Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            to="/control"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/control")
                ? "bg-[var(--forest-green)] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/control/events"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/control/events")
                ? "bg-[var(--forest-green)] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className="font-medium">Events</span>
          </Link>

          <Link
            to="/control/news"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive("/control/news")
                ? "bg-[var(--forest-green)] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-medium">News</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
             <span className="font-medium text-gray-900">
              {location.pathname === "/control" && "Dashboard / Overview"}
              {location.pathname === "/control/events" && "Resources / Events"}
              {location.pathname === "/control/news" && "Resources / News"}
             </span>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
