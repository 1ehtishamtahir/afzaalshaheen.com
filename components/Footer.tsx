'use client';

import Image from 'next/image';
import Link from 'next/link';

const EXPLORE_LINKS = ['Unstitched Fabric', 'Ready to Wear', 'Signature Collection', 'Lookbook'];
const SERVICE_LINKS = ['Shipping & Delivery', 'Returns & Exchanges', 'Care Instructions', 'Contact Us'];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#191919', borderTop: '1px solid #42433d', padding: '80px 48px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48 }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Link href="/" style={{ position: 'relative', display: 'block', height: 28, width: 140 }}>
            <Image
              src="/images/logo.png"
              alt="Afzaal Shaheen"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left', filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <p style={{ fontSize: 13, color: '#7c7c6f', lineHeight: 1.7, maxWidth: 300, margin: 0 }}>
            A premium menswear & unstitched-fabric label crafting refined silhouettes with tactile perfection since 1998.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 style={{ fontSize: 12, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            &#123; Explore &#125;
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {EXPLORE_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" style={{ fontSize: 13, color: '#7c7c6f', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Links */}
        <div>
          <h4 style={{ fontSize: 12, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            &#123; Service &#125;
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SERVICE_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" style={{ fontSize: 13, color: '#7c7c6f', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ maxWidth: 1280, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid #42433d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 12, color: '#7c7c6f', margin: 0 }}>
          &copy; {new Date().getFullYear()} Afzaal Shaheen. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service'].map((t) => (
            <Link key={t} href="#" style={{ fontSize: 12, color: '#7c7c6f', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
