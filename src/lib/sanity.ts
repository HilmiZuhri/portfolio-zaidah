import { createClient } from "@sanity/client";
import { PortfolioItems } from "../types";
import { createImageUrlBuilder } from "@sanity/image-url";

// Client-safe environment loaders
const envs = (import.meta as any).env || {};
const projectId = envs.VITE_SANITY_PROJECT_ID || "";
const dataset = envs.VITE_SANITY_DATASET || "production";
const apiVersion = envs.VITE_SANITY_API_VERSION || "2024-03-11";

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

// Helper untuk membangun URL gambar dari Sanity asset
const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (builder && source) {
    return builder.image(source);
  }
  // Fallback sederhana jika client belum siap atau source kosong
  return {
    url: () => "",
  };
}

// Interface untuk data Hero
export interface HeroData {
  badge?: string;
  headingStart?: string;
  headingAccent?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: any;
  imageAlt?: string;
  quote?: string;
}

export interface AboutData {
  badge?: string;
  headingStart?: string;
  headingAccent?: string;
  paragraphs?: string[];
  stats?: Array<{ value: string; label: string }>;
  valueProps?: Array<{ icon: string; title: string; description: string }>;
}

export interface PortfolioItem {
  id: string; // Dipetakan dari _id
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  client: string;
  year: string;
  imageUrl: string; // Hasil resolusi dari mainImage atau link eksternal
  results?: string[];
  deliverables?: string[];
  testimonial?: {
    quote?: string;
    author?: string;
    role?: string;
  };
}

// Data Fallback jika koneksi Sanity belum aktif atau data kosong
const fallbackProjects: PortfolioItem[] = [
  {
    id: "fallback-1",
    title: "The Craft of Modern Copywriting",
    category: "Brand Storytelling",
    description: "A comprehensive brand voice redesign that drove record engagement.",
    challenge: "The client struggled with inconsistent messaging across multiple platforms.",
    solution: "We unified the tone of voice through precise style guides and key brand pillars.",
    client: "Acme Corp",
    year: "2023",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    results: ["45% Increase in conversion", "Unified brand persona"],
    deliverables: ["Tone of Voice Guide", "Website Copywriting"],
    testimonial: {
      quote: "Working with Zaidah completely transformed how we talk to our audience.",
      author: "Jane Doe",
      role: "Marketing Director at Acme"
    }
  }
];

// Fungsi untuk mengambil data dari Sanity
export async function fetchPortfolioFromSanity(): Promise<PortfolioItem[]> {
  if (!client) {
    console.warn("Sanity client tidak terkonfigurasi. Menggunakan data demo/fallback.");
    return fallbackProjects;
  }

  const query = `*[_type == "project"] | order(year desc, _createdAt desc) {
    "id": _id,
    title,
    category,
    description,
    challenge,
    solution,
    client,
    year,
    mainImage,
    imageUrl,
    results,
    deliverables,
    testimonial
  }`;

  try {
    const rawProjects = await client.fetch(query);
    
    if (!rawProjects || rawProjects.length === 0) {
      return fallbackProjects;
    }

    // Melakukan mapping data mentah Sanity ke format PortfolioItem yang dibutuhkan React
    return rawProjects.map((project: any) => {
      let finalImageUrl = "";
      
      if (project.mainImage) {
        // Jika user upload gambar langsung ke Sanity
        finalImageUrl = urlFor(project.mainImage).url();
      } else if (project.imageUrl) {
        // Jika user menggunakan alternatif URL eksternal
        finalImageUrl = project.imageUrl;
      } else {
        // Fallback image default jika keduanya kosong
        finalImageUrl = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80";
      }

      return {
        id: project.id,
        title: project.title || "",
        category: project.category || "General",
        description: project.description || "",
        challenge: project.challenge || "",
        solution: project.solution || "",
        client: project.client || "Confidential",
        year: project.year || "N/A",
        imageUrl: finalImageUrl,
        results: project.results || [],
        deliverables: project.deliverables || [],
        testimonial: project.testimonial || null,
      };
    });
  } catch (error) {
    console.error("Gagal melakukan fetch data portfolio dari Sanity, menggunakan fallback:", error);
    return fallbackProjects;
  }
}

// String instruksi skema untuk disalin di drawer panduan portfolio
export const sanitySchemaInstructions = `
export default {
  name: 'project',
  type: 'document',
  title: 'Portfolio Project',
  fields: [
    { name: 'title', type: 'string', title: 'Project Title' },
    { name: 'category', type: 'string', title: 'Category' },
    { name: 'description', type: 'text', title: 'Brief Description' },
    { name: 'challenge', type: 'text', title: 'The Challenge' },
    { name: 'solution', type: 'text', title: 'The Solution' },
    { name: 'client', type: 'string', title: 'Client Name' },
    { name: 'year', type: 'string', title: 'Year' },
    { name: 'mainImage', type: 'image', title: 'Project Display Image', options: { hotspot: true } },
    { name: 'imageUrl', type: 'url', title: 'Alternative Image URL' },
    { name: 'results', type: 'array', title: 'Key Out-turns', of: [{ type: 'string' }] },
    { name: 'deliverables', type: 'array', title: 'Scope & Deliverables', of: [{ type: 'string' }] },
    { name: 'testimonial', type: 'object', title: 'Client Testimonial', fields: [
      { name: 'quote', type: 'text', title: 'Quote' },
      { name: 'author', type: 'string', title: 'Author Name' },
      { name: 'role', type: 'string', title: 'Author Role' }
    ]}
  ]
};`;


