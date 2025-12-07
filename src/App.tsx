import { useState, useEffect } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setSelectedArticle(data);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "about-gis":
        return <AboutGIS />;
      case "vision-mission":
        return <VisionMission />;
      case "structure":
        return <Structure />;
      case "founder-members":
        return <FounderMembers />;
      case "upcoming-events":
        return <UpcomingEvents />;
      case "previous-events":
        return <PreviousEvents />;
      case "news":
        return <News onNavigate={handleNavigate} />;
      case "news-detail":
        return selectedArticle ? (
          <NewsDetail onNavigate={handleNavigate} article={selectedArticle} />
        ) : (
          <News onNavigate={handleNavigate} />
        );
      case "contact":
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
