import type { Metadata } from "next";
import Link from "next/link";
import initTranslations from "@/src/lib/i18n/server";
import LandingHeader from "@/components/layout/LandingHeader";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedCard from "@/components/ui/AnimatedCard";
import HeroSection from "@/components/ui/HeroSection";
import welcomeIllustration from "@/public/svg/undraw_welcome-cats_tw36.svg";
import {PAGE_LINKS} from "@/constant/page.links";

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await initTranslations();
  
  return {
    title: "Local Guide - " + t("HERO_TITLE"),
    description: t("HERO_SUBTITLE"),
    keywords: "local guide, community help, translation, city tours, local services, helper network",
    metadataBase: new URL('https://localguide.com'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'de': '/de',
      },
    },
    openGraph: {
      title: "Local Guide - " + t("HERO_TITLE"),
      description: t("HERO_SUBTITLE"),
      type: "website",
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      siteName: "Local Guide",
    },
    twitter: {
      card: "summary_large_image",
      title: "Local Guide - " + t("HERO_TITLE"),
      description: t("HERO_SUBTITLE"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const LandingPage = async () => {
  const { t } = await initTranslations();

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Local Guide",
    "description": t("HERO_SUBTITLE"),
    "url": "https://localguide.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://localguide.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "8",
      "offers": [
        {
          "@type": "Offer",
          "name": t("SERVICE_TRANSLATION")
        },
        {
          "@type": "Offer",
          "name": t("SERVICE_CITY_TOURS")
        },
        {
          "@type": "Offer",
          "name": t("SERVICE_STUDY_HELP")
        }
      ]
    }
  };

  const services = [
    { key: "SERVICE_TRANSLATION", icon: "🌐", color: "bg-purple-100 dark:bg-purple-900" },
    { key: "SERVICE_MENTAL_HELP", icon: "💚", color: "bg-green-100 dark:bg-green-900" },
    { key: "SERVICE_EVENTS", icon: "🎉", color: "bg-yellow-100 dark:bg-yellow-900" },
    { key: "SERVICE_CITY_TOURS", icon: "🗺️", color: "bg-blue-100 dark:bg-blue-900" },
    { key: "SERVICE_FIND_OBJECTS", icon: "🔍", color: "bg-pink-100 dark:bg-pink-900" },
    { key: "SERVICE_RECEIVING", icon: "📦", color: "bg-orange-100 dark:bg-orange-900" },
    { key: "SERVICE_STUDY_HELP", icon: "📚", color: "bg-indigo-100 dark:bg-indigo-900" },
    { key: "SERVICE_OTHER", icon: "✨", color: "bg-gray-100 dark:bg-gray-800" },
  ];

  const testimonials = [
    { textKey: "TESTIMONIAL1_TEXT", nameKey: "TESTIMONIAL1_NAME", roleKey: "TESTIMONIAL1_ROLE", avatar: "👩" },
    { textKey: "TESTIMONIAL2_TEXT", nameKey: "TESTIMONIAL2_NAME", roleKey: "TESTIMONIAL2_ROLE", avatar: "👨" },
    { textKey: "TESTIMONIAL3_TEXT", nameKey: "TESTIMONIAL3_NAME", roleKey: "TESTIMONIAL3_ROLE", avatar: "👩‍🦰" },
  ];

  const trustFeatures = [
    { titleKey: "TRUST1_TITLE", descKey: "TRUST1_DESC", icon: "✓" },
    { titleKey: "TRUST2_TITLE", descKey: "TRUST2_DESC", icon: "⭐" },
    { titleKey: "TRUST3_TITLE", descKey: "TRUST3_DESC", icon: "🔒" },
    { titleKey: "TRUST4_TITLE", descKey: "TRUST4_DESC", icon: "💬" },
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <LandingHeader />

        {/* Hero Section */}
        <HeroSection
          heroImage={welcomeIllustration}
          translations={{
            title: t("HERO_TITLE"),
            subtitle: t("HERO_SUBTITLE"),
            getHelp: t("GET_HELP"),
            offerHelp: t("OFFER_HELP"),
          }}
        />

        {/* About Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900" id="about">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
                {t("ABOUT_TITLE")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-4xl mx-auto mb-16">
                {t("ABOUT_INTRO")}
              </p>
            </AnimatedSection>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <AnimatedCard index={0} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-3xl">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("ABOUT_MISSION_TITLE")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("ABOUT_MISSION_DESC")}
                </p>
              </AnimatedCard>

              <AnimatedCard index={1} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 mb-4 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center text-3xl">
                  👁️
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("ABOUT_VISION_TITLE")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("ABOUT_VISION_DESC")}
                </p>
              </AnimatedCard>
            </div>

            {/* Core Values */}
            <AnimatedSection>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("ABOUT_VALUES_TITLE")}
              </h3>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <AnimatedCard index={0} delay={0.1} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("ABOUT_VALUE1_TITLE")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("ABOUT_VALUE1_DESC")}
                </p>
              </AnimatedCard>

              <AnimatedCard index={1} delay={0.1} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("ABOUT_VALUE2_TITLE")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("ABOUT_VALUE2_DESC")}
                </p>
              </AnimatedCard>

              <AnimatedCard index={2} delay={0.1} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("ABOUT_VALUE3_TITLE")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("ABOUT_VALUE3_DESC")}
                </p>
              </AnimatedCard>

              <AnimatedCard index={3} delay={0.1} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="text-4xl mb-3">💪</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t("ABOUT_VALUE4_TITLE")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("ABOUT_VALUE4_DESC")}
                </p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white dark:bg-gray-800 py-16 md:py-24" id="how-it-works">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("HOW_IT_WORKS")}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <AnimatedCard index={0} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-4xl transition-transform hover:rotate-12 duration-300">
                  📝
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("STEP1_TITLE")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("STEP1_DESC")}
                </p>
              </AnimatedCard>
              <AnimatedCard index={1} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center text-4xl transition-transform hover:rotate-12 duration-300">
                  🔍
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("STEP2_TITLE")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("STEP2_DESC")}
                </p>
              </AnimatedCard>
              <AnimatedCard index={2} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-4xl transition-transform hover:rotate-12 duration-300">
                  ✅
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("STEP3_TITLE")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("STEP3_DESC")}
                </p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("SERVICES_TITLE")}
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {services.map((service, index) => (
                <AnimatedCard key={service.key} index={index} delay={0.1}>
                  <div
                    className={`${service.color} p-6 rounded-2xl text-center block shadow-md hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-4xl mb-3 transform transition-transform hover:scale-125 duration-300">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t(service.key)}
                    </h3>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("TESTIMONIALS_TITLE")}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedCard
                  key={index}
                  index={index}
                  delay={0.2}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3 animate-bounce">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t(testimonial.nameKey)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t(testimonial.roleKey)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    &ldquo;{t(testimonial.textKey)}&rdquo;
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800" id="safety">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("TRUST_SAFETY_TITLE")}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {trustFeatures.map((feature, index) => (
                <AnimatedCard key={index} index={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-3xl transition-all hover:scale-110 hover:rotate-12 duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {t(feature.descKey)}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("CTA_TITLE")}
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                {t("CTA_SUBTITLE")}
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={PAGE_LINKS.SIGNUP}
                  className="bg-white hover:bg-gray-100 text-primary-700 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300"
                >
                  {t("SIGN_UP")}
                </Link>
                <Link
                  href={PAGE_LINKS.LOGIN}
                  className="bg-secondary-500 hover:bg-secondary-600 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300"
                >
                  {t("LOGIN")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-white mb-4">
                  {t("FOOTER_ABOUT")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#/about"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_ABOUT")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#/how-it-works"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_HOW_IT_WORKS")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#/safety"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_SAFETY")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="hover:text-white text-primary-100 transition-colors hidden"
                    >
                      {t("FOOTER_CAREERS")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">
                  {t("FOOTER_SUPPORT")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#/help"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_HELP_CENTER")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#/contact"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_CONTACT")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">
                  {t("FOOTER_LEGAL")}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="#/privacy"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_PRIVACY")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#/terms"
                      className="hover:text-white text-primary-100 transition-colors"
                    >
                      {t("FOOTER_TERMS")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-4">Social</h3>
                <div className="flex gap-4 text-2xl">
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    📘
                  </a>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    🐦
                  </a>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p className="text-primary-100">{t("FOOTER_RIGHTS", {year: 2026})}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
