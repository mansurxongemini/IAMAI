import type { Metadata } from 'next';
import type { Viewport } from 'next';
import localFont from 'next/font/local';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';
import { DICTIONARIES } from '@core/i18n';
import './globals.css';

// Self-hosted fonts (no build-time Google Fonts request, works offline). One system for the
// landing and the workspace: Parkinsans for text and display, Geist Mono for labels and figures,
// Patrick Hand SC for the hand-written notes. Inter stays only as the per-glyph fallback for the
// Uzbek ʻ (U+02BB), which Parkinsans does not draw; it is not preloaded.
const parkinsans = localFont({
  src: [
    { path: '../node_modules/@fontsource-variable/parkinsans/files/parkinsans-latin-wght-normal.woff2', weight: '300 800' },
    { path: '../node_modules/@fontsource-variable/parkinsans/files/parkinsans-latin-ext-wght-normal.woff2', weight: '300 800' },
  ],
  variable: '--font-parkinsans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

const geistMono = localFont({
  src: '../node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-geist-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

const hand = localFont({
  src: '../node_modules/@fontsource/patrick-hand-sc/files/patrick-hand-sc-latin-400-normal.woff2',
  weight: '400',
  variable: '--font-patrick',
  display: 'swap',
  preload: false,
  fallback: ['cursive'],
});

const meta = DICTIONARIES.en.meta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: 'IAM AI',
  openGraph: { title: meta.title, description: meta.shareDescription, type: 'website' },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.shareDescription },
};

// Runs before paint: theme (saved choice, else dark — the landing's ground) and the hero-entrance flag. No flash.
const THEME_BOOT = `(function(){var d=document.documentElement;d.classList.add('m-enter');try{var t=localStorage.getItem('iam_theme');var dark=t==='system'?matchMedia('(prefers-color-scheme: dark)').matches:t!=='light';d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: '#121213',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${parkinsans.variable} ${inter.variable} ${geistMono.variable} ${hand.variable}`}
    >
      <head>
        {/* Hero entrance: the class is set before paint so the hero never flashes un-entered. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <WorkspaceProvider>{children}</WorkspaceProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
