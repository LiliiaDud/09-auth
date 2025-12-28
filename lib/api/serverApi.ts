import { Note } from '@/types/note';
import { client } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotesServer(
  searchValue: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = cookies();
  const { data } = await client.get<FetchNotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: {
      ...(searchValue !== '' && { search: searchValue }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await client.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const res = await client.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMeServer(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await client.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
