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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0" style={{ maxWidth: 1280, margin: '0 auto' }}>
        {data.map((f, i) => (
          <div
            key={i}
            className={
              i > 0
                ? 'border-t border-[#42433d] pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10'
                : ''
            }
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 46,
                height: 46,
                borderRadius: '50%',
                border: '1px solid rgba(176, 141, 87, 0.35)',
                backgroundColor: 'rgba(176, 141, 87, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b08d57',
              }}
            >
              {icons[i] || icons[0]}
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 style={{ fontSize: 14, color: '#fffce1', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                {f.title}
              </h4>
              <p style={{ fontSize: 13, color: '#7c7c6f', lineHeight: 1.6, margin: 0, maxWidth: 280 }}>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
