import { motion } from "motion/react";
import { ArrowLeft, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

// Backend type
interface NewsItem {
  id: number;
  title: string;
  content: string;
  author: string;
  thumbnailUrl?: string;
  createdAt: string;
}

export function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (newsId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/news/${newsId}`);
      setArticle(response.data);
    } catch (error) {
      console.error("Failed to fetch article", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--forest-green)]"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <button
          onClick={() => navigate("/news")}
          className="text-[var(--forest-green)] hover:underline flex items-center"
        >
          <ArrowLeft className="mr-2" /> Back to News
        </button>
      </div>
    );
  }

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
            onClick={() => navigate("/news")}
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
            <Badge className="bg-[var(--gold)] text-white border-0">
              News
            </Badge>
            <div className="flex items-center text-white/90">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(article.createdAt), "PPP")}
            </div>
             <div className="flex items-center text-white/90">
               By {article.author}
             </div>
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
        </div>
      </motion.section>

      {/* Article Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {article.thumbnailUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <ImageWithFallback
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Content from Rich Text Editor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12 prose prose-lg max-w-none prose-headings:text-[var(--forest-green)] prose-a:text-[var(--gold)]"
          >
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
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
              onClick={() => navigate("/news")}
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
