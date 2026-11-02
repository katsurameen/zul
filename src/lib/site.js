// Single source of truth for site-level SEO metadata.
// Set NEXT_PUBLIC_SITE_URL in your environment to the real production origin
// (e.g. https://www.zumawahib.my.id) so canonical, OG and sitemap URLs resolve.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.zumawahib.my.id"
).replace(/\/$/, "");

export const siteName = "Zulfa Sulthany";

export const siteTitle = "Zulfa Sulthany - Backend Developer";

export const siteDescription =
  "Portfolio of Zulfa Sulthany, a backend developer based in Bandung, Indonesia. Selected work in backend services, web, mobile, and machine learning.";

export const socialLinks = [
  "https://github.com/katsurameen",
  "https://linkedin.com/in/zulfasulthany",
  "https://instagram.com/zlf_sltn",
];

// schema.org Person, used for rich results in Google.
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    image: `${siteUrl}/Images/zulfa.png`,
    jobTitle: "Backend Developer",
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandung",
      addressCountry: "ID",
    },
    sameAs: socialLinks,
    knowsAbout: [
      "Backend Development",
      "REST APIs",
      "Python",
      "Next.js",
      "Machine Learning",
      "PostgreSQL",
      "Docker",
    ],
  };
}
