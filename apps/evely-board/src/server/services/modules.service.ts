import { ModuleType } from '@/types/module.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateModuleInput } from '@/validators/create-module.schema';

export interface ModulesResponse {
  data: ModuleType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getModules(): Promise<ModulesResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<ModulesResponse>('/modules', { headers });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}

export async function addModule(
  moduleData: CreateModuleInput
): Promise<ModuleType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<ModuleType>('/modules', moduleData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de module';
    console.error('Error adding module:', error);
    throw new Error('Error adding module:', errorMessage);
  }
}

export async function updateModule(
  moduleId: number,
  moduleData: CreateModuleInput
): Promise<ModuleType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<ModuleType>(
      `/modules/${moduleId}`,
      moduleData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating module:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteModule(moduleId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/modules/${moduleId}`, { headers });
    console.log(`Module with ID ${moduleId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting module:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
