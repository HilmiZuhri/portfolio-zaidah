export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-2xl font-display font-bold tracking-tight text-brand-primary mb-6">
          ZAIDAH<span className="text-brand-accent">.</span>
        </div>
        
        <p className="text-brand-secondary text-sm max-w-sm mx-auto mb-8">
          A storyteller by nature, a copywriter by trade. Shaping brand narratives and global conversations since 2018.
        </p>
        
        <nav className="flex justify-center space-x-8 mb-8">
          <a href="#home" className="text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-accent transition-colors">Home</a>
          <a href="#about" className="text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-accent transition-colors">About</a>
          <a href="#portfolio" className="text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-accent transition-colors">Portfolio</a>
          <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-accent transition-colors">Contact</a>
        </nav>
        
        <div className="text-xs text-gray-400 font-medium">
          &copy; {year} Zaidah Izzawati. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
