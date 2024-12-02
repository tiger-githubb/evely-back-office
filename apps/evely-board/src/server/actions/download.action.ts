import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { AxiosResponse } from 'axios';

// src/server/actions/download.action.ts
export async function downloadFile(
  fileId: number
): Promise<AxiosResponse<Blob>> {
  const headers = await getAuthHeaders();
  const response = await api.get(`/archives/files/download/${fileId}`, {
    headers,
    responseType: 'blob',
    withCredentials: true,
  });

  if (response.status !== 200) {
    // Lire le message d'erreur depuis le blob
    const errorText = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject("Erreur lors de la lecture du blob d'erreur");
      reader.readAsText(response.data);
    });

    throw new Error(errorText || "Une erreur inattendue s'est produite");
  }

  return response;
}
