import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  Users,
  Calendar,
  Globe,
  Sparkles,
  TrendingUp,
  Award,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Card, CardContent } from "../components/ui/card";
import {
  FloatingElements,
  ParticleField,
} from "../components/FloatingElements";

interface HomeProps {
  onNavigate: (page: string) => void;
}

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

function TypingAnimationTitle() {
  const phrases = [
    { text: "Let's Join Us", lang: "en" },
    { text: "Ayo Bergabung Dengan Kami", lang: "id" },
    { text: "انضم إلينا", lang: "ye" },
    { text: "ご参加ください", lang: "jp" },
    { text: "함께해요", lang: "kr" },
    { text: "Halina't sumali sa amin", lang: "ph" },
    { text: "Únete a nosotros", lang: "co" },
    { text: "Jom sertai kami", lang: "my" },
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase].text;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </span>
  );
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

export function Home({ onNavigate }: HomeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Force video to play when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Ensure video is muted for autoplay to work
      video.muted = true;

      // Attempt to play the video
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            console.log("Campaign video auto-playing");
            setIsVideoLoaded(true);
          })
          .catch((error) => {
            // Auto-play was prevented
            console.warn("Video autoplay failed:", error);
            // Video will show fallback or user can manually play
          });
      }
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)]">
          <ImageWithFallback
            src="assets/bg.jpeg"
            alt="Campus"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating particles */}
        <ParticleField />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-[var(--gold)]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 relative"
          >
            <span className="relative inline-block">Welcome to </span>
            <br />
            <span className="bg-gradient-to-r from-white via-[var(--gold)] to-white bg-clip-text text-transparent">
              Global Insight Series
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto"
          >
            Bridging Academic Excellence Across Borders Through International
            Collaboration
          </motion.p>

          {/* Campaign Video Embed */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 max-w-5xl mx-auto"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/5 p-2">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[var(--gold)] rounded-tl-3xl -m-1" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[var(--gold)] rounded-tr-3xl -m-1" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[var(--gold)] rounded-bl-3xl -m-1" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[var(--gold)] rounded-br-3xl -m-1" />

              {/* Video Container */}
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group">
                {/* HTML5 Local Video - Auto-play & Looping */}
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&h=675&fit=crop"
                  onLoadedData={() => setIsVideoLoaded(true)}
                  onError={(e) => {
                    // Fallback if video fails to load
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling;
                    if (fallback) {
                      (fallback as HTMLElement).style.display = "flex";
                    }
                  }}
                >
                  {/* 
                    INSTRUCTIONS:
                    1. Place your video file in the /public folder (create if doesn't exist)
                    2. Recommended path: /public/videos/campaign.mp4
                    3. Update the src below to match your video filename
                    4. Supported formats: .mp4, .webm, .ogg
                  */}
                  <source src="videos/campaign.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Mute/Unmute Button */}
                {isVideoLoaded && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={toggleMute}
                    className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
                    title={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </motion.button>
                )}

                {/* Fallback Placeholder (shown if video fails to load) */}
                <div
                  className="absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)]"
                  style={{ display: "none" }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGVjdHVyZSUyMGhhbGx8ZW58MXx8fHwxNzYwNTE5MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Campaign Video Thumbnail"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mb-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/50">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                      </div>
                    </motion.div>
                    <p className="text-xl text-white/90">Video Not Found</p>
                    <p className="text-sm text-white/70 mt-2 px-4">
                      Please add your video file to /public/videos/campaign.mp4
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Caption */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-white/80 italic">
                  "Discover how GIS is transforming international academic
                  collaboration"
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("about-gis")}
            className="bg-gradient-to-r from-[var(--gold)] to-[var(--bronze)] text-white px-10 py-5 rounded-full hover:shadow-2xl transition-all inline-flex items-center group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.1 }}
            />
            <span className="relative z-10">Learn More About GIS</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
          </motion.button>
        </div>
      </section>

      {/* Statistics Section */}
      <AnimatedSection>
        <section className="py-20 bg-white relative overflow-hidden">
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-[var(--cream)] h-full">
                  {/* Decorative top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--forest-green)]/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />

                  <CardContent className="text-center p-8 relative z-10">
                    <div className="relative inline-block mb-6">
                      <motion.div
                        className="absolute inset-0 bg-[var(--forest-green)]/10 rounded-full blur-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        transition={{ duration: 0.6 }}
                      >
                        <Users className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="text-5xl md:text-6xl text-[var(--forest-green)] mb-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <CountUp end={25} />+
                    </motion.div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--forest-green)] to-transparent mx-auto mb-3" />
                    <p className="text-gray-600">Universities Have Joined</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-[#fef9f0] h-full">
                  {/* Decorative top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--bronze)]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />

                  <CardContent className="text-center p-8 relative z-10">
                    <div className="relative inline-block mb-6">
                      <motion.div
                        className="absolute inset-0 bg-[var(--gold)]/10 rounded-full blur-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                      <motion.div
                        className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[var(--gold)] to-[var(--bronze)] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        transition={{ duration: 0.6 }}
                      >
                        <TrendingUp className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="text-5xl md:text-6xl text-[var(--forest-green)] mb-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <CountUp end={50} />+
                    </motion.div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mb-3" />
                    <p className="text-gray-600">
                      Collaborative Programs Have Been Conducted
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-white to-[#f4f6f4] h-full">
                  {/* Decorative top border */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--olive-green)] to-[var(--forest-green)]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--olive-green)]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />

                  <CardContent className="text-center p-8 relative z-10">
                    <div className="relative inline-block mb-6">
                      <motion.div
                        className="absolute inset-0 bg-[var(--olive-green)]/10 rounded-full blur-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      <motion.div
                        className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[var(--olive-green)] to-[var(--forest-green)] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                        transition={{ duration: 0.6 }}
                      >
                        <Award className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>
                    <motion.div
                      className="text-5xl md:text-6xl text-[var(--forest-green)] mb-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <CountUp end={1000} />+
                    </motion.div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[var(--olive-green)] to-transparent mx-auto mb-3" />
                    <p className="text-gray-600">
                      Participants Have Joined Our Programs
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Who Are We Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#f0f9f4] via-[#fefcf7] to-[#f5f1e8] relative overflow-hidden">
          {/* Modern Mesh Gradient Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large Gradient Orbs with stronger colors */}
            <motion.div
              className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(45, 80, 22, 0.15) 0%, rgba(45, 80, 22, 0.05) 40%, transparent 70%)",
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201, 169, 97, 0.2) 0%, rgba(201, 169, 97, 0.08) 40%, transparent 70%)",
              }}
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(74, 103, 65, 0.12) 0%, rgba(74, 103, 65, 0.04) 50%, transparent 70%)",
              }}
              animate={{
                x: [0, -50, 0],
                y: [0, 80, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Geometric Shapes for modern look */}
            <motion.div
              className="absolute top-20 right-20 w-32 h-32 border-2 border-[var(--forest-green)]/20 rounded-3xl"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="absolute bottom-32 left-20 w-24 h-24 border-2 border-[var(--gold)]/30"
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

            <motion.div
              className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-[var(--forest-green)]/10 to-[var(--gold)]/10 rounded-2xl"
              animate={{
                rotate: [45, 135, 225, 315, 45],
                y: [0, -30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Dots Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-2 h-2 bg-[var(--forest-green)] rounded-full" />
              <div className="absolute top-20 left-40 w-1.5 h-1.5 bg-[var(--gold)] rounded-full" />
              <div className="absolute top-40 right-32 w-2 h-2 bg-[var(--olive-green)] rounded-full" />
              <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-[var(--forest-green)] rounded-full" />
              <div className="absolute bottom-40 left-32 w-2 h-2 bg-[var(--gold)] rounded-full" />
              <motion.div
                className="absolute top-1/3 right-1/3 w-3 h-3 bg-[var(--forest-green)] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 bg-[var(--gold)] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>

            {/* Subtle Grid Lines for modern tech feel */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(var(--forest-green) 1px, transparent 1px),
                                 linear-gradient(90deg, var(--forest-green) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Batik pattern overlay - more subtle */}
            <div className="absolute inset-0 batik-pattern opacity-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-[var(--forest-green)] to-[var(--gold)] rounded-2xl blur-2xl opacity-20"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1725618878496-233974f2fd59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MDU4OTg3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="International Collaboration"
                    className="rounded-2xl shadow-2xl w-full"
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--gold)] rounded-2xl shadow-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-center">
                      <div className="text-3xl text-white">1+</div>
                      <div className="text-xs text-white/90">Years</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center bg-[var(--forest-green)]/10 rounded-full px-4 py-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-[var(--forest-green)] mr-2" />
                  <span className="text-sm text-[var(--forest-green)]">
                    About Us
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl text-[var(--forest-green)] mb-6">
                  Who Are We?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Vestibulum tortor quam,
                  feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                  libero sit amet quam egestas semper. Aenean ultricies mi vitae
                  est mauris placerat eleifend leo.
                </p>
                <motion.button
                  onClick={() => onNavigate("about-gis")}
                  className="bg-[var(--forest-green)] text-white px-8 py-4 rounded-full hover:bg-[var(--olive-green)] transition-colors inline-flex items-center group shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Programs Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#fafafa] to-white relative overflow-hidden">
          {/* Decorative Pattern Corners - Similar to WUACD */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
            <div className="absolute inset-0 batik-pattern" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
            <div className="absolute inset-0 batik-pattern" />
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 pointer-events-none">
            <div className="absolute inset-0 batik-pattern" />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
            <div className="absolute inset-0 batik-pattern" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-[var(--forest-green)] mb-4">
                Our Programs
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur excepteur sint occaecat cupidatat non proident.
              </p>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "GIS International Community Development",
                  icon: Globe,
                  iconColor: "text-red-500",
                  bgColor: "bg-red-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
                {
                  name: "GIS International Conference",
                  icon: Users,
                  iconColor: "text-[var(--forest-green)]",
                  bgColor: "bg-green-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
                {
                  name: "GIS Research Grant & Funding",
                  icon: TrendingUp,
                  iconColor: "text-[var(--gold)]",
                  bgColor: "bg-amber-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
                {
                  name: "Student Exchange Program",
                  icon: Calendar,
                  iconColor: "text-blue-500",
                  bgColor: "bg-blue-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
                {
                  name: "Faculty Development Program",
                  icon: Award,
                  iconColor: "text-purple-500",
                  bgColor: "bg-purple-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
                {
                  name: "Joint Research Initiative",
                  icon: Sparkles,
                  iconColor: "text-teal-500",
                  bgColor: "bg-teal-50",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed eiusmod",
                },
              ].map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 bg-white h-full flex flex-col">
                      {/* Decorative Corner Pattern */}
                      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 batik-pattern" />
                      </div>

                      <CardContent className="p-8 text-center relative flex-1 flex flex-col justify-center">
                        {/* Icon/Logo Container - Fixed Height */}
                        <div className="mb-6 flex justify-center">
                          <motion.div
                            className="relative inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {/* Glow Effect */}
                            <motion.div
                              className={`absolute inset-0 ${program.bgColor} rounded-full blur-xl opacity-50`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />

                            {/* Icon Circle */}
                            <div
                              className={`relative w-28 h-28 ${program.bgColor} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                            >
                              <program.icon
                                className={`w-14 h-14 ${program.iconColor}`}
                              />
                            </div>
                          </motion.div>
                        </div>

                        {/* Program Name - Fixed Height with line-clamp */}
                        <h3 className="text-lg text-[var(--forest-green)] mb-3 group-hover:text-[var(--gold)] transition-colors min-h-[3.5rem] flex items-center justify-center">
                          <span className="line-clamp-2">{program.name}</span>
                        </h3>

                        {/* Description - Fixed Height with line-clamp */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {program.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Recent News Section */}
      <AnimatedSection>
        <section className="py-20 bg-gradient-to-br from-[#fefcf7] to-[#f5f1e8] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute -top-20 right-0 w-80 h-80 bg-[var(--forest-green)]/5 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], y: [0, 40, 0] }}
              transition={{ duration: 16, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 left-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center bg-[var(--forest-green)]/10 rounded-full px-5 py-2 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-[var(--forest-green)] mr-2" />
                <span className="text-sm text-[var(--forest-green)]">
                  Latest Updates
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl text-[var(--forest-green)] mb-4">
                Recent News
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Stay updated with our latest activities and announcements
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "GIS International Summit 2025 Successfully Concluded",
                  date: "October 15, 2025",
                  category: "Event Highlights",
                  categoryColor: "bg-[var(--forest-green)]",
                  image:
                    "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzYwNDk5NjczfDA&ixlib=rb-4.1.0&q=80&w=1080",
                  excerpt:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
                },
                {
                  title: "New Strategic Partnership with Leading Universities",
                  date: "October 12, 2025",
                  category: "Partnership",
                  categoryColor: "bg-blue-600",
                  image:
                    "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA1MjA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  excerpt:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
                },
                {
                  title: "Breakthrough Research on Climate Published",
                  date: "October 10, 2025",
                  category: "Research",
                  categoryColor: "bg-[var(--gold)]",
                  image:
                    "https://images.unsplash.com/photo-1748256622734-92241ae7b43f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjA1MTM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  excerpt:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
                },
                {
                  title: "Student Exchange Program Milestone Reached",
                  date: "October 8, 2025",
                  category: "Student Programs",
                  categoryColor: "bg-purple-600",
                  image:
                    "https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYwNTM4MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
                  excerpt:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
                },
              ].map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onNavigate("news")}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-200 h-full flex flex-col bg-white">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3">
                          <motion.div
                            className={`${news.categoryColor} text-white text-xs px-3 py-1 rounded-full`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {news.category}
                          </motion.div>
                        </div>
                      </div>

                      <CardContent className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Calendar className="w-3.5 h-3.5 mr-1.5" />
                          {news.date}
                        </div>
                        <h3 className="text-base text-[var(--forest-green)] mb-3 line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 text-sm flex-1 line-clamp-2 mb-3">
                          {news.excerpt}
                        </p>
                        <motion.div
                          className="text-[var(--forest-green)] text-sm flex items-center group/link"
                          whileHover={{ x: 5 }}
                        >
                          Read more
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* View All News Button */}
            <div className="text-center">
              <motion.button
                onClick={() => onNavigate("news")}
                className="bg-gradient-to-r from-[var(--forest-green)] to-[var(--olive-green)] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all inline-flex items-center group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All News
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-32 bg-gradient-to-br from-[var(--forest-green)] via-[var(--olive-green)] to-[var(--forest-green)] text-white relative overflow-hidden">
          <ParticleField />
          <FloatingElements />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mb-8"
            ></motion.div>

            <motion.h2
              className="text-5xl md:text-7xl mb-12 min-h-[100px] flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TypingAnimationTitle />
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-12"
            >
              <p className="text-2xl md:text-3xl text-white/90">
                To build a global network.
              </p>
                <p className="text-2xl md:text-3xl text-white/90">
                To collaborate internationally.
                </p>
              <p className="text-2xl md:text-3xl text-white/90">
                To create a better future.
              </p>
            </motion.div>

            <motion.button
              onClick={() => onNavigate("contact")}
              className="bg-[var(--gold)] text-white px-12 py-5 rounded-full hover:bg-[var(--bronze)] transition-all inline-flex items-center shadow-2xl group relative overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
              <span className="relative z-10">Get In Touch</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </motion.button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
