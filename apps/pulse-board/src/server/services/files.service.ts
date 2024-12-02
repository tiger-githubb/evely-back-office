import { FileType } from '@/types/file.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateFileInput } from '@/validators/create-file.schema';

export async function addFile(fileData: CreateFileInput): Promise<FileType> {
  try {
    const headers = await getAuthHeaders();
    const formData = new FormData();
    formData.append('name', fileData.name);
    formData.append('description', fileData.description || '');
    if (fileData.file) {
      formData.append('file', fileData.file);
    }
    formData.append('parentId', fileData.parentId?.toString() || '0');

    const response = await api.post<FileType>('/archives/files', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de file';
    throw new Error(errorMessage);
  }
}
export async function updateFile(
  fileId: number,
  fileData: CreateFileInput
): Promise<FileType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<FileType>(
      `/archives/files/${fileId}`,
      fileData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating file:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteFile(fileId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/archives/files/${fileId}`, { headers });
    console.log(`File with ID ${fileId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting file:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
