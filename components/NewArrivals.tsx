'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface NewArrivalsProps {
  data: Product[];
}

export default function NewArrivals({ data }: NewArrivalsProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="new-arrivals" style={{ backgroundColor: '#0e100f', padding: '80px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: 14, color: 'rgba(255,252,225,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              &#123; New Arrivals &#125;
            </span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: '#fffce1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
              Tactile Masterpieces
            </h2>
          </div>
          <Link href="#all-products" className="btn-ghost-pill" style={{ fontSize: 13, padding: '10px 22px' }}>
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
        >
          {data.map((p) => (
            <div key={p.id} className="product-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer' }}>
              <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', backgroundColor: '#191919' }}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease', filter: 'brightness(0.9)' }}
                  sizes="(max-width: 1280px) 25vw, 300px"
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.04)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
                />
              </div>
              <div>
                <p style={{ fontSize: 14, color: '#fffce1', fontWeight: 500, margin: '0 0 4px 0' }}>{p.name}</p>
                <p style={{ fontSize: 13, color: '#7c7c6f', margin: 0 }}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 1, backgroundColor: '#42433d', marginTop: 80 }} />
      </div>
    </section>
  );
}
