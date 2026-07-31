'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BrandStatement from '@/components/BrandStatement';
import FeaturedCollections from '@/components/FeaturedCollections';
import NewArrivals from '@/components/NewArrivals';
import FabricStory from '@/components/FabricStory';
import Lookbook from '@/components/Lookbook';
import TrustStrip from '@/components/TrustStrip';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import SocialDock from '@/components/SocialDock';

export default function Home() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Fetch dynamic content
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to fetch site content', error);
      }
    };

    fetchContent();

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0e100f', color: '#fffce1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading Afzaal Shaheen...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow overflow-hidden">
        <Hero data={content.hero} />
        <BrandStatement data={content.brandStatement} />
        <FeaturedCollections data={content.collections} />
        <NewArrivals data={content.newArrivals} />
        <FabricStory data={content.fabricStory} />
        <Lookbook data={content.lookbook} />
        <TrustStrip data={content.trustStrip} />
        <Newsletter data={content.newsletter} />
      </main>
      <Footer data={{ socialLinks: content.socialLinks, footer: content.footer, contact: content.contact }} />
      <SocialDock socialLinks={content.socialLinks} />
    </>
  );
}
