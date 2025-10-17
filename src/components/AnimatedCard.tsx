import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
}

export function AnimatedCard({
  children,
  delay = 0,
  className = "",
  hoverScale = 1.02,
  hoverY = -5,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: hoverScale, y: hoverY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowingCard({
  children,
  glowColor = "var(--gold)",
  className = "",
}: {
  children: ReactNode;
  glowColor?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute -inset-2 rounded-2xl blur-xl opacity-0"
        style={{ backgroundColor: glowColor }}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 0.3 },
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
