import { ArchiveType } from '@/types/archive.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';

export interface ArchivesResponse {
  data: ArchiveType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}
export interface ArchivesDirResponse {
  data: ArchiveType;
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getArchives(): Promise<ArchivesResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<ArchivesResponse>('/archives', { headers });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}
export async function getAllArchives(): Promise<ArchivesResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<ArchivesResponse>('/archives/all', {
      headers,
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}

export async function getArchiveDirectory(
  FolderId: string
): Promise<ArchivesDirResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<ArchivesDirResponse>(
      `/archives/${FolderId}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}
