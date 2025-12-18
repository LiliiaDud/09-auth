'use client';

import css from './NotesPage.module.css';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import { keepPreviousData } from '@tanstack/react-query';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { useRouter } from 'next/navigation';

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [search, setSearch] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', { page, perPage, search, tag }],
    queryFn: () => fetchNotes({ page, perPage, search, tag }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    // refetchOnMount: false,
  });

  const notes = (data?.notes as Note[]) || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 400);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/notes/action/create');
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination currentPage={page} pageCount={totalPages} onPageChange={setPage} />
        )}

        <button className={css.button} onClick={handleClick}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
