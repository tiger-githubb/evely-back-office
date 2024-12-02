import { RoleType } from '@/types/role.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateRoleInput } from '@/validators/create-role.schema';

export interface RolesResponse {
  data: RoleType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getRoles(): Promise<RolesResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<RolesResponse>('/roles', {
      headers,
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}

export async function addRole(roleData: CreateRoleInput): Promise<RoleType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<RoleType>('/roles', roleData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de role';
    console.error('Error adding role:', error);
    throw new Error('Error adding role:', errorMessage);
  }
}

export async function updateRole(
  roleId: number,
  roleData: CreateRoleInput
): Promise<RoleType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<RoleType>(`/roles/${roleId}`, roleData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating role:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteRole(roleId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/roles/${roleId}`, { headers });
    console.log(`Role with ID ${roleId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting role:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
