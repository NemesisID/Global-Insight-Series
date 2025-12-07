import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutLinks = [
    { label: "About GIS", page: "about-gis" },
    { label: "Vision & Mission", page: "vision-mission" },
    { label: "Members", page: "founder-members" },
  ];

  const eventLinks = [
    { label: "Upcoming Events", page: "upcoming-events" },
    { label: "Previous Events", page: "previous-events" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            onClick={() => onNavigate("home")}
            className="flex items-center cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-12 h-12 from-[var(--forest-green)] to-[var(--olive-green)] rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-shadow"
              transition={{ duration: 0.6 }}
            >
              <span>
                <img src="/assets/logo.png" alt="GIS Logo" />
              </span>
            </motion.div>
            <div>
              <div className="text-[var(--forest-green)] group-hover:text-[var(--olive-green)] transition-colors">Global Insight Series</div>
              <div className="text-xs text-gray-600">UPN Veteran Jawa Timur</div>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate("home")}
              className={`transition-colors ${
                currentPage === "home" ? "text-[var(--forest-green)]" : "text-gray-700 hover:text-[var(--forest-green)]"
              }`}
            >
              Home
            </button>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-[var(--forest-green)] transition-colors">
                About Us <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  >
                    {aboutLinks.map((link) => (
                      <button
                        key={link.page}
                        onClick={() => {
                          onNavigate(link.page);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[var(--cream)] hover:text-[var(--forest-green)] transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("events")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center text-gray-700 hover:text-[var(--forest-green)] transition-colors">
                Events <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <AnimatePresence>
                {openDropdown === "events" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                  >
                    {eventLinks.map((link) => (
                      <button
                        key={link.page}
                        onClick={() => {
                          onNavigate(link.page);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[var(--cream)] hover:text-[var(--forest-green)] transition-colors"
                      >
                        {link.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => onNavigate("news")}
              className={`transition-colors ${
                currentPage === "news" ? "text-[var(--forest-green)]" : "text-gray-700 hover:text-[var(--forest-green)]"
              }`}
            >
              News
            </button>

            <motion.button
              onClick={() => onNavigate("contact")}
              className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.1 }}
              />
              <span className="relative z-10">Contact Us</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  onNavigate("home");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700"
              >
                Home
              </button>
              <div>
                <div className="text-gray-700 mb-2">About Us</div>
                <div className="pl-4 space-y-2">
                  {aboutLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => {
                        onNavigate(link.page);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 text-sm"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-700 mb-2">Events</div>
                <div className="pl-4 space-y-2">
                  {eventLinks.map((link) => (
                    <button
                      key={link.page}
                      onClick={() => {
                        onNavigate(link.page);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-600 text-sm"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate("news");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700"
              >
                News
              </button>
              <button
                onClick={() => {
                  onNavigate("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-700"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
