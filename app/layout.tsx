import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Afzaal Shaheen | Premium Menswear & Unstitched Fabric',
  description: 'An editorial, premium menswear brand offering exquisite unstitched fabrics and ready-to-wear collections. Crafted with tactile refinement since 1998.',
  keywords: 'menswear, unstitched fabric, premium clothing, pakistani menswear, luxury fabrics',
  authors: [{ name: 'Afzaal Shaheen' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* Body background/color is set in globals.css body rule — no inline style to avoid hydration mismatch */}
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
