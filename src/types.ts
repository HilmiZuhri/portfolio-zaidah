export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  deliverables: string[];
  imageUrl: string;
  client: string;
  year: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}
