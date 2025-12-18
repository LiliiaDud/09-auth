import type { Metadata } from 'next';
import CreateNote from './CreateNote';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note in NoteHub.',
  openGraph: {
    title: 'Create note',
    description: 'Create a new note in NoteHub.',
    url: 'https://08-zustand-six-pi.vercel.app/notes/action/create',
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

export default function CreateNotePage() {
  return <CreateNote />;
}
