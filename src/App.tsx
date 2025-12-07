import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Home } from "./pages/Home";
import { AboutGIS } from "./pages/AboutGIS";
import { VisionMission } from "./pages/VisionMission";
import { Structure } from "./pages/Structure";
import { FounderMembers } from "./pages/FounderMembers";
import { UpcomingEvents } from "./pages/UpcomingEvents";
import { PreviousEvents } from "./pages/PreviousEvents";
// We'll update these pages to use real data later
import { News } from "./pages/News";
import { NewsDetail } from "./pages/NewsDetail";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

// Admin Placeholders (will be created next)
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminEvents } from "./pages/admin/AdminEvents";
import { AdminNews } from "./pages/admin/AdminNews";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { useNavigate } from "react-router-dom";

const PageWrapper = ({ Component }: { Component: any }) => {
  const navigate = useNavigate();
  const handleNavigate = (page: string, data?: any) => {
    if (page === "home") navigate("/");
    else if (page === "news-detail") navigate(`/news/${data?.id}`, { state: { article: data } });
    else navigate(`/${page}`);
  };

  return <Component onNavigate={handleNavigate} />;
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageWrapper Component={Home} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about-gis" element={<AboutGIS />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/founder-members" element={<FounderMembers />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/previous-events" element={<PreviousEvents />} />
          <Route path="/news" element={<PageWrapper Component={News} />} />
          <Route path="/news/:id" element={<PageWrapper Component={NewsDetail} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/control" element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="news" element={<AdminNews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
