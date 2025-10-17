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
    introduction: `The Global Insight Series continues to strengthen international academic collaboration through innovative programs and strategic partnerships. This initiative has brought together universities from across the globe to share knowledge, foster research cooperation, and create meaningful opportunities for students and faculty alike.`,
    
    sections: [
      {
        heading: "Building Global Networks Through Academic Excellence",
        content: `Our commitment to fostering international collaboration has led to the establishment of partnerships with over 25 leading universities worldwide. These partnerships enable joint research projects, student exchange programs, and collaborative teaching initiatives that enrich the academic experience for all participants. Through regular symposiums, workshops, and conferences, we create platforms for knowledge exchange and innovation that transcend geographical boundaries.`,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
      },
      {
        heading: "Empowering Students Through International Experience",
        content: `Student mobility is at the heart of our mission. The exchange programs facilitated through GIS provide students with invaluable opportunities to study abroad, experience different cultures, and develop global perspectives that are essential in today's interconnected world. Our comprehensive support system ensures that students receive guidance throughout their exchange journey, from application to successful completion of their programs. We have witnessed remarkable transformations as students return with enhanced intercultural competencies, language skills, and professional networks that benefit them throughout their careers.`,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
      },
      {
        heading: "Research Collaboration and Innovation",
        content: `Joint research initiatives among member universities have produced groundbreaking findings across various disciplines. Our collaborative research framework encourages interdisciplinary approaches, pooling expertise and resources to address complex global challenges. From sustainable development to technological innovation, our research teams are making significant contributions to academic knowledge and practical solutions. The establishment of research clusters and working groups has facilitated ongoing dialogue and cooperation among scholars worldwide.`,
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1200&h=600&fit=crop",
      },
      {
        heading: "Faculty Development and Professional Growth",
        content: `Recognizing that educators are key drivers of quality education, GIS invests significantly in faculty development programs. These initiatives provide opportunities for teaching staff to enhance their pedagogical skills, learn innovative teaching methodologies, and engage with international colleagues. Workshops, training sessions, and exchange programs for faculty members ensure continuous professional development and the sharing of best practices across institutions. This investment in human capital strengthens the overall quality of education delivered across our network.`,
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
      },
      {
        heading: "Looking Ahead: Future Initiatives and Expansion",
        content: `As we look to the future, GIS remains committed to expanding its reach and deepening its impact. Plans are underway to launch new joint degree programs, establish virtual exchange opportunities, and develop innovative platforms for online collaboration. We are also exploring partnerships with industry leaders to provide students with internship opportunities and practical learning experiences. Our vision is to create a truly global academic community where borders become bridges and collaboration becomes the norm. Through continued dedication to excellence and innovation, we aim to set new standards for international academic cooperation.`,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=600&fit=crop",
      },
    ],
    
    conclusion: `The Global Insight Series represents more than just partnerships between institutions; it embodies a shared commitment to advancing education, fostering understanding, and preparing the next generation of global citizens. Together, we are building a future where knowledge knows no boundaries and collaboration creates limitless possibilities for learning and growth.`,
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
