"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { PAGE_LINKS } from "@/constant/page.links";

type Props = {
  translations: {
    title: string;
    subtitle: string;
    getHelp: string;
    offerHelp: string;
  };
  heroImage: StaticImageData;
};

const HeroSection = ({ translations, heroImage }: Props) => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <AnimatedSection className="flex-1 text-center md:text-left" delay={0}>
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            {translations.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {translations.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Link
              href={PAGE_LINKS.SIGNUP}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
            >
              {translations.getHelp}
            </Link>
            <Link
              href={PAGE_LINKS.SIGNUP}
              className="bg-secondary-500 hover:bg-secondary-600 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
            >
              {translations.offerHelp}
            </Link>
          </motion.div>
        </AnimatedSection>
        <AnimatedSection
          className="flex-1 w-full max-w-md md:max-w-lg"
          delay={0.2}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
            <Image
              src={heroImage}
              alt="Community helping each other"
              className="relative z-10 w-full h-auto drop-shadow-2xl animate-bounce"
              priority
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
