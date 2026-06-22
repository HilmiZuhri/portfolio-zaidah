import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PenTool, Heart, Target, Zap, LucideIcon } from "lucide-react";
import { client } from "../lib/sanity";

// Definisikan tipe data lokal
interface StatItem {
  value: string;
  label: string;
}

interface ValuePropItem {
  icon: string;
  title: string;
  description: string;
}

interface AboutData {
  badge?: string;
  headingStart?: string;
  headingAccent?: string;
  paragraphs?: string[];
  stats?: StatItem[];
  valueProps?: ValuePropItem[];
}

// Map string nama ikon ke Komponen Lucide
const iconMap: Record<string, LucideIcon> = {
  PenTool: PenTool,
  Target: Target,
  Heart: Heart,
  Zap: Zap,
};

// Data statis sebagai cadangan (fallback) jika data di Sanity kosong
const fallbackValueProps: ValuePropItem[] = [
  {
    icon: "PenTool",
    title: "Brand Voice",
    description: "Developing consistent, recognizable voices that cut through the noise."
  },
  {
    icon: "Target",
    title: "Strategic Impact",
    description: "Data-driven storytelling focused on measurable conversion and growth."
  },
  {
    icon: "Heart",
    title: "Human Centric",
    description: "Creating emotive connections that build long-term brand loyalty."
  },
  {
    icon: "Zap",
    title: "Creative Edge",
    description: "Fresh perspectives on standard industries to find hidden narratives."
  }
];

const fallbackStats: StatItem[] = [
  { value: "6+", label: "Years of Experience" },
  { value: "150+", label: "Projects Completed" }
];

const fallbackParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
];

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    const query = `*[_type == "about"][0]`;

    client
      .fetch(query)
      .then((res) => {
        if (res) {
          setData(res);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data About dari Sanity:", err);
        setLoading(false);
      });
  }, []);

  // Menentukan variabel berdasarkan data Sanity atau Fallback
  const badge = data?.badge || "The Story Behind the Storyteller and Copywriter";
  const headingStart = data?.headingStart || "Six years of shaping";
  const headingAccent = data?.headingAccent || "global narratives.";
  const paragraphs = data?.paragraphs && data.paragraphs.length > 0 ? data.paragraphs : fallbackParagraphs;
  const stats = data?.stats && data.stats.length > 0 ? data.stats : fallbackStats;
  const valueProps = data?.valueProps && data.valueProps.length > 0 ? data.valueProps : fallbackValueProps;

  return (
    <section id="about" className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {badge && (
              <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">
                {badge}
              </p>
            )}
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              {headingStart} <br />
              <span className="text-gray-400">{headingAccent}</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              {paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
            </div>
            
            {stats.length > 0 && (
              <div className="mt-12 grid grid-cols-2 gap-8">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-4xl font-display font-bold text-brand-accent">{stat.value}</p>
                    <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueProps.map((prop, i) => {
              // Dapatkan komponen ikon yang cocok dari map, fallback ke PenTool jika tidak ditemukan
              const IconComponent = iconMap[prop.icon] || PenTool;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <div className="mb-4">
                    <IconComponent className="text-brand-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">{prop.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{prop.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}