import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {useLocation} from "react-router-dom";

interface NewsDetailProps {
  onNavigate: (page: string) => void;
  // Article prop is now optional as it might come from route state
  article?: any;
}

export function NewsDetail({ onNavigate, article: propArticle }: NewsDetailProps) {
  const location = useLocation();
  // Get article from props (direct usage) or location state (navigation)
  const article = propArticle || location.state?.article;

  if (!article) {
    return (
      <div className="min-h-screen pt-40 px-8 text-center bg-[var(--cream)]">
        <h1 className="text-3xl text-[var(--forest-green)] mb-4">Article Not Found</h1>
        <button 
          onClick={() => onNavigate("news")}
          className="bg-[var(--forest-green)] text-white px-6 py-2 rounded-full hover:bg-[var(--olive-green)]"
        >
          Back to News
        </button>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen pt-20 bg-[var(--cream)]">
      {/* Hero Header with Title */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white overflow-hidden"
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 batik-pattern" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <motion.button
            onClick={() => onNavigate("news")}
            className="flex items-center text-white/90 hover:text-white mb-8 group"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to News
          </motion.button>

          {/* Article Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <Badge className={`${getCategoryColor(article.category)} text-white border-0`}>
              {article.category}
            </Badge>
            <div className="flex items-center text-white/90">
              <Calendar className="w-4 h-4 mr-2" />
              {article.date}
            </div>
            {article.author && (
            <div className="flex items-center text-white/90">
              <span>By {article.author}</span>
            </div>
            )}
          </motion.div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl mb-6 leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Article Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/90 leading-relaxed"
          >
            {article.excerpt}
          </motion.p>
        </div>
      </motion.section>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {article.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </motion.div>
          )}

          {/* Full Content from Rich Text Editor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 prose prose-lg max-w-none text-gray-700 leading-relaxed prose-headings:text-[var(--forest-green)] prose-a:text-[var(--gold)]"
          >
            {/* Render HTML content safely */}
             <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
          </motion.div>

          <Separator className="my-12" />

          {/* Related Articles CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => onNavigate("news")}
              className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all inline-flex items-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              View More News
            </motion.button>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
