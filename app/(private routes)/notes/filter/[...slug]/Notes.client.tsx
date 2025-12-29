'use client';

import css from './NotesPage.module.css';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import { keepPreviousData } from '@tanstack/react-query';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Link from 'next/link';
interface Props {
  tag?: string;
}

export default function NotesClient({ tag }: Props) {
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

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />

        {totalPages > 1 && (
          <Pagination currentPage={page} pageCount={totalPages} onPageChange={setPage} />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
