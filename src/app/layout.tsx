import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'აკადემიკოსი · akademikosi — Bar & Kitchen · Batumi',
  description: 'Craft cocktails, kitchen, live music. Mon-Wed 19:00-02:00, Fri-Sun 19:00-03:00. ნოე ჟორდანიას 35/37, ბათუმი',
  keywords: 'akademikosi, აკადემიკოსი, bar, kitchen, batumi, cocktails, live music',
  openGraph: {
    title: 'აკადემიკოსი · akademikosi — Bar & Kitchen',
    description: 'Craft cocktails, kitchen, live music in Batumi',
    url: 'https://akademikosi.pages.dev',
    siteName: 'აკადემიკოსი · Akademikosi',
    images: [
      {
        url: 'https://akademikosi.pages.dev/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ka',
    type: 'website',
  },
  other: {
    'theme-color': '#0a0a0a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'აკადემიკოსი',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Darker+Grotesque:wght@300;400;500;600;700;800;900&family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&family=Noto+Serif+Georgian:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
