//import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub — Personal notes manager',
  description: 'NoteHub — simple and efficient app to create, search and manage personal notes.',
  openGraph: {
    title: 'NoteHub — Personal notes manager',
    description: 'NoteHub — simple and efficient app to create, search and manage personal notes.',
    //    url: 'https://my-deployed-site.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub App',
      },
    ],
  },
};

const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
