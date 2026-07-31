export interface HeroContent {
  eyebrow: string;
  line1: string;
  line2: string;
  subheading: string;
  ctaText: string;
  bgImage: string;
}

export interface BrandStatementContent {
  eyebrow: string;
  text: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  paddingTop: number;
}

export interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface FabricBlock {
  eyebrow: string;
  title: string;
  body: string;
}

export interface LookbookItem {
  id: number;
  src: string;
  alt: string;
  tall: boolean;
}

export interface TrustItem {
  title: string;
  body: string;
}

export interface NewsletterContent {
  eyebrow: string;
  title: string;
  body: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterContent {
  brandText: string;
  copyright: string;
  policyLinks: string[];
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

export interface SiteContent {
  hero: HeroContent;
  brandStatement: BrandStatementContent;
  collections: CollectionItem[];
  newArrivals: ProductItem[];
  fabricStory: {
    bgImage: string;
    blocks: FabricBlock[];
  };
  lookbook: LookbookItem[];
  trustStrip: TrustItem[];
  newsletter: NewsletterContent;
  socialLinks: SocialLink[];
  footer: FooterContent;
  contact: ContactContent;
}
