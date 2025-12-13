import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0];
  return {
    title: `Notes tagged with:${tag}`,
    description: `${tag}`,
    openGraph: {
      title: `Notes tagged with:${tag}`,
      description: `${tag}`,
      // url: `https://my-deployed-site.vercel.app/notes/filter/${tag}`,
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
}

export default async function Notes({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ search: '', page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
