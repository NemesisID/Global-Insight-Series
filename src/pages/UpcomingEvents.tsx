import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Clock, Users, Sparkles, ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react";
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

export function UpcomingEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [events, setEvents] = useState<any[]>([]);
  const eventsPerPage = 10;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/events");
      const allEvents = res.data.map((e: any) => ({
        ...e,
        // Parse date for display
        month: new Date(e.date).toLocaleString('default', { month: 'long' }),
        day: new Date(e.date).getDate(),
      }));

      // Filter for UPCOMING events (date >= today)
      const upcoming = allEvents.filter((e: any) => new Date(e.date) >= new Date());
      setEvents(upcoming);
    } catch (error) {
      console.error("Failed to fetch events");
    }
  };

  const getEventTypes = () => {
     // If we add 'type' to backend schema later, we can dynamic this.
     // For now assume all are Webinars or parse from title/description if smart
     return ["all", "Webinar", "Workshop"]; 
  };
  const eventTypes = getEventTypes();

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let filtered = events;

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
  }, [searchQuery, filterType, events]);

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
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl mb-6"
          >
            Upcoming Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/90"
          >
            Join us in our upcoming international programs and activities
          </motion.p>
        </div>
      </section>

      {/* Events List - Calendar Style Layout with Enhanced Background */}
      <section className="py-20 bg-gradient-to-br from-[#e8f5e9] via-[#fefcf7] to-[#f5f1e8] relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(45, 80, 22, 0.08) 0%, rgba(45, 80, 22, 0.03) 50%, transparent 70%)",
            }}
            animate={{ 
              x: [0, 80, 0],
              y: [0, 60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-20 left-10 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201, 169, 97, 0.12) 0%, rgba(201, 169, 97, 0.05) 50%, transparent 70%)",
            }}
            animate={{ 
              x: [0, -70, 0],
              y: [0, -80, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Geometric shapes */}
          <motion.div
            className="absolute top-32 right-32 w-28 h-28 border-2 border-[var(--forest-green)]/15 rounded-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute bottom-40 left-24 w-20 h-20 border-2 border-[var(--gold)]/20"
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
            animate={{ 
              rotate: [0, -360],
              borderRadius: [
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "70% 30% 30% 70% / 70% 70% 30% 30%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
              ],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating calendar icons */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${15 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.05, 0.12, 0.05],
              }}
              transition={{ 
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <Calendar className="w-10 h-10 text-[var(--forest-green)]" />
            </motion.div>
          ))}

          {/* Floating sparkles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-[var(--gold)] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Batik pattern overlay */}
          <div className="absolute inset-0 batik-pattern opacity-5" />

          {/* SVG Decorative Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
              d="M 100 150 Q 400 250 700 150 T 1300 150"
              stroke="var(--forest-green)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 200 400 Q 500 500 800 400 T 1400 400"
              stroke="var(--gold)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
                    className="pl-10 pr-4 py-6 border-gray-200 focus:border-[var(--forest-green)] focus:ring-[var(--forest-green)]"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="w-full lg:w-64">
                  <Select value={filterType} onValueChange={(value) => {
                    setFilterType(value);
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-[var(--forest-green)] focus:ring-[var(--forest-green)]">
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
                    <Badge className="bg-[var(--forest-green)]/10 text-[var(--forest-green)] border-0 px-3 py-1">
                      Search: "{searchQuery}"
                    </Badge>
                  )}
                  {filterType !== "all" && (
                    <Badge className="bg-[var(--forest-green)]/10 text-[var(--forest-green)] border-0 px-3 py-1">
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
            <Badge className="bg-[var(--forest-green)]/10 text-[var(--forest-green)] border-0 px-4 py-2">
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
                <h3 className="text-2xl text-gray-800 mb-2">No Upcoming Events Found</h3>
                <p className="text-gray-600 mb-6">
                  Check back later for new events, or browse our previous events.
                </p>
                <motion.button
                  onClick={handleResetFilters}
                  className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
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
                    <div className="lg:col-span-2 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
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
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <Clock className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.location}</span>
                        </div>
                        {/* Participants removed as it's not in DB yet */}
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                      </p>

                      {event.registrationLink && (
                      <motion.a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Now  
                        <Sparkles className="w-4 h-4 ml-2" />
                      </motion.a>
                      )}
                    </div>

                    {/* Event Poster - Right */}
                    <div className="lg:col-span-4 relative overflow-hidden bg-gray-50">
                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {event.poster ? (
                        <ImageWithFallback
                          src={event.poster}
                          alt={`${event.title} Poster`}
                          className="w-full h-full object-cover"
                        />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            No Poster
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>
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
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-[var(--forest-green)]/10'}`}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                        className={`cursor-pointer ${
                          currentPage === index + 1
                            ? 'bg-[var(--forest-green)] text-white'
                            : 'hover:bg-[var(--forest-green)]/10'
                        }`}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer hover:bg-[var(--forest-green)]/10'}`}
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
