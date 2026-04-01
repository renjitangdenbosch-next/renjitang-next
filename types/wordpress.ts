export type WpRendered = { rendered: string; protected?: boolean };

export type WpPage = {
  id: number;
  slug: string;
  status: string;
  title: WpRendered;
  content: WpRendered;
  excerpt: WpRendered;
  link: string;
  modified: string;
  parent: number;
  featured_media?: number;
};

export type WpSiteInfo = {
  name: string;
  description: string;
  url: string;
};
