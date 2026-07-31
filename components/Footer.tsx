'use client';

import Image from 'next/image';
import Link from 'next/link';
import SocialIcon from './SocialIcon';

const EXPLORE_LINKS = ['Unstitched Fabric', 'Ready to Wear', 'Signature Collection', 'Lookbook'];
const SERVICE_LINKS = ['Shipping & Delivery', 'Returns & Exchanges', 'Care Instructions', 'Contact Us'];

interface FooterProps {
  data: {
    socialLinks: { label: string; href: string }[];
    footer: {
      brandText: string;
      copyright: string;
      policyLinks: string[];
    };
    contact: {
      phone: string;
      email: string;
      address: string;
      whatsapp: string;
    };
  };
}

export default function Footer({ data }: FooterProps) {
  const { socialLinks, footer, contact } = data;
  const linkStyle: React.CSSProperties = { fontSize: 13, color: '#7c7c6f', textDecoration: 'none', transition: 'color 0.2s' };

  return (
    <footer style={{ backgroundColor: '#191919', borderTop: '1px solid #42433d', padding: '80px 48px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
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
            {footer.brandText}
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 style={{ fontSize: 12, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Explore
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {EXPLORE_LINKS.map((link) => (
              <li key={link}>
                <Link href="#" style={linkStyle}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h4 style={{ fontSize: 12, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Contact
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={linkStyle}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
              >
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} style={linkStyle}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
              >
                {contact.email}
              </a>
            </li>
            <li>
              <span style={{ fontSize: 13, color: '#7c7c6f', lineHeight: 1.5 }}>{contact.address}</span>
            </li>
            {contact.whatsapp && (
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
                >
                  WhatsApp Us
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 style={{ fontSize: 12, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            Follow
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: 10 }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#fffce1'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#7c7c6f'; }}
                >
                  <span style={{ display: 'inline-flex', opacity: 0.8 }}>
                    <SocialIcon label={link.label} size={16} />
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ maxWidth: 1280, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid #42433d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontSize: 12, color: '#7c7c6f', margin: 0 }}>
          &copy; {new Date().getFullYear()} {footer.copyright}
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {footer.policyLinks.map((t) => (
            <Link key={t} href="#" style={linkStyle}
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
