import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: '404 — Page not found',
  description: 'The requested page was not found on NoteHub.',
  openGraph: {
    title: '404 — Page not found',
    description: 'The requested page was not found on NoteHub.',
    // url: 'https://my-deployed-site.vercel.app/not-found',
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

export default function NotFound() {
  return (
    <>
      <h1>404 — Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
