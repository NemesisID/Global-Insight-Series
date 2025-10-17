import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Eye, Target, CheckCircle, Sparkles } from "lucide-react";
import { FloatingElements } from "../components/FloatingElements";
import { GlowingCard } from "../components/AnimatedCard";

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

export function VisionMission() {
  const missions = [
    "Foster sustainable partnerships among universities worldwide to enhance academic excellence and research capabilities",
    "Facilitate knowledge exchange through international conferences, webinars, and collaborative research initiatives",
    "Promote cross-cultural understanding and global citizenship among students, faculty, and researchers",
    "Create opportunities for international academic mobility and exchange programs",
    "Support joint research projects addressing global challenges and sustainable development goals",
    "Enhance institutional capacity and international visibility of member universities",
    "Build a vibrant community of scholars committed to collaborative innovation and excellence",
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl mb-6"
          >
            Vision & Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </motion.p>
        </div>
      </section>

      {/* Vision Section */}
      <AnimatedSection>
        <section className="py-20 bg-white relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <GlowingCard glowColor="var(--forest-green)">
                  <motion.div
                    className="bg-gradient-to-br from-[var(--cream)] to-white rounded-2xl p-8 md:p-12 shadow-xl border border-[var(--forest-green)]/10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-full flex items-center justify-center mr-4 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Eye className="w-8 h-8 text-white" />
                      </motion.div>
                      <h2 className="text-3xl text-[var(--forest-green)]">
                        Our Vision
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias inventore illum beatae maiores magni nulla nemo sit tempora ipsam, sint eius, dignissimos quos labore. Eveniet non consequatur doloremque, eius accusantium accusamus veniam tempora, itaque molestiae suscipit nesciunt error maiores et impedit? Atque ipsum dolore ex.
                    </p>
                  </motion.div>
                </GlowingCard>
              </div>
              <motion.div
                className="order-1 md:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] rounded-full blur-3xl opacity-20"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative w-64 h-64 mx-auto bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Eye className="w-32 h-32 text-white" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute -top-6 -right-6"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-12 h-12 text-[var(--gold)]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection>
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[var(--cream)] via-white to-[var(--cream)]">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 batik-pattern opacity-40" />

            {/* Gradient Orbs */}
            <motion.div
              className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(184, 134, 11, 0.15) 0%, rgba(184, 134, 11, 0.05) 50%, transparent 70%)",
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(45, 80, 22, 0.12) 0%, rgba(45, 80, 22, 0.04) 50%, transparent 70%)",
              }}
              animate={{
                x: [0, -60, 0],
                y: [0, 40, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Geometric Decorative Shapes */}
          <motion.div
            className="absolute top-32 right-20 w-20 h-20 border-2 border-[var(--gold)]/20 rounded-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute bottom-40 left-32 w-16 h-16 border-2 border-[var(--forest-green)]/20"
            animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-br from-[var(--gold)]/10 to-transparent rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="absolute top-1/3 right-40 w-8 h-8 bg-gradient-to-br from-[var(--forest-green)]/10 to-transparent rounded-lg"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          {/* Floating Mini Stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--gold)] rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(var(--forest-green) 1px, transparent 1px),
                linear-gradient(90deg, var(--forest-green) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-[var(--gold)] to-[var(--bronze)] rounded-full blur-3xl opacity-20"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative w-64 h-64 mx-auto bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-full flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Target className="w-32 h-32 text-white" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-6 -left-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-12 h-12 text-[var(--forest-green)]" />
                  </motion.div>
                </div>
              </motion.div>
              <div>
                <GlowingCard glowColor="var(--gold)">
                  <motion.div
                    className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[var(--gold)]/10"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-full flex items-center justify-center mr-4 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="w-8 h-8 text-white" />
                      </motion.div>
                      <h2 className="text-3xl text-[var(--forest-green)]">
                        Our Mission
                      </h2>
                    </div>
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                  </motion.div>
                </GlowingCard>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Values Section */}
      <AnimatedSection>
        <section className="py-20 bg-white relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center bg-[var(--forest-green)]/10 rounded-full px-4 py-2 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-[var(--forest-green)] mr-2" />
                <span className="text-sm text-[var(--forest-green)]">
                  Our Values
                </span>
              </motion.div>
              <h2 className="text-4xl text-[var(--forest-green)] mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Collaboration",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-blue-500 to-blue-700",
                },
                {
                  title: "Excellence",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-purple-500 to-purple-700",
                },
                {
                  title: "Inclusivity",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-green-500 to-green-700",
                },
                {
                  title: "Innovation",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-orange-500 to-orange-700",
                },
                {
                  title: "Integrity",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-red-500 to-red-700",
                },
                {
                  title: "Impact",
                  description:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
                  gradient: "from-teal-500 to-teal-700",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <GlowingCard>
                    <div className="bg-gradient-to-br from-[var(--cream)] to-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all h-full border border-gray-100 overflow-hidden relative">
                      <motion.div
                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.gradient}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      />
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-lg flex items-center justify-center mb-4 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl text-[var(--forest-green)] mb-3 group-hover:text-[var(--gold)] transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
