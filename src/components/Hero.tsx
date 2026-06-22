import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { client, urlFor, HeroData } from "../lib/sanity";
import defaultImage from "../assets/image.png"; // Fallback image lokal

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    // Query untuk mengambil dokumen pertama bermuatan tipe 'hero'
    const query = `*[_type == "hero"][0]`;

    client
      .fetch(query)
      .then((data) => {
        if (data) {
          setHeroData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data Hero dari Sanity:", err);
        setLoading(false);
      });
  }, []);

  // Nilai fallback jika data kosong atau belum selesai dimuat dari CMS
  const badge = heroData?.badge || "6+ Years of Experience";
  const headingStart = heroData?.headingStart || "Stories";
  const headingAccent = heroData?.headingAccent || "That Stick.";
  const description =
    heroData?.description ||
    "I'm Zaidah Izzawati, a senior copywriter and brand storyteller. I help brands find their voice and turn complex ideas into narratives that resonate, engage, and convert.";
  const primaryCtaText = heroData?.primaryCtaText || "View Portfolio";
  const primaryCtaLink = heroData?.primaryCtaLink || "#portfolio";
  const secondaryCtaText = heroData?.secondaryCtaText || "Let's Talk";
  const secondaryCtaLink = heroData?.secondaryCtaLink || "#contact";
  const imageSrc = heroData?.image ? urlFor(heroData.image).url() : defaultImage;
  const imageAlt = heroData?.imageAlt || "Copywriting desk";
  const quote =
    heroData?.quote ||
    '"Good copy isn\'t just about clear words; it\'s about the invisible connection between a brand and its audience."';

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-brand-accent)_0%,_transparent_70%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-6"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-brand-accent">
                {badge}
              </span>
            </motion.div>
          )}
          
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-8">
            {headingStart} <br />
            <span className="text-brand-accent">{headingAccent}</span>
          </h1>
          
          <p className="text-xl text-brand-secondary leading-relaxed max-w-xl mb-10">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={primaryCtaLink} 
              className="px-8 py-4 bg-brand-primary text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              {primaryCtaText} <ArrowRight size={20} />
            </a>
            <a 
              href={secondaryCtaLink} 
              className="px-8 py-4 bg-white border border-gray-200 text-brand-primary rounded-lg flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-all hover:border-brand-accent"
            >
              {secondaryCtaText}
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
        >
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {quote && (
            <motion.div 
              className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-white italic text-lg leading-relaxed">
                {quote}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}