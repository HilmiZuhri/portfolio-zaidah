import { motion } from "motion/react";
import { Mail, Linkedin, Instagram, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-accent/5 rounded-3xl p-12 md:p-20 relative">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Mail size={200} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-6">
                Ready to find <br />
                <span className="text-brand-accent">your voice?</span>
              </h2>
              <p className="text-lg text-brand-secondary mb-10 max-w-md">
                Whether you need a full brand overhaul or a single landing page that converts, I'm here to help. Let's create something remarkable together.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:hello@zaidah.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email</p>
                    <p className="text-xl font-display font-bold text-brand-primary">zaidah.izzawati@gmail.com</p>
                  </div>
                </a>
                
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-brand-accent/20 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-brand-accent/20 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            <motion.form 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell me about your project..." 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-brand-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg">
                  Send Message <ArrowRight size={20} />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
