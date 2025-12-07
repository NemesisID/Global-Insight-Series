import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, User, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

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

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--forest-green)] to-[var(--olive-green)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare className="w-20 h-20 mx-auto mb-6" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-white/90"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </motion.p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl text-[var(--forest-green)] mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 mb-2 block">
                        Your Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="pl-12 h-12 bg-[var(--cream)] border-0 focus-visible:ring-[var(--forest-green)]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 mb-2 block">
                        Your Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="pl-12 h-12 bg-[var(--cream)] border-0 focus-visible:ring-[var(--forest-green)]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-gray-700 mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="h-12 bg-[var(--cream)] border-0 focus-visible:ring-[var(--forest-green)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-700 mb-2 block">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="bg-[var(--cream)] border-0 focus-visible:ring-[var(--forest-green)] resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[var(--forest-green)] text-white py-4 rounded-full hover:bg-[var(--olive-green)] transition-colors flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contact Information */}
            <div className="space-y-8">
              <AnimatedSection>
                <div>
                  <h2 className="text-3xl text-[var(--forest-green)] mb-8">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <Card className="border-2 border-[var(--gold)] shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg text-[var(--forest-green)] mb-2">
                              Email Us
                            </h3>
                            <p className="text-gray-700 mb-1">gis@upnjatim.ac.id</p>
                            <p className="text-gray-700">humas@upnjatim.ac.id</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-[var(--bronze)] shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="w-12 h-12 bg-[var(--bronze)] rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg text-[var(--forest-green)] mb-2">
                              Our Office
                            </h3>
                            <p className="text-gray-700">
                              <br />
                              UPN "Veteran" Jawa Timur
                              <br />
                              Jl. Rungkut Madya, Gunung Anyar
                              <br />
                              Surabaya, Jawa Timur 60294
                              <br />
                              Indonesia
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="h-64">
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
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
