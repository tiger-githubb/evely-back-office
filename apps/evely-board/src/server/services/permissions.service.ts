import { PermissionType } from '@/types/permission.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreatePermissionInput } from '@/validators/create-permission.schema';

export interface PermissionsResponse {
  data: PermissionType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getPermissions(): Promise<PermissionsResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<PermissionsResponse>('/permissions', {
      headers,
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}

export async function addPermission(
  permissionData: CreatePermissionInput
): Promise<PermissionType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<PermissionType>(
      '/permissions',
      permissionData,
      {
        headers,
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de permission';
    console.error('Error adding permission:', error);
    throw new Error('Error adding permission:', errorMessage);
  }
}

export async function updatePermission(
  permissionId: number,
  permissionData: CreatePermissionInput
): Promise<PermissionType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<PermissionType>(
      `/permissions/${permissionId}`,
      permissionData,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating permission:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deletePermission(permissionId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/permissions/${permissionId}`, { headers });
    console.log(`Permission with ID ${permissionId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting permission:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
