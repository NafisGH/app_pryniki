import api from './api';
import { LoginResponse } from '../types';

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/ru/data/v3/testmethods/docs/login', {
    username,
    password,
  });
  return response.data;
};
