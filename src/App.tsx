import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AboutGIS } from "./pages/AboutGIS";
import { VisionMission } from "./pages/VisionMission";
import { Structure } from "./pages/Structure";
import { FounderMembers } from "./pages/FounderMembers";
import { UpcomingEvents } from "./pages/UpcomingEvents";
import { PreviousEvents } from "./pages/PreviousEvents";
import { News } from "./pages/News";
import { NewsDetail } from "./pages/NewsDetail";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminLayout } from "./pages/admin/AdminLayout";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-gis" element={<AboutGIS />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/founder-members" element={<FounderMembers />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/previous-events" element={<PreviousEvents />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/control" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route path="/control/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
