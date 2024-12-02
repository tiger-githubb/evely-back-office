import { GroupType } from '@/types/group.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateGroupInput } from '@/validators/create-group.schema';

export interface GroupsResponse {
  data: GroupType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getGroups(): Promise<GroupsResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<GroupsResponse>('/groups', {
      headers,
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Erreur de récupération:', error);
    throw error;
  }
}

export async function addGroup(
  groupData: CreateGroupInput
): Promise<GroupType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<GroupType>('/groups', groupData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de group';
    console.error('Error adding group:', error);
    throw new Error('Error adding group:', errorMessage);
  }
}

export async function updateGroup(
  groupId: number,
  groupData: CreateGroupInput
): Promise<GroupType> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<GroupType>(`/groups/${groupId}`, groupData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating group:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteGroup(groupId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/groups/${groupId}`, { headers });
    console.log(`Group with ID ${groupId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting group:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
