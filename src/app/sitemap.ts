import type { MetadataRoute } from "next";
import { fetchAllRealizacjeSlugs } from "@/lib/hygraph-api";

const BASE_URL = "https://labopracownia.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/park-maszyn`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/realizacje`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const slugs = await fetchAllRealizacjeSlugs();

  const realizacjeRoutes: MetadataRoute.Sitemap = slugs
    .filter(Boolean)
    .map((slug) => ({
      url: `${BASE_URL}/realizacje/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...realizacjeRoutes];
}
