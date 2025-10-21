import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { Calendar, MapPin, Users, Image as ImageIcon, Award, Trophy, Search, Filter, X } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PreviousEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const eventsPerPage = 10;

  const allEvents = [];

  // Get unique event types for filter
  const eventTypes = useMemo(() => {
    const types = allEvents.map(event => event.type);
    return ["all", ...Array.from(new Set(types))];
  }, []);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(event => event.type === filterType);
    }

    // Apply search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterType]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterType("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || filterType !== "all";

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--forest-green)] via-[var(--olive-green)] to-[var(--forest-green)] text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl mb-6"
          >
            Previous Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/90"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </motion.p>
        </div>
      </section>

      {/* Events List - Calendar Style Layout with Enhanced Background */}
      <section className="py-20 bg-gradient-to-br from-[#fef9f3] via-[#ffffff] to-[#f0f9f4] relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-[550px] h-[550px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201, 169, 97, 0.1) 0%, rgba(201, 169, 97, 0.04) 50%, transparent 70%)",
            }}
            animate={{ 
              x: [0, -60, 0],
              y: [0, 70, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(45, 80, 22, 0.09) 0%, rgba(45, 80, 22, 0.03) 50%, transparent 70%)",
            }}
            animate={{ 
              x: [0, 75, 0],
              y: [0, -65, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-40 left-32 w-24 h-24 border-2 border-[var(--gold)]/20 rounded-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-32 right-40 w-28 h-28 border-2 border-[var(--forest-green)]/15"
            style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
            animate={{ 
              rotate: [0, -360],
              borderRadius: [
                "40% 60% 70% 30% / 40% 50% 60% 50%",
                "60% 40% 30% 70% / 50% 60% 40% 60%",
                "40% 60% 70% 30% / 40% 50% 60% 50%",
              ],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating trophy and award icons */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 25}%`,
              }}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 20, -20, 0],
                opacity: [0.06, 0.15, 0.06],
              }}
              transition={{ 
                duration: 6 + (i % 3),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {i % 2 === 0 ? (
                <Trophy className="w-12 h-12 text-[var(--gold)]" />
              ) : (
                <Award className="w-10 h-10 text-[var(--forest-green)]" />
              )}
            </motion.div>
          ))}

          {/* Floating stars */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <motion.div
                className="w-3 h-3 bg-[var(--gold)]"
                style={{
                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ 
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            </motion.div>
          ))}

          {/* Batik pattern overlay */}
          <div className="absolute inset-0 batik-pattern opacity-5" />

          {/* SVG Decorative Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-8">
            <motion.path
              d="M 150 200 Q 450 300 750 200 T 1350 200"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 100 450 Q 400 550 700 450 T 1300 450"
              stroke="var(--forest-green)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Search and Filter Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search events by title, description, or location..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-6 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="w-full lg:w-64">
                  <Select value={filterType} onValueChange={(value) => {
                    setFilterType(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-[var(--gold)] focus:ring-[var(--gold)]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Event Type</SelectLabel>
                        {eventTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type === "all" ? "All Events" : type}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Filters Button */}
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleResetFilters}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <X className="w-4 h-4" />
                    Reset
                  </motion.button>
                )}
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {searchQuery && (
                    <Badge className="bg-[var(--gold)]/10 text-[var(--bronze)] border-0 px-3 py-1">
                      Search: "{searchQuery}"
                    </Badge>
                  )}
                  {filterType !== "all" && (
                    <Badge className="bg-[var(--gold)]/10 text-[var(--bronze)] border-0 px-3 py-1">
                      Type: {filterType}
                    </Badge>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Events Count */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-[var(--gold)]/10 text-[var(--bronze)] border-0 px-4 py-2">
              {filteredEvents.length > 0 ? (
                <>Showing {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, filteredEvents.length)} of {filteredEvents.length} events</>
              ) : (
                <>No events found</>
              )}
            </Badge>
          </motion.div>

          {/* No Results Message */}
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-lg mx-auto shadow-xl border border-white/50">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl text-gray-800 mb-2">No Events Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <motion.button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-[var(--bronze)] to-[var(--gold)] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {currentEvents.map((event, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Date Section - Left */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[var(--bronze)] to-[var(--gold)] text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                      <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-sm uppercase tracking-wider mb-2 opacity-90">
                          {event.month}
                        </div>
                        <div className="text-6xl mb-2">{event.day}</div>
                        <div className="h-px w-12 bg-white/30 mx-auto mb-2" />
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          {event.type}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Event Details - Middle */}
                    <div className="lg:col-span-6 p-8">
                      <motion.h3 
                        className="text-2xl md:text-3xl text-[var(--forest-green)] mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        {event.title}
                      </motion.h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-start text-gray-700">
                          <Calendar className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <Users className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.participants}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        {event.description}
                      </p>
                    </div>

                    {/* Event Poster - Right */}
                    <div className="lg:col-span-4 relative overflow-hidden bg-gray-50">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ImageWithFallback
                          src={event.poster}
                          alt={`${event.title} Poster`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
                      
                      {/* "Poster" watermark overlay */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-[var(--bronze)] text-white border-0 shadow-lg">
                          Event Poster
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Pagination>
                <PaginationContent className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg px-2 py-2">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-[var(--gold)]/10'}`}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                        className={`cursor-pointer ${
                          currentPage === index + 1
                            ? 'bg-[var(--gold)] text-white'
                            : 'hover:bg-[var(--gold)]/10'
                        }`}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-[var(--gold)]/10'}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
