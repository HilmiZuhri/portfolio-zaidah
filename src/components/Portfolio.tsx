import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioItem } from "../types";
import { ExternalLink, X, CheckCircle, Calendar, Briefcase, Award } from "lucide-react";

const projects: PortfolioItem[] = [
  {
    id: "1",
    title: "EcoThread Brand Identity",
    category: "Brand Storytelling",
    description: "Developed the core narrative and brand voice for a sustainable fashion startup, focusing on circular economy and ethical production.",
    challenge: "EcoThread entered an extremely saturated sustainable fashion market where consumer trust was at an all-time low due to industry-wide greenwashing. They needed a distinctive brand narrative that was authentic, transparent, and moved people away from eco-guilt toward positive ecological fashion activism.",
    solution: "Conceived the primary tagline 'Wear the Future, Don't Wear It Out.' We crafted an open-source style brand identity playbook highlighting exact material origins with vivid storytelling. We positioned organic hemp and closed-loop modal not as compromises, but as premium, modern upgrades to daily wardrobes. The tone of voice was tuned to be direct, confident, and deeply authentic.",
    deliverables: ["Primary Tagline Development", "Brand Voice Playbook", "Core Manifesto Writing", "Homepage & Origin Story Copy"],
    results: [
      "+45% increase in newsletter signups at launch",
      "Average session duration on the story page exceeded 4 minutes",
      "Successfully funded Kickstarter campaign in under 12 hours"
    ],
    client: "EcoThread",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop",
    testimonial: {
      quote: "Zaidah didn't just write our copy; she found the soul of our brand. She turned our complex supply chains into a story our community wears with pride.",
      author: "Marcus Thorne",
      role: "Co-Founder, EcoThread"
    }
  },
  {
    id: "2",
    title: "NexGen Tech Campaign",
    category: "Ad Copy",
    description: "A multi-channel digital campaign for a cloud infrastructure provider, simplifying complex technical concepts for SME owners.",
    challenge: "NexGen Cloud offered premium Kubernetes orchestration and low-latency hybrid clouds. However, their primary target audience—SME business owners and non-technical decision makers—felt alienated by conventional, jargon-dense IT copywriting and missed the value proposition entirely.",
    solution: "Pivoted from technical 'how it works' specs to high-level emotional 'how it feels' benefits. Built the campaign around the theme 'Zero-Friction Growth: Leave the Piping to Us.' We replaced cloud jargon with simple metaphors about professional tranquility, flawless scaling, and operating cost reduction.",
    deliverables: ["Paid Social Ad Copy Sets (LinkedIn & Meta)", "High-Converting Landing Page Copy", "3-Part Email Nurture Sequence", "Campaign Headline Ideation"],
    results: [
      "3.4x higher Click-Through Rate (CTR) compared to industry baseline",
      "22% reduction in overall Cost Per Lead (CPL)",
      "Over 400 new qualified free trials initiated within the 30-day campaign"
    ],
    client: "NexGen Cloud",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    testimonial: {
      quote: "She translated our complex backend architecture into visual gold. Our conversion rates are the highest they've ever been.",
      author: "Elena Rostova",
      role: "VP of Marketing, NexGen Tech"
    }
  },
  {
    id: "3",
    title: "Lumina Skincare Website",
    category: "Web Copy",
    description: "Complete website overhaul with a focus on 'quiet luxury' and botanical science storytelling to appeal to high-end demographics.",
    challenge: "Lumina developed an organic, scientific marine-botanical serum. However, their original website read like an academic clinical trial, failing to exhibit the premium sensory allure necessary to command a luxury price tag ($180 USD).",
    solution: "Infused the digital experience with high-concept, sensory language and elegant micro-copy. We introduced the concept of 'The Coastal Slow-Aging Ritual,' detailing cold-pressed algae extraction as an artisanal beauty craft. We balanced clinical metrics with descriptions of aroma, cellular restoration, and self-care.",
    deliverables: ["Full Website Copywriting (12 Core Pages)", "Premium Product Descriptions", "Luxury Packaging/Unboxing Copy Design", "SEO Copy Audit & Integration"],
    results: [
      "88% increase in Average Order Value (AOV)",
      "Bounce rate decreased by 34% within the first month",
      "Organic mentions earned in global Vogue & Harper’s Bazaar columns"
    ],
    client: "Lumina Beauty",
    year: "2022",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
    testimonial: {
      quote: "Zaidah's copy feels like velvet. She captured the feeling of our product in plain text. It reads beautifully but converts like a machine.",
      author: "Sophia Vance",
      role: "Creative Director, Lumina Beauty"
    }
  },
  {
    id: "4",
    title: "The Good Life Podcast",
    category: "Scriptwriting",
    description: "Season-long scriptwriting for a lifestyle podcast exploring the intersection of mental health and professional success.",
    challenge: "With millions of mental wellness programs active online, Inner Bloom's podcast struggled to retain listeners beyond the initial 4-minute segment due to slow-paced, rambling off-the-cuff conversations.",
    solution: "Designed an engaging documentary-style narrative architecture. We framed host monologues around specific thematic question loops, drafted precise transitions to blend interviewee soundbites, and curated compelling intros designed to trigger an emotional hook from the opening second.",
    deliverables: ["12-Episode Narrative Series Outlines", "Host Opening & Closing Script Blocks", "Pacing & Transition Guides", "Podcast Title & Promo Copy"],
    results: [
      "Average listener retention time soared from 35% to 78%",
      "Ranked Top 50 Mental Wellness Podcasts in Southeast Asia",
      "Over 250,000 unique audio downloads achieved in Season 1"
    ],
    client: "Inner Bloom Labs",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2fccd2c78621?q=80&w=2070&auto=format&fit=crop",
    testimonial: {
      quote: "Her script structures completely redefined our show. Our audience feedback tells us that listening feels like watching a premium documentary.",
      author: "Amiruddin Hamid",
      role: "Host & Creator, Inner Bloom"
    }
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Set/Unset body scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4"
          >
            Recent Work
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-brand-primary"
          >
            Curated Case Studies
          </motion.h2>
          <p className="text-brand-secondary text-sm max-w-lg mx-auto mt-4">
            Click on any case study to explore the research phase, direct copy approach, campaign deliverables, and target metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
              id={`portfolio-item-${project.id}`}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold text-brand-accent tracking-widest uppercase mb-1">{project.category}</p>
                    <h3 className="text-2xl font-display font-bold text-brand-primary">{project.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-secondary font-medium">{project.client}</p>
                    <p className="text-xs text-gray-400">{project.year}</p>
                  </div>
                </div>
                <p className="text-brand-secondary leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-brand-primary font-semibold group-hover:text-brand-accent transition-colors">
                  <span>View Full Case Study</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="modal-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white w-full max-w-4xl h-[85vh] md:h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 border border-gray-100"
              id="portfolio-modal"
            >
              {/* Header Actions */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-white/80 hover:bg-white backdrop-blur-sm p-3 rounded-full text-brand-primary border border-gray-100 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  aria-label="Close Case Study"
                  id="close-modal-btn"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto">
                {/* Hero Banner Section */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/50 to-transparent" />
                  
                  {/* Floating Content Over Image */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-2">
                      {selectedProject.category}
                    </p>
                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                      {selectedProject.title}
                    </h1>
                  </div>
                </div>

                {/* Main Grid Content */}
                <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Left Column: Challenges & Solutions */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* The Challenge */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#9c8121] mb-3">
                        The Challenge
                      </h4>
                      <p className="text-brand-secondary text-base leading-relaxed font-normal">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* The Solution */}
                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#9c8121] mb-3">
                        The Creative Solution
                      </h4>
                      <p className="text-brand-secondary text-base leading-relaxed font-normal">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Quotable Real Testimonial */}
                    {selectedProject.testimonial && (
                      <div className="border-l-4 border-brand-accent bg-brand-accent/5 p-6 rounded-r-xl italic text-brand-secondary">
                        <p className="text-lg leading-relaxed mb-4">
                          "{selectedProject.testimonial.quote}"
                        </p>
                        <div>
                          <p className="font-display font-bold text-sm text-brand-primary not-italic">
                            {selectedProject.testimonial.author}
                          </p>
                          <p className="text-xs text-brand-secondary not-italic">
                            {selectedProject.testimonial.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Statistics, Metadata & Deliverables */}
                  <div className="space-y-8 bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                    {/* Case Metadata */}
                    <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6">
                      <div className="flex items-center gap-3">
                        <Briefcase size={18} className="text-brand-accent" />
                        <div>
                          <p className="text-xxs uppercase tracking-wider text-gray-400 font-bold">Client</p>
                          <p className="text-sm font-semibold text-brand-primary">{selectedProject.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-brand-accent" />
                        <div>
                          <p className="text-xxs uppercase tracking-wider text-gray-400 font-bold">Year</p>
                          <p className="text-sm font-semibold text-brand-primary">{selectedProject.year}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Results / Metrics */}
                    <div>
                      <h5 className="text-xs uppercase font-bold tracking-widest text-brand-primary flex items-center gap-2 mb-4">
                        <Award size={16} className="text-brand-accent" /> Key Out-turns
                      </h5>
                      <ul className="space-y-3">
                        {selectedProject.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-emerald-600 mt-1 flex-shrink-0" />
                            <span className="text-brand-secondary text-sm font-medium leading-normal">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Scope of Deliverables */}
                    <div>
                      <h5 className="text-xs uppercase font-bold tracking-widest text-brand-primary mb-4">
                        Scope & Deliverables
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.deliverables.map((item, i) => (
                          <span
                            key={i}
                            className="bg-white px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-brand-secondary"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Action Drawer / Static Sticky Footer */}
              <div className="bg-gray-50 border-t border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs font-medium text-brand-secondary">
                  Inspired by this case study? Let's unlock a distinctive voice for your brand too.
                </p>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="bg-brand-primary text-white text-xs font-bold px-6 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all text-center flex-shrink-0"
                >
                  Initiate Project Brief
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
