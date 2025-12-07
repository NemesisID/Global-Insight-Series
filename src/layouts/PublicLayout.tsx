import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

export function PublicLayout() {
  const location = useLocation();
  // Extract the current page from the path for Navigation highlighting
  const currentPage = location.pathname === "/" ? "home" : location.pathname.substring(1);

  // Helper to handle navigation (mostly for backward compatibility if we keep onNavigate prop)
  // But ideally Navigation should use Link. For now we can pass a dummy or wrapper.
  // Actually, we should refactor Navigation to use Link, but to save time/risk, 
  // we can pass a function that uses window.location or navigate() 
  // but better to just fix Navigation. 
  
  // Let's assume we will refactor Navigation to use pure Links or useNavigate.
  // Converting the prop-based navigation to Router based:
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationWrapper currentPage={currentPage} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterWrapper />
    </div>
  );
}

// Wrapper to adapt Navigation to Router
import { useNavigate } from "react-router-dom";

function NavigationWrapper({ currentPage }: { currentPage: string }) {
  const navigate = useNavigate();
  return (
    <Navigation 
      currentPage={currentPage} 
      onNavigate={(page) => {
        if (page === "home") navigate("/");
        else navigate(`/${page}`);
      }} 
    />
  );
}

function FooterWrapper() {
  const navigate = useNavigate();
  return (
    <Footer 
      onNavigate={(page) => {
        if (page === "home") navigate("/");
        else navigate(`/${page}`);
      }} 
    />
  );
}
