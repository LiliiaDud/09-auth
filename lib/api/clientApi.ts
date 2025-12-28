import type { Note } from '@/types/note';
import { client } from './api';
import { User } from '@/types/user';

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

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateMeRequest {
  username: string;
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

export async function register(userData: RegisterRequest): Promise<User> {
  const { data } = await client.post<User>('/auth/register', userData);
  return data;
}

export async function login(userData: LoginRequest): Promise<User> {
  const { data } = await client.post<User>('/auth/login', userData);
  return data;
}

export async function checkSession(): Promise<boolean> {
  const res = await client.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await client.get<User>('/users/me');
  return data;
}

export async function logout(): Promise<void> {
  await client.post('/auth/logout');
}

export async function updateMe(newData: UpdateMeRequest): Promise<User> {
  const { data } = await client.patch<User>('/users/me', newData);
  return data;
}
