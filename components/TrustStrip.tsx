'use client';

interface TrustItem {
  title: string;
  body: string;
}

interface TrustStripProps {
  data: TrustItem[];
}

export default function TrustStrip({ data }: TrustStripProps) {
  const icons = [
    // Shipping
    <svg key="ship" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75m-5.25 2.25H18M2.25 12h1.5" />
    </svg>,
    // Security
    <svg key="sec" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </svg>,
    // Support/Time
    <svg key="time" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width={22} height={22}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ];

  return (
    <section
      style={{
        backgroundColor: '#0e100f',
        borderTop: '1px solid #42433d',
        borderBottom: '1px solid #42433d',
        padding: '64px 48px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32,
        }}
      >
        {data.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 20,
              padding: i === 1 ? '0 32px' : '0',
              borderLeft: i > 0 ? '1px solid #42433d' : 'none',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '1px solid #42433d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fffce1',
              }}
            >
              {icons[i] || icons[0]}
            </div>
            <div>
              <h4 style={{ fontSize: 13, color: '#fffce1', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, margin: '0 0 8px 0' }}>
                {f.title}
              </h4>
              <p style={{ fontSize: 13, color: '#7c7c6f', lineHeight: 1.6, margin: 0 }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
