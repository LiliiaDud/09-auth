import axios from 'axios';
import type { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface CreateNotePayload {
  id?: string;
  title: string;
  content: string;
  tag: Note['tag'];
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await client.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });

  return data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await client.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await client.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: Note['id']): Promise<Note> {
  const { data } = await client.get<Note>(`/notes/${id}`);
  return data;
}
