import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Sparkles, BookOpen, Users, Globe } from "lucide-react";
import { FloatingElements } from "../components/FloatingElements";

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

export function AboutGIS() {
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
            About Global Insight Series
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Empowering Global Academic Excellence Through Collaboration
          </motion.p>
        </div>
      </section>

      {/* Logo Section */}
      <AnimatedSection>
        <section className="py-20 bg-white relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-12">
              <motion.div
                className="relative inline-block mb-8"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[var(--gold)] rounded-full blur-3xl opacity-30"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="relative w-48 h-48 mx-auto from-[var(--forest-green)] to-[var(--olive-green)] flex items-center justify-center"
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className="text-7xl text-white"
                  >
                    <img src="assets/logo.png" alt="logo" />
                  </motion.span>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-8 h-8 text-[var(--gold)]" />
                </motion.div>
              </motion.div>
              <motion.h2
                className="text-3xl text-[var(--forest-green)] mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Global Insight Series
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                UPN "Veteran" Jawa Timur
              </motion.p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Content Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#e8f5e9] via-[#fefcf7] to-[#f5f1e8] relative overflow-hidden">
          {/* Modern Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(45, 80, 22, 0.12) 0%, rgba(45, 80, 22, 0.04) 50%, transparent 70%)",
              }}
              animate={{
                x: [0, 80, 0],
                y: [0, 60, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.06) 50%, transparent 70%)",
              }}
              animate={{
                x: [0, -60, 0],
                y: [0, -80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Geometric shapes */}
            <motion.div
              className="absolute top-32 right-20 w-24 h-24 border-2 border-[var(--forest-green)]/20 rounded-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute bottom-40 left-16 w-20 h-20 border-2 border-[var(--gold)]/30"
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

            {/* Subtle dots pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[var(--forest-green)] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Batik pattern overlay */}
            <div className="absolute inset-0 batik-pattern opacity-5" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-white/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Enhanced decorative corner elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--gold)]/15 to-transparent rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[var(--forest-green)]/15 to-transparent rounded-tr-[100px]" />

              {/* Decorative accent lines */}
              <motion.div
                className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-[var(--forest-green)] to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-[var(--gold)] to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: 128 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              <div className="relative z-10">
                {/* Header with enhanced styling */}
                <div className="flex items-center mb-8 relative">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-2xl flex items-center justify-center mr-4 shadow-xl relative overflow-hidden"
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      transition={{
                        duration: 3,
                        ease: "linear",
                      }}
                    />
                    <BookOpen className="w-7 h-7 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl md:text-4xl text-[var(--forest-green)]">
                      What is GIS?
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--forest-green)] to-[var(--gold)] rounded-full mt-2" />
                  </div>

                  {/* Floating sparkle */}
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-[var(--gold)]" />
                  </motion.div>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Multilateral Community Development (MCD) is an international
                    initiative initiated by UPN “Veteran” Jawa Timur, dedicated to
                    advancing global collaboration in community empowerment and
                    sustainable transformation. At the heart of this movement lies
                    the Global Insight Series (GIS) a flagship platform that brings
                    together academics, practitioners, policymakers, and innovators
                    from around the world to exchange ideas and share transformative
                    insights.
                  </p>

                  <p>
                    Through GIS, MCD fosters intellectual dialogue and cross-sector
                    collaboration to address contemporary challenges in areas such as
                    social innovation, digital transformation, sustainability, and inclusive
                    education. Each GIS event serves as a meeting point for global minds
                    connecting local wisdom with international knowledge to inspire real,
                    measurable impact on communities worldwide.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
