import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "research/",
    "projects/",
    "publications/",
    "team/",
    "collaborate/",
  ].map((route) => ({
    url: `${siteConfig.url}/${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
