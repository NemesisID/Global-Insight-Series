import { motion } from "framer-motion";

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating circles */}
      <motion.div
        className="absolute w-64 h-64 bg-[var(--gold)]/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-[var(--forest-green)]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ bottom: "10%", right: "10%" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-[var(--olive-green)]/10 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ top: "50%", right: "20%" }}
      />
    </div>
  );
}

export function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export function DecorativePattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="batik-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <motion.circle
              cx="25"
              cy="25"
              r="2"
              fill="currentColor"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle
              cx="75"
              cy="75"
              r="2"
              fill="currentColor"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            <motion.path
              d="M 25 25 Q 50 50 75 75"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-pattern)" />
      </svg>
    </div>
  );
}
