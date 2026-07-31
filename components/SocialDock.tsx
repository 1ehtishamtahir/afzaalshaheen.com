'use client';

import { useState } from 'react';
import SocialIcon from './SocialIcon';

interface SocialDockProps {
  socialLinks: { label: string; href: string }[];
}

export default function SocialDock({ socialLinks }: SocialDockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Expanding social list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {socialLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#191919',
              border: '1px solid #42433d',
              color: '#fffce1',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.7)',
              transition: `opacity 0.25s ease ${i * 0.05}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.4)',
            }}
          >
            <SocialIcon label={link.label} size={16} />
          </a>
        ))}
      </div>

      {/* Trigger */}
      <button
        aria-label="Social links"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          cursor: 'pointer',
          background: 'var(--gradient-gold)',
          color: '#0e100f',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(176, 141, 87, 0.35)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </div>
  );
}
