import { User } from '@/types/user.type';
import { getAuthHeaders } from '@/utils/auth-utils';
import api from '@/utils/axios-instance';
import { CreateUserInput } from '@/validators/create-user.schema';

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function getUsers(): Promise<UsersResponse> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get<UsersResponse>('/users', { headers });
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function addUser(userData: CreateUserInput): Promise<User> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.post<User>('/users', userData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Erreur ajout de user';
    console.error('Error adding user:', error);
    throw new Error('Error adding user:', errorMessage);
  }
}

export async function updateUser(
  userId: number,
  userData: CreateUserInput
): Promise<User> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.put<User>(`/users/${userId}`, userData, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating user:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/users/${userId}`, { headers });
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error: any) {
    console.error('Error deleting user:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}
