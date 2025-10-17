import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import { Newspaper, Calendar, Search, Filter, X, ArrowRight } from "lucide-react";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

interface NewsProps {
  onNavigate: (page: string, data?: any) => void;
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

export function News({ onNavigate }: NewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const newsPerPage = 20;

  const handleArticleClick = (article: any) => {
    onNavigate("news-detail", article);
  };

  const allNews = [
    {
      title: "GIS International Summit 2025 Successfully Concluded with Record Participation",
      date: "October 15, 2025",
      category: "Event Highlights",
      excerpt:
        "The annual GIS International Summit brought together over 500 participants from 30 countries, featuring keynote speeches from world-renowned educators and collaborative workshops on the future of higher education.",
      image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwNDk5NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "New Strategic Partnership with Leading Asian Universities Announced",
      date: "October 12, 2025",
      category: "Partnership",
      excerpt:
        "GIS expands its network by welcoming five prestigious universities from Japan, South Korea, and Singapore to strengthen regional academic collaboration and student mobility programs.",
      image: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA1MjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Breakthrough Research on Climate Change Published by GIS Consortium",
      date: "October 10, 2025",
      category: "Research Excellence",
      excerpt:
        "A collaborative research team from 12 GIS member universities publishes groundbreaking findings on sustainable urban development in leading international journal Nature Sustainability.",
      image: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Student Exchange Program Reaches 1000th Participant Milestone",
      date: "October 8, 2025",
      category: "Student Programs",
      excerpt:
        "GIS celebrates a significant milestone as the 1000th student completes their international exchange experience, showcasing the program's success in fostering global citizenship and cross-cultural understanding.",
      image: "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "International Virtual Conference on AI in Education Draws 800+ Attendees",
      date: "October 5, 2025",
      category: "Event Highlights",
      excerpt:
        "The latest GIS webinar series on Artificial Intelligence applications in higher education attracted record attendance, with participants exploring innovative teaching methods and learning analytics.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Faculty Development Workshop Series Launches Across Member Universities",
      date: "October 3, 2025",
      category: "Academic Programs",
      excerpt:
        "New professional development initiative empowers 200+ faculty members with innovative pedagogical approaches, assessment strategies, and digital teaching tools for 21st-century education.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "GIS Awarded International Excellence Recognition for Cross-Border Collaboration",
      date: "September 30, 2025",
      category: "Awards & Recognition",
      excerpt:
        "Global Insight Series receives prestigious UNESCO Award for Outstanding Contribution to International Academic Cooperation, recognizing five years of impactful initiatives and partnerships.",
      image: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Joint Research Grant Secured for Interdisciplinary Sustainability Studies",
      date: "September 28, 2025",
      category: "Research Excellence",
      excerpt:
        "Multi-university team wins $2.5 million research grant to investigate innovative solutions for sustainable development goals through collaborative interdisciplinary approaches.",
      image: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Digital Transformation Workshop Series Empowers University Administrators",
      date: "September 25, 2025",
      category: "Academic Programs",
      excerpt:
        "GIS launches comprehensive training program for university leaders on digital transformation strategies, covering data-driven decision making and technology integration in education management.",
      image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwNDk5NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "International Peer Review Journal Launched for Collaborative Research",
      date: "September 22, 2025",
      category: "Research Excellence",
      excerpt:
        "Member universities collaborate to establish new open-access academic journal focusing on cross-cultural studies, international education policy, and global academic partnerships.",
      image: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA1MjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Summer School Program Offers 50 Scholarships for Outstanding Students",
      date: "September 20, 2025",
      category: "Student Programs",
      excerpt:
        "Applications now open for GIS International Summer School 2026, featuring intensive courses, cultural immersion activities, and networking opportunities with fully-funded scholarships available.",
      image: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Cross-Cultural Leadership Training Program Graduates First Cohort",
      date: "September 18, 2025",
      category: "Academic Programs",
      excerpt:
        "Inaugural class of 45 future academic leaders completes intensive leadership development program, equipped with skills for managing international partnerships and diverse academic environments.",
      image: "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Memorandum of Understanding Signed with European University Alliance",
      date: "September 15, 2025",
      category: "Partnership",
      excerpt:
        "Strategic collaboration agreement establishes framework for joint degree programs, research initiatives, and faculty exchanges with consortium of 15 European institutions.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Virtual Campus Tour Platform Launched for Prospective Exchange Students",
      date: "September 12, 2025",
      category: "Student Programs",
      excerpt:
        "Innovative digital platform allows students to explore partner universities through immersive 360° tours, virtual open houses, and direct interactions with current international students.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Innovation in Teaching and Learning Conference Announces Call for Papers",
      date: "September 10, 2025",
      category: "Event Highlights",
      excerpt:
        "Educators and researchers invited to submit proposals for upcoming conference showcasing best practices in pedagogical innovation, assessment reform, and educational technology integration.",
      image: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Alumni Network Reaches 5000 Members Across 40 Countries",
      date: "September 8, 2025",
      category: "Community",
      excerpt:
        "Growing GIS alumni community celebrates milestone membership, strengthening professional networks and creating mentorship opportunities for current students through global connections.",
      image: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Joint Degree Program in Global Health Approved by Partner Universities",
      date: "September 5, 2025",
      category: "Academic Programs",
      excerpt:
        "First collaborative degree program enables students to study at multiple GIS institutions, earning recognized qualifications while gaining international experience in public health and epidemiology.",
      image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwNDk5NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Research Ethics and Integrity Workshop Conducted for PhD Candidates",
      date: "September 3, 2025",
      category: "Research Excellence",
      excerpt:
        "Comprehensive training program addresses responsible conduct in research, data management, publication ethics, and collaborative research practices for doctoral students across member institutions.",
      image: "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA1MjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Partnership with Industry Leaders Creates Internship Opportunities",
      date: "September 1, 2025",
      category: "Partnership",
      excerpt:
        "New corporate partnerships provide 200+ international internship placements for GIS students, bridging academic learning with professional experience in global companies.",
      image: "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Green Campus Initiative Awards Recognize Sustainability Leaders",
      date: "August 28, 2025",
      category: "Awards & Recognition",
      excerpt:
        "Five member universities honored for outstanding achievements in environmental sustainability, carbon neutrality programs, and green infrastructure development on campus.",
      image: "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Language and Cultural Exchange Program Expands to 12 New Languages",
      date: "August 25, 2025",
      category: "Student Programs",
      excerpt:
        "Enhanced language learning opportunities now available for students interested in mastering diverse languages while engaging with authentic cultural experiences through buddy systems.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNTg5ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Entrepreneurship and Innovation Hub Opens at Partner University",
      date: "August 22, 2025",
      category: "Community",
      excerpt:
        "State-of-the-art facility provides resources, mentorship, and funding opportunities for student-led startups and social enterprises, fostering entrepreneurial mindset among future leaders.",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Mental Health Support Services Expanded Across Member Institutions",
      date: "August 20, 2025",
      category: "Student Programs",
      excerpt:
        "Comprehensive wellbeing initiative provides counseling services, peer support networks, and stress management workshops specifically designed for international students and exchange participants.",
      image: "https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYwNTIwNzc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Data Science Bootcamp Series Trains 300+ Students in Analytics",
      date: "August 18, 2025",
      category: "Academic Programs",
      excerpt:
        "Intensive skill-building program equips students with practical data analytics capabilities, machine learning fundamentals, and visualization techniques for research and career advancement.",
      image: "https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Diversity and Inclusion Initiative Launches Campus-Wide Programs",
      date: "August 15, 2025",
      category: "Community",
      excerpt:
        "Comprehensive strategy promotes equity, celebrates cultural diversity, and creates inclusive learning environments through awareness campaigns, training workshops, and policy reforms.",
      image: "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwNDk5NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Event Highlights": "bg-[var(--forest-green)]",
      "Partnership": "bg-blue-600",
      "Research Excellence": "bg-[var(--gold)]",
      "Student Programs": "bg-purple-600",
      "Academic Programs": "bg-[var(--olive-green)]",
      "Awards & Recognition": "bg-[var(--bronze)]",
      "Community": "bg-teal-600",
    };
    return colors[category] || "bg-gray-600";
  };

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = allNews.map((news) => news.category);
    return ["all", ...Array.from(new Set(cats))];
  }, []);

  // Filter and search news
  const filteredNews = useMemo(() => {
    let filtered = allNews;

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((news) => news.category === filterCategory);
    }

    // Apply search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(query) ||
          news.excerpt.toLowerCase().includes(query) ||
          news.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, filterCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCategory("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.trim() !== "" || filterCategory !== "all";

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white overflow-hidden">
        {/* Decorative Elements */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <motion.div
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Newspaper className="w-20 h-20 mx-auto" />
            </motion.div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl mb-6"
          >
            News & Updates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Stay informed with the latest achievements, partnerships, and milestones from Global Insight Series
          </motion.p>
        </div>
      </section>

      {/* Main News Section with Search & Filter */}
      <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search news by title, content, or category..."
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
                  <Select
                    value={filterCategory}
                    onValueChange={(value) => {
                      setFilterCategory(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="h-12 border-gray-200 focus:border-[var(--forest-green)] focus:ring-[var(--forest-green)]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "All News" : category}
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
                  {filterCategory !== "all" && (
                    <Badge className="bg-[var(--forest-green)]/10 text-[var(--forest-green)] border-0 px-3 py-1">
                      Category: {filterCategory}
                    </Badge>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* News Count */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-[var(--forest-green)]/10 text-[var(--forest-green)] border-0 px-4 py-2">
              {filteredNews.length > 0 ? (
                <>
                  Showing {indexOfFirstNews + 1}-
                  {Math.min(indexOfLastNews, filteredNews.length)} of{" "}
                  {filteredNews.length} news articles
                </>
              ) : (
                <>No news found</>
              )}
            </Badge>
          </motion.div>

          {/* No Results Message */}
          {filteredNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-3xl p-12 max-w-lg mx-auto shadow-xl border border-gray-100">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Search className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl text-gray-800 mb-2">No News Found</h3>
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
            <>
              {/* News Grid - 4 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {currentNews.map((news, index) => (
                  <AnimatedSection key={index}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleArticleClick(news)}
                    >
                      <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 h-full flex flex-col bg-white">
                        <div className="relative h-48 overflow-hidden">
                          <ImageWithFallback
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge
                              className={`${getCategoryColor(
                                news.category
                              )} text-white border-0 text-xs`}
                            >
                              {news.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-5 flex-1 flex flex-col">
                          <div className="flex items-center text-xs text-gray-500 mb-3">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {news.date}
                          </div>
                          <h3 className="text-base text-[var(--forest-green)] mb-3 line-clamp-2 group-hover:text-[var(--olive-green)] transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-3">
                            {news.excerpt}
                          </p>
                          <motion.div
                            className="text-[var(--forest-green)] hover:text-[var(--olive-green)] transition-colors text-sm flex items-center group/link"
                            whileHover={{ x: 5 }}
                          >
                            Read more
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
    
    
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
