import { DirectoryType } from '@/types/directory.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateDirectoryInput } from '@/validators/create-directory.schema';

export async function addDirectory(
  directoryData: CreateDirectoryInput
): Promise<DirectoryType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<DirectoryType>(
      '/archives/directories',
      directoryData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de directory';
    console.error('Error adding directory:', error);
    throw new Error('Error adding directory:', errorMessage);
  }
}

export async function updateDirectory(
  directoryId: number,
  directoryData: CreateDirectoryInput
): Promise<DirectoryType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<DirectoryType>(
      `/archives/directories/${directoryId}`,
      directoryData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating directory:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteDirectory(directoryId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/archives/directories/${directoryId}`, { headers });
    console.log(`Directory with ID ${directoryId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting directory:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
