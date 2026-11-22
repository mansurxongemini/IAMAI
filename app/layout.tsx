import type { Metadata } from 'next';
import type { Viewport } from 'next';
import localFont from 'next/font/local';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';
import { DICTIONARIES } from '@core/i18n';
import './globals.css';

// Self-hosted fonts (no build-time Google Fonts request, works offline). One system for the
// landing and the workspace: Inter for text, Anton for display, Martian Mono for labels and figures.
const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const anton = localFont({
  src: '../node_modules/@fontsource/anton/files/anton-latin-400-normal.woff2',
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
  fallback: ['Impact', 'Arial Narrow', 'sans-serif'],
});

const martian = localFont({
  src: [
    { path: '../node_modules/@fontsource/martian-mono/files/martian-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/martian-mono/files/martian-mono-latin-500-normal.woff2', weight: '500' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
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
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${anton.variable} ${martian.variable}`}
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
