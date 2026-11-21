import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { WorkspaceProvider } from '@/components/WorkspaceProvider';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IAM AI — Executive Development & Strategic Execution',
  description:
    'Executive personal development, rhetoric mastery, international & legal certification roadmaps, and AI execution assistant in English and Uzbek.',
  openGraph: {
    title: 'IAM AI — Executive Development & Strategic Execution',
    description:
      'Executive personal development, rhetoric mastery, international & legal certification roadmaps, and AI execution assistant in English and Uzbek.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IAM AI — Executive Development & Strategic Execution',
    description:
      'Executive personal development, rhetoric mastery, international & legal certification roadmaps, and AI execution assistant in English and Uzbek.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} ${ibmPlexMono.variable}`}
    >
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <WorkspaceProvider>{children}</WorkspaceProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
