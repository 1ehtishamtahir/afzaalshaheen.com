'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setHoveredLink(null);
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  const navLinks = ['Collections', 'New Arrivals', 'Fabric', 'About', 'Contact'];

  return (
    <div
      style={{
        position: 'fixed',
        top: scrolled ? 16 : 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 24px',
        transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <header
        style={{
          width: '100%',
          maxWidth: scrolled ? 1000 : 1280,
          borderRadius: scrolled ? 100 : 0,
          border: scrolled ? '1px solid rgba(66, 67, 61, 0.5)' : '1px solid transparent',
          backgroundColor: scrolled ? 'rgba(14, 16, 15, 0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          padding: scrolled ? '12px 32px' : '24px 0',
          transition: 'max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ position: 'relative', display: 'block', height: scrolled ? 36 : 44, width: scrolled ? 160 : 190, flexShrink: 0, transition: 'width 0.5s, height 0.5s' }}>
          <Image
            src="/images/logo.png"
            alt="Afzaal Shaheen"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left', filter: 'brightness(0) invert(1)' }}
            priority
          />
        </Link>

        {/* Premium Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: scrolled ? 4 : 12 }} className="hidden md:flex">
          {navLinks.map((link) => {
            const isHovered = hoveredLink === link;
            return (
              <Link
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => setHoveredLink(link)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: scrolled ? '6px 12px' : '8px 16px',
                  fontSize: scrolled ? 11 : 12,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: isHovered ? '#fffce1' : 'rgba(255, 252, 225, 0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease, padding 0.5s, font-size 0.5s',
                  position: 'relative',
                }}
              >
                {link}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255, 252, 225, 0.75)',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fffce1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 252, 225, 0.75)')}
          >
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
          
          <Link
            href="#cart"
            style={{
              position: 'relative',
              color: 'rgba(255, 252, 225, 0.75)',
              padding: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fffce1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 252, 225, 0.75)')}
          >
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'linear-gradient(114.41deg, #b08d57 20%, #e8c88f 65%)',
                color: '#0e100f',
                fontSize: 9,
                fontWeight: 700,
                width: 15,
                height: 15,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 2px #0e100f',
              }}
            >
              0
            </span>
          </Link>
        </div>
      </header>
    </div>
  );
}
