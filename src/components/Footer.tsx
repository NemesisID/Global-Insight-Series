import { Mail, Phone, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: "Home", page: "home" },
    { label: "About GIS", page: "about-gis" },
    { label: "Vision & Mission", page: "vision-mission" },
    { label: "Structure", page: "structure" },
    { label: "Founder & Members", page: "founder-members" },
    { label: "Upcoming Event", page: "upcoming-events" },
    { label: "Previous Event", page: "previous-events" },
    { label: "News", page: "news" },
    { label: "Contact Us", page: "contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-[var(--forest-green)] via-[var(--olive-green)] to-[var(--forest-green)] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo & Contact Info */}
          <div>
            <motion.div
              className="flex items-center mb-6 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-16 h-16 flex items-center justify-center mr-4 shadow-lg"
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl from-[var(--forest-green)] to-[var(--olive-green)] bg-clip-text text-transparent">
                  <img src="/assets/logo.png" alt="GIS Logo" />
                </span>
              </motion.div>
              <div>
                <div className="text-xl">Global Insight Series</div>
                <div className="text-sm text-white/80">UPN Veteran Jawa Timur</div>
              </div>
            </motion.div>
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-[var(--gold)] transition-colors">+62 (031) 870 6369</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:text-[var(--gold)] transition-colors">gis@upnjatim.ac.id</span>
              </motion.div>
              <div className="flex space-x-4 mt-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--gold)] transition-all shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--gold)] transition-all shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--gold)] transition-all shadow-lg"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Youtube className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl mb-6 flex items-center">
              <span className="w-1 h-6 bg-[var(--gold)] rounded-full mr-2" />
              Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="text-sm text-white/80 hover:text-[var(--gold)] transition-colors text-left group flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="w-0 h-0.5 bg-[var(--gold)] group-hover:w-2 transition-all mr-0 group-hover:mr-2" />
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Column 3: Location Map */}
          <div>
            <h3 className="text-xl mb-6 flex items-center">
              <span className="w-1 h-6 bg-[var(--gold)] rounded-full mr-2" />
              Our Location
            </h3>
            <motion.div
              className="w-full h-48 bg-white/10 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7914.338751660077!2d112.78847000000002!3d-7.334866999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fab87edcad15%3A0xb26589947991eea1!2sUniversitas%20Pembangunan%20Nasional%20%E2%80%9CVeteran%E2%80%9D%20Jawa%20Timur!5e0!3m2!1sen!2sus!4v1760606079853!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UPN Veteran Jawa Timur Location"
              ></iframe>
            </motion.div>
            <motion.p
              className="text-sm text-white/80 mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Jl. Rungkut Madya, Gunung Anyar, Surabaya
              <br />
              Jawa Timur 60294, Indonesia
            </motion.p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Global Insight Series - UPN Veteran Jawa Timur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
