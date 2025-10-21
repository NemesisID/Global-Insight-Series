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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatem fuga, maxime sit ipsam unde optio.
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
