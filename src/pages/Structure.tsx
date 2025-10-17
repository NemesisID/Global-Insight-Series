import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Users, User, Sparkles, Building2, Target, Network } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
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

export function Structure() {
  const leadership = [
    {
      name: "Prof. Dr. Ir. Rachmat Hendayana, M.Sc",
      position: "Director of Global Insight Series",
      initial: "RH",
      color: "from-[var(--forest-green)] to-[var(--olive-green)]",
    },
    {
      name: "Dr. Sri Wahyuni, M.Si",
      position: "Deputy Director for Academic Affairs",
      initial: "SW",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Dr. Ahmad Rizal, M.M",
      position: "Deputy Director for Partnerships",
      initial: "AR",
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "Ir. Dewi Kartika, M.T",
      position: "Head of International Relations",
      initial: "DK",
      color: "from-[var(--gold)] to-[var(--bronze)]",
    },
    {
      name: "Drs. Bambang Suharto, M.A",
      position: "Head of Program Development",
      initial: "BS",
      color: "from-teal-500 to-teal-700",
    },
    {
      name: "Dr. Siti Nurhaliza, M.Pd",
      position: "Head of Research Collaboration",
      initial: "SN",
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--forest-green)] via-[var(--olive-green)] to-[var(--forest-green)] text-white relative overflow-hidden">
        {/* Animated background */}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="inline-block">
              <motion.div
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Building2 className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl mb-6"
          >
            Organizational Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90"
          >
            Meet the Team Behind Global Insight Series
          </motion.p>
        </div>
      </section>

      {/* Organizational Chart - Modern Interactive Design */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#f0f9f4] via-white to-[#fefcf7] relative overflow-hidden">
          <FloatingElements />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center bg-[var(--forest-green)]/10 rounded-full px-4 py-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Network className="w-4 h-4 text-[var(--forest-green)] mr-2" />
                <span className="text-sm text-[var(--forest-green)]">Our Team</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl text-[var(--forest-green)] mb-4">
                Organizational Structure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A dedicated team working together to advance international academic collaboration
              </p>
            </div>

            {/* Interactive Org Chart */}
            <div className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {/* Director Level - Top */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-[var(--forest-green)] to-[var(--gold)] rounded-3xl blur-2xl opacity-20"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <Card className="relative bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white border-0 shadow-2xl overflow-hidden min-w-[320px]">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl transform -translate-x-4 translate-y-4" />
                      
                      <CardContent className="p-8 text-center relative z-10">
                        <motion.div
                          className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          transition={{ duration: 0.6 }}
                        >
                          <Target className="w-8 h-8 text-white" />
                        </motion.div>
                        <div className="text-sm text-white/70 mb-2 uppercase tracking-wider">Director</div>
                        <div className="text-xl">Global Insight Series</div>
                        <motion.div
                          className="mt-3 h-1 w-20 bg-white/30 rounded-full mx-auto"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                        />
                      </CardContent>
                    </Card>
                    
                    {/* Connector to next level */}
                    <motion.div
                      className="absolute left-1/2 -bottom-12 w-px h-12 bg-gradient-to-b from-[var(--forest-green)] to-transparent -translate-x-1/2"
                      initial={{ height: 0 }}
                      whileInView={{ height: 48 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    />
                  </motion.div>
                </motion.div>

                {/* Deputy Directors Level */}
                <div className="relative">
                  {/* Horizontal connector line */}
                  <motion.div
                    className="absolute top-0 left-1/4 right-1/4 h-px bg-[var(--forest-green)]/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-12">
                    {[
                      { title: "Deputy Director", subtitle: "Academic Affairs", icon: Users, color: "from-blue-500 to-blue-700" },
                      { title: "Deputy Director", subtitle: "Partnerships", icon: Network, color: "from-purple-500 to-purple-700" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="relative"
                      >
                        {/* Vertical connector from top */}
                        <motion.div
                          className="absolute left-1/2 -top-12 w-px h-12 bg-[var(--forest-green)]/30 -translate-x-1/2"
                          initial={{ height: 0 }}
                          whileInView={{ height: 48 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        />
                        
                        <motion.div whileHover={{ y: -5 }}>
                          <Card className={`bg-gradient-to-br ${item.color} text-white border-0 shadow-xl overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl transform translate-x-6 -translate-y-6" />
                            <CardContent className="p-6 text-center relative z-10">
                              <motion.div
                                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                                transition={{ duration: 0.5 }}
                              >
                                <item.icon className="w-6 h-6 text-white" />
                              </motion.div>
                              <div className="text-xs text-white/70 mb-1 uppercase tracking-wider">{item.title}</div>
                              <div className="text-lg">{item.subtitle}</div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Department Heads Level */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  {[
                    { dept: "International Relations", icon: Network, color: "from-[var(--gold)] to-[var(--bronze)]" },
                    { dept: "Program Development", icon: Target, color: "from-teal-500 to-teal-700" },
                    { dept: "Research Collaboration", icon: Sparkles, color: "from-orange-500 to-orange-700" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}" />
                        <CardContent className="p-5 text-center">
                          <motion.div
                            className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md`}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className="w-5 h-5 text-white" />
                          </motion.div>
                          <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Head of</div>
                          <div className="text-sm text-[var(--forest-green)]">{item.dept}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Leadership Team - Enhanced Cards */}

      {/* Advisory Board - Enhanced Design */}
      <AnimatedSection>
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-gradient-to-br from-[var(--cream)] via-white to-[var(--cream)] rounded-3xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden border border-[var(--forest-green)]/10"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--gold)]/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--forest-green)]/10 to-transparent rounded-full blur-2xl" />
              
              <motion.div
                className="inline-block mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-2xl flex items-center justify-center shadow-xl mx-auto">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl text-[var(--forest-green)] mb-6 relative z-10">Advisory Board</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[var(--forest-green)] to-[var(--gold)] rounded-full mx-auto mb-6" />
              
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                Our Advisory Board consists of distinguished academics and university leaders from our member institutions who provide strategic guidance and oversight to ensure GIS maintains the highest standards of academic excellence and continues to serve the needs of the international academic community.
              </p>
              <p className="text-gray-600 relative z-10">
                The board meets bi-annually to review programs, set strategic directions, and foster new collaborative opportunities among member universities.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
