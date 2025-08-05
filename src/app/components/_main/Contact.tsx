"use client";

import { motion, Variants } from "framer-motion";
import {
  Send,
  Instagram,
  Facebook,
  Mail,
  MapPin,
  Phone,
  Clock,
  Building,
} from "lucide-react";
import Card from "../ui/card";
import StickyHeader from "../ui/sticky-header";
import { AnimatedText, FadeInView } from "../../anim";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="relative">
      <StickyHeader
        className="px-2 md:ml-0 md:px-0"
        title="KONTAKT"
        delay={0.2}
      />

      <FadeInView className="relative z-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {/* Contact Form - Left side (50% width) */}
            <motion.div variants={itemVariants}>
              <Card className="cursor-default p-8">
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      placeholder="Imię"
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                    />
                    <input
                      placeholder="Nazwisko"
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                    />
                  </div>

                  <input
                    placeholder="Email"
                    type="email"
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                  />

                  <textarea
                    placeholder="Wiadomość..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white transition-colors placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                  />

                  <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white transition-all hover:border-white/40 hover:bg-white/20">
                    <span>Wyślij</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Right side - Two cards stacked (50% width) */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Contact Info Card - 1/3 height */}
              <Card className="h-[200px] cursor-default p-4">
                <div className="space-y-4 text-stone-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-stone-400" />
                        <h4 className="text-sm font-medium text-stone-200">
                          <AnimatedText text="Adres" delay={0.1} />
                        </h4>
                      </div>
                      <p className="text-xs text-stone-400">
                        <AnimatedText
                          text="ul. Przemysłowa 34, 04-001 Warszawa"
                          delay={0.2}
                        />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-stone-400" />
                        <h4 className="text-sm font-medium text-stone-200">
                          <AnimatedText text="Telefon" delay={0.3} />
                        </h4>
                      </div>
                      <p className="text-xs text-stone-400">
                        <AnimatedText text="+48 500 123 456" delay={0.4} />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-stone-400" />
                        <h4 className="text-sm font-medium text-stone-200">
                          <AnimatedText text="Email" delay={0.5} />
                        </h4>
                      </div>
                      <p className="text-xs text-stone-400">
                        <AnimatedText text="biuro@labo.com.pl" delay={0.6} />
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-stone-400" />
                        <h4 className="text-sm font-medium text-stone-200">
                          <AnimatedText text="Godziny pracy" delay={0.7} />
                        </h4>
                      </div>
                      <p className="text-xs text-stone-400">
                        <AnimatedText text="Pn-Pt: 9:00-17:00" delay={0.8} />
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-stone-400">
                      <AnimatedText text="Social Media" delay={0.9} />
                    </span>
                    <div className="flex space-x-2">
                      {[
                        {
                          icon: Instagram,
                          href: "https://instagram.com",
                          label: "Instagram",
                        },
                        {
                          icon: Facebook,
                          href: "https://facebook.com",
                          label: "Facebook",
                        },
                        {
                          icon: MapPin,
                          href: "https://maps.google.com",
                          label: "Location",
                        },
                      ].map((social) => {
                        const SocialIcon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            className="group/social flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all hover:border-white/40 hover:bg-white/20"
                            aria-label={social.label}
                          >
                            <SocialIcon className="h-3 w-3 text-stone-300 transition-colors group-hover/social:text-white" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Card - 2/3 height */}
              <Card className="cursor-default p-4">
                <div className="h-full w-full overflow-hidden rounded-lg">
                  <iframe
                    className="h-full w-full border-0 grayscale transition-all duration-300 hover:grayscale-0"
                    src="https://www.google.com/maps?q=ul.+Przemys%C5%82owa+34,+04-001+Warszawa&output=embed&z=15"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokalizacja biura Labo"
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </FadeInView>
    </section>
  );
}
