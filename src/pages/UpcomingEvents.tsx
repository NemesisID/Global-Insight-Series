import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
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
  const eventsPerPage = 10;

  const allEvents = [
    {
      title: "International Research Symposium 2025",
      date: "November 15-17, 2025",
      day: "15",
      month: "NOV",
      time: "09:00 - 17:00 WIB",
      location: "UPN Veteran Jawa Timur, Surabaya",
      type: "Conference",
      participants: "200+ Expected",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
      poster: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    // {
    //   title: "Global Leadership in Education Webinar Series",
    //   date: "November 22, 2025",
    //   day: "22",
    //   month: "NOV",
    //   time: "14:00 - 16:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Webinar",
    //   participants: "500+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Southeast Asian Universities Collaboration Forum",
    //   date: "December 5-6, 2025",
    //   day: "05",
    //   month: "DEC",
    //   time: "09:00 - 17:00 WIB",
    //   location: "Hybrid (Surabaya & Online)",
    //   type: "Forum",
    //   participants: "150+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Innovation in Teaching and Learning Workshop",
    //   date: "December 12-13, 2025",
    //   day: "12",
    //   month: "DEC",
    //   time: "13:00 - 17:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Workshop",
    //   participants: "100+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Student Global Summit 2026",
    //   date: "January 20-22, 2026",
    //   day: "20",
    //   month: "JAN",
    //   time: "09:00 - 17:00 WIB",
    //   location: "UPN Veteran Jawa Timur, Surabaya",
    //   type: "Summit",
    //   participants: "300+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "International Faculty Exchange Program Orientation",
    //   date: "February 10, 2026",
    //   day: "10",
    //   month: "FEB",
    //   time: "10:00 - 12:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Orientation",
    //   participants: "50+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Academic Writing and Publication Workshop",
    //   date: "February 25-26, 2026",
    //   day: "25",
    //   month: "FEB",
    //   time: "09:00 - 16:00 WIB",
    //   location: "Hybrid (Surabaya & Online)",
    //   type: "Workshop",
    //   participants: "80+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Cross-Cultural Communication Seminar",
    //   date: "March 8, 2026",
    //   day: "08",
    //   month: "MAR",
    //   time: "13:00 - 17:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Seminar",
    //   participants: "200+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Research Grant Application Bootcamp",
    //   date: "March 15-17, 2026",
    //   day: "15",
    //   month: "MAR",
    //   time: "09:00 - 17:00 WIB",
    //   location: "UPN Veteran Jawa Timur, Surabaya",
    //   type: "Bootcamp",
    //   participants: "60+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Virtual International Campus Tour",
    //   date: "March 28, 2026",
    //   day: "28",
    //   month: "MAR",
    //   time: "10:00 - 12:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Virtual Tour",
    //   participants: "300+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "AI in Higher Education Conference",
    //   date: "April 5-7, 2026",
    //   day: "05",
    //   month: "APR",
    //   time: "09:00 - 17:00 WIB",
    //   location: "Hybrid (Singapore & Online)",
    //   type: "Conference",
    //   participants: "400+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "International Student Mobility Fair",
    //   date: "April 18-19, 2026",
    //   day: "18",
    //   month: "APR",
    //   time: "10:00 - 16:00 WIB",
    //   location: "UPN Veteran Jawa Timur, Surabaya",
    //   type: "Fair",
    //   participants: "500+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Green Campus Initiative Summit",
    //   date: "May 2-3, 2026",
    //   day: "02",
    //   month: "MAY",
    //   time: "09:00 - 17:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Summit",
    //   participants: "250+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "Data Science in Social Sciences Workshop",
    //   date: "May 16, 2026",
    //   day: "16",
    //   month: "MAY",
    //   time: "13:00 - 17:00 WIB",
    //   location: "Online via Zoom",
    //   type: "Workshop",
    //   participants: "120+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
    // {
    //   title: "International Alumni Networking Event",
    //   date: "May 30, 2026",
    //   day: "30",
    //   month: "MAY",
    //   time: "18:00 - 21:00 WIB",
    //   location: "Hybrid (Surabaya & Online)",
    //   type: "Networking",
    //   participants: "200+ Expected",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla natus dolore qui? Maxime nulla explicabo, beatae tenetur aut culpa error. Temporibus quos, quod, enim iure dolore quae hic vero cum dolores natus recusandae a molestias ab nisi cupiditate quaerat assumenda.",
    //   poster: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    // },
  ];

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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
                <h3 className="text-2xl text-gray-800 mb-2">No Events Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
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
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-start text-gray-700">
                          <Clock className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-[var(--forest-green)]" />
                          <span>{event.time}</span>
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

                      <motion.button
                        className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Register Now
                        <Sparkles className="w-4 h-4 ml-2" />
                      </motion.button>
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
                        <Badge className="bg-[var(--gold)] text-white border-0 shadow-lg">
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
