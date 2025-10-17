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
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img src="assets/logo.png" alt="logo" />
                  </motion.span>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: 360 }}
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
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget, tempor sit amet, ante. Donec
                    eu libero sit amet quam egestas semper. Aenean ultricies mi
                    vitae est mauris placerat eleifend leo.
                  </p>

                  {/* Our History Section with icon */}
                  <div className="flex items-center mt-8 mb-4">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Globe className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-2xl text-[var(--forest-green)]">
                      Our History
                    </h3>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget tempor sit amet ante donec eu
                    libero.
                  </p>

                  {/* Our Purpose Section with icon */}
                  <div className="flex items-center mt-8 mb-4">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-2xl text-[var(--forest-green)]">
                      Our Purpose
                    </h3>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam:
                  </p>

                  {/* Enhanced bullet list with custom styling */}
                  <ul className="space-y-3 my-6">
                    {[
                      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod",
                      "Tempor incididunt ut labore et dolore magna aliqua ut enim ad minim",
                      "Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip commodo",
                      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-6 h-6 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                        >
                          <Sparkles className="w-3 h-3 text-white" />
                        </motion.div>
                        <span className="group-hover:text-[var(--forest-green)] transition-colors">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas vestibulum tortor quam
                    feugiat vitae ultricies.
                  </p>

                  {/* Why Join GIS Section with icon */}
                  <div className="flex items-center mt-8 mb-4">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-xl flex items-center justify-center mr-3 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <h3 className="text-2xl text-[var(--forest-green)]">
                      Why Join GIS?
                    </h3>
                  </div>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat duis
                    aute irure dolor.
                  </p>

                  <motion.p
                    className="relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae ultricies eget tempor sit amet ante.
                  </motion.p>

                  {/* Call to action highlight box */}
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-[var(--forest-green)]/5 to-[var(--gold)]/5 rounded-2xl border-l-4 border-[var(--forest-green)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 text-[var(--gold)] mr-3 flex-shrink-0 mt-1" />
                      </motion.div>
                      <div>
                        <h4 className="text-lg text-[var(--forest-green)] mb-2">
                          Ready to Join Our Global Network?
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
