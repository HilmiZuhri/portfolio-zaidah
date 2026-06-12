import { motion } from "motion/react";
import { PenTool, Heart, Target, Zap } from "lucide-react";

const valueProps = [
  {
    icon: <PenTool className="text-brand-accent" />,
    title: "Brand Voice",
    description: "Developing consistent, recognizable voices that cut through the noise."
  },
  {
    icon: <Target className="text-brand-accent" />,
    title: "Strategic Impact",
    description: "Data-driven storytelling focused on measurable conversion and growth."
  },
  {
    icon: <Heart className="text-brand-accent" />,
    title: "Human Centric",
    description: "Creating emotive connections that build long-term brand loyalty."
  },
  {
    icon: <Zap className="text-brand-accent" />,
    title: "Creative Edge",
    description: "Fresh perspectives on standard industries to find hidden narratives."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">The Story Behind the Storyteller and Copywriter</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Six years of shaping <br />
              <span className="text-gray-400">global narratives.</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p>
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-display font-bold text-brand-accent">6+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-brand-accent">150+</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest mt-2">Projects Completed</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {valueProps.map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
              >
                <div className="mb-4">{prop.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2">{prop.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
