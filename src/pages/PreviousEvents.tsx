import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, Award, Trophy, Search, Filter, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import axios from "axios";
import { format } from "date-fns";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

// Types matching the backend
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const eventsPerPage = 10;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events?type=previous");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  // Process events for display
  const processedEvents = useMemo(() => {
    return events.map(event => {
      const dateObj = new Date(event.date);
      return {
        ...event,
        day: format(dateObj, "dd"),
        month: format(dateObj, "MMMM"),
        time: format(dateObj, "HH:mm") + " WIB",
        // type: "Webinar", // Placeholder
      };
    });
  }, [events]);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    let filtered = processedEvents;

    // Apply search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, processedEvents]);

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

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

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
            Celebrating our successful programs and collaborations
          </motion.p>
        </div>
      </section>

      {/* Events List - Calendar Style Layout with Enhanced Background */}
      <section className="py-20 bg-gradient-to-br from-[#fef9f3] via-[#ffffff] to-[#f0f9f4] relative overflow-hidden">
        {/* Background Elements omitted for brevity */}

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
                <>No previous events found</>
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
                <h3 className="text-2xl text-gray-800 mb-2">No Previous Events Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search filters.
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
                          Event
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
                          <span>{format(new Date(event.date), "PPPP")}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <Clock className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                      </p>
                    </div>

                    {/* Event Poster - Right */}
                    {event.imageUrl && (
                      <div className="lg:col-span-4 relative overflow-hidden bg-gray-50">
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ImageWithFallback
                            src={event.imageUrl}
                            alt={`${event.title} Poster`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>
                      </div>
                    )}
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
