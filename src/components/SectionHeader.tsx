import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  icon: Icon,
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""}`}>
      {badge && (
        <motion.div
          className="inline-flex items-center bg-[var(--gold)]/10 rounded-full px-4 py-2 mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          {Icon && <Icon className="w-4 h-4 text-[var(--gold)] mr-2" />}
          <span className="text-sm text-[var(--gold)]">{badge}</span>
        </motion.div>
      )}
      
      <motion.h2
        className="text-4xl md:text-5xl text-[var(--forest-green)] mb-4 relative inline-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
        <motion.div
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--bronze)] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className={`text-gray-600 ${centered ? "max-w-2xl mx-auto" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
