import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

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

export function FounderMembers() {


  const memberUniversities = [
    "Anna University",
    "Mahidol University",
    "Uva Wellassa University of Sri Lanka",
    "Stamford University Bangladesh",
    "Chiang Mai University",
    "Sarasas Affiliated School",
    "Prince of Songkla University",
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
            Members
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing.
          </motion.p>
        </div>
      </section>

      {/* Founding Universities Section */}
      {/* <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Award className="w-16 h-16 text-[var(--gold)] mx-auto mb-4" />
              <h2 className="text-4xl text-[var(--forest-green)] mb-4">
                Founding Universities
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The pioneering institutions that established Global Insight Series
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foundingUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[var(--cream)] to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center border-2 border-[var(--gold)]">
                    <div className="w-20 h-20 bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-[var(--forest-green)]">{university}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection> */}

      {/* Member Universities Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#e8f5e9] via-[#fefcf7] to-[#f5f1e8] relative overflow-hidden">
          {/* Modern Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(45, 80, 22, 0.12) 0%, rgba(45, 80, 22, 0.05) 50%, transparent 70%)",
              }}
              animate={{ 
                x: [0, 60, 0],
                y: [0, 40, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className="absolute bottom-20 left-10 w-[450px] h-[450px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.07) 50%, transparent 70%)",
              }}
              animate={{ 
                x: [0, -50, 0],
                y: [0, -60, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Geometric decorative shapes */}
            <motion.div
              className="absolute top-40 left-20 w-32 h-32 border-2 border-[var(--forest-green)]/20 rounded-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute bottom-32 right-32 w-24 h-24 border-2 border-[var(--gold)]/25"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              animate={{ 
                rotate: [0, -360],
                borderRadius: [
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                  "70% 30% 30% 70% / 70% 70% 30% 30%",
                  "30% 70% 70% 30% / 30% 30% 70% 70%",
                ],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating graduation caps */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${5 + (i % 4) * 25}%`,
                  top: `${10 + Math.floor(i / 4) * 30}%`,
                }}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{ 
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <GraduationCap className="w-8 h-8 text-[var(--forest-green)]" />
              </motion.div>
            ))}

            {/* Subtle dots pattern */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[var(--forest-green)] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{ 
                    scale: [1, 1.8, 1],
                    opacity: [0.2, 0.6, 0.2],
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
            <div className="absolute inset-0 batik-pattern opacity-10" />

            {/* Connecting lines decoration */}
            <svg className="absolute inset-0 w-full h-full opacity-5">
              <motion.path
                d="M 100 100 Q 300 200 500 100 T 900 100"
                stroke="var(--forest-green)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M 200 300 Q 400 400 600 300 T 1000 300"
                stroke="var(--gold)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              {/* Enhanced header icon */}
              <motion.div
                className="inline-block mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-2xl flex items-center justify-center shadow-2xl mx-auto relative"
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <GraduationCap className="w-10 h-10 text-white relative z-10" />
                </motion.div>
              </motion.div>
              
              <h2 className="text-4xl text-[var(--forest-green)] mb-4">
                Member Universities
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[var(--forest-green)] to-[var(--gold)] rounded-full mx-auto mb-4" />
              <p className="text-gray-600 max-w-2xl mx-auto">
                Distinguished institutions collaborating through Global Insight Series
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memberUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: (index % 8) * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center border border-white/50 relative overflow-hidden">
                    {/* Decorative gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-green)]/0 to-[var(--gold)]/0 group-hover:from-[var(--forest-green)]/5 group-hover:to-[var(--gold)]/5 transition-all duration-300 rounded-xl" />
                    
                    {/* Top accent line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--forest-green)] via-[var(--olive-green)] to-[var(--gold)]"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 8) * 0.05 + 0.2 }}
                    />
                    
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-2xl flex items-center justify-center mb-3 shadow-lg relative z-10 group-hover:shadow-xl group-hover:scale-110 transition-all"
                      transition={{ duration: 0.6 }}
                    >
                      <GraduationCap className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <p className="text-sm text-gray-700 relative z-10 group-hover:text-[var(--forest-green)] transition-colors">{university}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
