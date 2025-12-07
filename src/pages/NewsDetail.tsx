import { motion } from "motion/react";
import { ArrowLeft, Calendar, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

interface NewsDetailProps {
  onNavigate: (page: string) => void;
  article: {
    title: string;
    date: string;
    category: string;
    excerpt: string;
    image: string;
  };
}

export function NewsDetail({ onNavigate, article }: NewsDetailProps) {
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

  // Extended content for full article
  const fullArticleContent = {
    introduction: `lorem ipsum dolor sit amet consectetur adipisicing elit. The Global Insight Series (GIS) stands as a testament to the power of international collaboration in higher education. Since its inception, GIS has been dedicated to fostering partnerships among universities across the globe, promoting student mobility, and enhancing research collaboration. This article delves into the multifaceted impact of GIS on academic institutions, students, and the broader educational landscape.`,
    
    sections: [
      {
        heading: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        content: `lorem ipsum dolor sit amet consectetur adipisicing elit. At the core of GIS's mission is the establishment of robust partnerships between member universities. These collaborations facilitate the exchange of knowledge, resources, and best practices, ultimately enriching the academic environment for all stakeholders involved. Through joint degree programs, faculty exchanges, and collaborative research projects, GIS has successfully created a dynamic network that transcends geographical boundaries.`,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
      },
      {
        heading: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        content: `lorem ipsum dolor sit amet consectetur adipisicing elit. One of the most significant contributions of GIS is its emphasis on student mobility. By providing students with opportunities to study abroad at partner institutions, GIS not only broadens their academic horizons but also fosters cultural understanding and global citizenship. Exchange programs, summer schools, and international internships are just a few of the avenues through which students can immerse themselves in diverse educational settings, gaining invaluable experiences that shape their personal and professional growth.`,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
      },
      {
        heading: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        content: `lorem ipsum dolor sit amet consectetur adipisicing elit. Beyond student mobility, GIS places a strong emphasis on research collaboration. By connecting researchers from different institutions and disciplines, GIS fosters an environment conducive to innovation and knowledge creation. Collaborative research initiatives address global challenges, from climate change to public health, leveraging the diverse expertise of its member universities. Through conferences, workshops, and joint publications, GIS facilitates the dissemination of research findings to a broader audience, amplifying their impact.`,
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1200&h=600&fit=crop",
      },
      {
        heading: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        content: `lorem ipsum dolor sit amet consectetur adipisicing elit. The impact of GIS extends beyond the academic realm, influencing policy development and institutional strategies. By advocating for internationalization in higher education, GIS encourages universities to adopt global perspectives in their curricula, research agendas, and community engagement efforts. This shift not only enhances the quality of education but also prepares students to thrive in an interconnected world. Furthermore, GIS's commitment to inclusivity and diversity ensures that opportunities for international collaboration are accessible to a wide range of students and scholars.`,
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
      },
      {
        heading: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        content: `lorem ipsum dolor sit amet consectetur adipisicing elit. In conclusion, the Global Insight Series has made significant strides in advancing international collaboration in higher education. Through its focus on partnerships, student mobility, and research excellence, GIS has created a vibrant network that enriches the academic experience for students and faculty alike. As the world continues to evolve, the role of GIS in shaping the future of higher education remains pivotal, fostering a culture of collaboration, innovation, and global citizenship.`,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
      },
    ],
    
    conclusion: `lorem ipsum dolor sit amet consectetur adipisicing elit. The Global Insight Series continues to be a beacon of international collaboration, driving positive change in higher education worldwide.`,
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

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              {fullArticleContent.introduction}
            </p>
          </motion.div>

          <Separator className="my-12" />

          {/* Article Sections with Images */}
          {fullArticleContent.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              {/* Section Heading */}
              <h2 className="text-3xl text-[var(--forest-green)] mb-6">
                {section.heading}
              </h2>

              {/* Section Content */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {section.content}
              </p>

              {/* Section Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <ImageWithFallback
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          ))}

          <Separator className="my-12" />

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-[var(--gold)] pl-6 py-2">
              {fullArticleContent.conclusion}
            </p>
          </motion.div>

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
